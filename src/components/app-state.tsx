"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_SETTINGS,
  SEED_EVENTS,
  SEED_NOTIFICATIONS,
  SEED_PHOTOS,
  blankAttendance,
} from "@/lib/data";
import { loadPersisted, savePersisted } from "@/lib/storage";
import type {
  AppNotification,
  AttendanceRecord,
  AttendanceStatus,
  NotificationSettings,
  Photo,
  PhotoCategory,
  SubScreen,
  Tab,
  TeamEvent,
} from "@/lib/types";

type Page = "login" | "register" | "main";

interface AppContextValue {
  ready: boolean;
  page: Page;
  tab: Tab;
  subScreen: SubScreen | null;
  events: TeamEvent[];
  notifications: AppNotification[];
  photos: Photo[];
  attendance: Record<string, AttendanceRecord>;
  settings: NotificationSettings;
  notice: string | null;
  unreadCount: number;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  openRegister: () => void;
  openLogin: () => void;
  finishRegister: () => void;
  clearNotice: () => void;
  setTab: (tab: Tab) => void;
  openSubScreen: (screen: SubScreen) => void;
  closeSubScreen: () => void;
  updateAttendance: (eventId: string, status: AttendanceStatus, comment: string) => void;
  submitAttendance: (eventId: string) => void;
  reopenAttendance: (eventId: string) => void;
  addEvent: (input: Omit<TeamEvent, "id">) => void;
  publishNotice: (input: { title: string; body: string; important: boolean }) => void;
  toggleNotificationRead: (id: string) => void;
  addPhoto: (input: { url: string; caption: string; category: PhotoCategory }) => void;
  updateSettings: (next: NotificationSettings) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState<Page>("login");
  const [tab, setTabState] = useState<Tab>("home");
  const [subScreen, setSubScreen] = useState<SubScreen | null>(null);
  const [events, setEvents] = useState<TeamEvent[]>(SEED_EVENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(SEED_NOTIFICATIONS);
  const [photos, setPhotos] = useState<Photo[]>(SEED_PHOTOS);
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>(() =>
    blankAttendance(SEED_EVENTS),
  );
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadPersisted();
    if (saved) {
      setPage(saved.loggedIn ? "main" : "login");
      setEvents(saved.events);
      setNotifications(saved.notifications);
      setAttendance(saved.attendance);
      setSettings(saved.settings);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    savePersisted({
      loggedIn: page === "main",
      events,
      notifications,
      attendance,
      settings,
    });
  }, [ready, page, events, notifications, attendance, settings]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      page,
      tab,
      subScreen,
      events,
      notifications,
      photos,
      attendance,
      settings,
      notice,
      unreadCount,
      login: (email, password) => {
        if (!email.trim() || !password.trim()) {
          return "メールアドレスとパスワードを入力してください";
        }
        setPage("main");
        setTabState("home");
        setSubScreen(null);
        setNotice(null);
        return null;
      },
      logout: () => {
        setPage("login");
        setSubScreen(null);
        setTabState("home");
      },
      openRegister: () => {
        setNotice(null);
        setPage("register");
      },
      openLogin: () => setPage("login"),
      finishRegister: () => {
        setNotice("登録しました。ログインしてください。");
        setPage("login");
      },
      clearNotice: () => setNotice(null),
      setTab: (next) => {
        setTabState(next);
        setSubScreen(null);
      },
      openSubScreen: (screen) => setSubScreen(screen),
      closeSubScreen: () => setSubScreen(null),
      updateAttendance: (eventId, status, comment) => {
        setAttendance((prev) => ({
          ...prev,
          [eventId]: {
            status,
            comment,
            submitted: prev[eventId]?.submitted ?? false,
          },
        }));
      },
      submitAttendance: (eventId) => {
        setAttendance((prev) => ({
          ...prev,
          [eventId]: { ...prev[eventId], submitted: true },
        }));
      },
      reopenAttendance: (eventId) => {
        setAttendance((prev) => ({
          ...prev,
          [eventId]: { ...prev[eventId], submitted: false },
        }));
      },
      addEvent: (input) => {
        const id = `e${Date.now()}`;
        setEvents((prev) =>
          [...prev, { ...input, id }].sort((a, b) =>
            `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`),
          ),
        );
        setAttendance((prev) => ({
          ...prev,
          [id]: { status: "undecided", comment: "", submitted: false },
        }));
      },
      publishNotice: ({ title, body, important }) => {
        setNotifications((prev) => [
          {
            id: `n${Date.now()}`,
            title,
            body,
            time: "たった今",
            read: false,
            important,
          },
          ...prev,
        ]);
        setTabState("notifications");
        setSubScreen(null);
      },
      toggleNotificationRead: (id) => {
        setNotifications((prev) =>
          prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
        );
      },
      addPhoto: ({ url, caption, category }) => {
        setPhotos((prev) => [{ id: `p${Date.now()}`, url, caption, category }, ...prev]);
      },
      updateSettings: setSettings,
    }),
    [ready, page, tab, subScreen, events, notifications, photos, attendance, settings, notice, unreadCount],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp は AppProvider の内側で使ってください");
  }
  return context;
}
