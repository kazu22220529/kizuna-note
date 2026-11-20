"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { BellIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui";
import { BRAND } from "@/lib/constants";

type Filter = "all" | "unread" | "important";

export function NotificationsTab() {
  const { notifications, toggleNotificationRead } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "important") return item.important;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="お知らせ通知" />
      <div className="flex border-b border-gray-100 bg-white">
        {(
          [
            ["all", "すべて"],
            ["unread", "未読"],
            ["important", "重要"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className="relative flex-1 py-3 text-sm font-semibold transition-all"
            style={{ color: filter === key ? BRAND : "#6B7280" }}
          >
            {label}
            {filter === key && <div className="absolute right-0 bottom-0 left-0 h-0.5" style={{ background: BRAND }} />}
          </button>
        ))}
      </div>

      <div className="mx-4 mt-2 divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-sm lg:mx-8 lg:max-w-2xl">
        {filtered.length === 0 && <p className="px-4 py-10 text-center text-sm text-gray-400">お知らせはありません</p>}
        {filtered.map((item) => {
          const open = openId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setOpenId(open ? null : item.id);
                toggleNotificationRead(item.id);
              }}
              className={`flex w-full items-start gap-3 px-4 py-4 text-left ${item.read ? "" : "bg-red-50/40"}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.important ? "" : "bg-gray-100"}`} style={item.important ? { background: BRAND } : {}}>
                <BellIcon className={`h-4 w-4 ${item.important ? "text-white" : "text-gray-400"}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug font-bold text-gray-800">{item.title}</p>
                <p className={`mt-0.5 text-xs text-gray-500 ${open ? "" : "line-clamp-2"}`}>{item.body}</p>
                <p className="mt-1.5 text-[10px] text-gray-400">{item.time}</p>
              </div>
              {!item.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
