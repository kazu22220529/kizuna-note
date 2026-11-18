import type {
  AppNotification,
  AttendanceRecord,
  NotificationSettings,
  TeamEvent,
} from "@/lib/types";

const STORAGE_KEY = "hinode-kickers-v1";

export interface PersistedState {
  loggedIn: boolean;
  events: TeamEvent[];
  notifications: AppNotification[];
  attendance: Record<string, AttendanceRecord>;
  settings: NotificationSettings;
}

export function loadPersisted(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function savePersisted(state: PersistedState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPersisted(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
