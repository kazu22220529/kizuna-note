"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { BellIcon, CalendarIcon, ChevronRightIcon, HomeIcon, LogoutIcon, MenuIcon, PhotoIcon } from "@/components/icons";
import { TeamLogo } from "@/components/ui";
import { BRAND } from "@/lib/constants";
import type { Tab } from "@/lib/types";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "home", label: "ホーム", icon: <HomeIcon /> },
  { key: "schedule", label: "スケジュール", icon: <CalendarIcon /> },
  { key: "notifications", label: "お知らせ", icon: <BellIcon /> },
  { key: "album", label: "アルバム", icon: <PhotoIcon /> },
  { key: "menu", label: "メニュー", icon: <MenuIcon /> },
];

export function BottomNav() {
  const { tab, setTab, unreadCount } = useApp();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-200 bg-white lg:hidden">
      {TABS.map((item) => {
        const isActive = tab === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className="relative flex flex-1 flex-col items-center gap-0.5 py-2.5"
          >
            <div className="relative h-5 w-5" style={{ color: isActive ? BRAND : "#9CA3AF" }}>
              {item.icon}
              {item.key === "notifications" && unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#8B1A1A] text-[8px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-[9px] font-semibold" style={{ color: isActive ? BRAND : "#9CA3AF" }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const SIDE_TABS: { key: Tab; label: string }[] = [
  { key: "home", label: "ホーム" },
  { key: "schedule", label: "スケジュール" },
  { key: "notifications", label: "お知らせ通知" },
  { key: "album", label: "写真アルバム" },
  { key: "menu", label: "メニュー・設定" },
];

const SIDE_ICONS: Record<Tab, React.ReactNode> = {
  home: <HomeIcon />,
  schedule: <CalendarIcon />,
  notifications: <BellIcon />,
  album: <PhotoIcon />,
  menu: <MenuIcon />,
};

export function SidebarNav() {
  const { tab, setTab, logout, unreadCount } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5" style={{ background: BRAND }}>
        <TeamLogo size={40} />
        <div className="min-w-0">
          <p className="truncate text-sm leading-tight font-bold text-white">日の出キッカーズ</p>
          <p className="text-[10px] text-white/60">YOKOHAMA HINODE TOTSUKA</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {SIDE_TABS.map((item) => {
          const isActive = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
              style={isActive ? { background: "#FEF2F2", color: BRAND } : { color: "#4B5563" }}
            >
              <div className="relative h-5 w-5 shrink-0" style={{ color: isActive ? BRAND : "#9CA3AF" }}>
                {SIDE_ICONS[item.key]}
                {item.key === "notifications" && unreadCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold text-white"
                    style={{ background: BRAND }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="relative border-t border-gray-100">
        {open && (
          <div className="absolute right-0 bottom-full left-0 z-50 mx-3 mb-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-red-50"
              style={{ color: BRAND }}
            >
              <LogoutIcon className="h-4 w-4" />
              ログアウト
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: BRAND }}>
            花
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-xs font-semibold text-gray-800">山田 花子</p>
            <p className="truncate text-[10px] text-gray-400">yamada@example.com</p>
          </div>
          <ChevronRightIcon className={`h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>
    </aside>
  );
}
