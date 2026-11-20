"use client";

import { useApp } from "@/components/app-state";
import { BellIcon, SettingsIcon } from "@/components/icons";
import { Card, TeamLogo } from "@/components/ui";
import { BRAND, EVENT_META } from "@/lib/constants";
import { SEASON_RECORD } from "@/lib/data";
import { daysUntil, formatJapaneseDate } from "@/lib/format";
import type { Tab } from "@/lib/types";

const HOME_MENU: { label: string; icon: string; tab?: Tab; screen?: "attendance" | "results" | "post" | "members" }[] = [
  { label: "スケジュール", icon: "📅", tab: "schedule" },
  { label: "お知らせ通知", icon: "🔔", tab: "notifications" },
  { label: "出欠確認", icon: "✅", screen: "attendance" },
  { label: "試合結果", icon: "⚽", screen: "results" },
  { label: "お知らせ投稿", icon: "📝", screen: "post" },
  { label: "写真アルバム", icon: "📷", tab: "album" },
  { label: "メンバー一覧", icon: "📋", screen: "members" },
];

export function HomeTab() {
  const { events, notifications, attendance, unreadCount, setTab, openSubScreen } = useApp();
  const practices = events.filter((event) => event.type === "practice" && event.date.startsWith("2024-05")).length;
  const nextMatch = events.find((event) => event.type === "match" && event.date >= "2024-05-14");
  const pending = Object.values(attendance).filter((record) => !record.submitted).length;
  const upcoming = [...events].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)).slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <div className="flex items-center justify-between px-4 py-4 lg:hidden" style={{ background: BRAND }}>
        <div className="flex items-center gap-3">
          <TeamLogo size={44} />
          <div>
            <p className="text-base leading-tight font-bold text-white">日の出キッカーズ</p>
            <p className="text-xs text-white/70">神奈川県横浜市戸塚区</p>
          </div>
        </div>
        <button type="button" className="text-white/80 transition-colors hover:text-white" aria-label="設定" onClick={() => openSubScreen("settings")}>
          <SettingsIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="hidden items-center justify-between px-8 pt-8 pb-2 lg:flex">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ホーム</h1>
          <p className="mt-0.5 text-sm text-gray-400">日の出キッカーズ — 神奈川県横浜市戸塚区</p>
        </div>
        <button type="button" className="text-gray-400 transition-colors hover:text-gray-600" aria-label="設定" onClick={() => openSubScreen("settings")}>
          <SettingsIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 px-4 pt-4 lg:space-y-6 lg:px-8">
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          <div className="space-y-4 lg:col-span-2 lg:space-y-5">
            <div className="hidden gap-4 lg:grid lg:grid-cols-3">
              {[
                { label: "今月の練習", value: `${practices}回`, icon: "⚽", delta: "2024年5月" },
                {
                  label: "次の試合まで",
                  value: nextMatch ? `${Math.max(daysUntil(nextMatch.date), 0)}日` : "—",
                  icon: "🏆",
                  delta: nextMatch ? formatJapaneseDate(nextMatch.date) : "予定なし",
                },
                { label: "出欠未確認", value: `${pending}件`, icon: "📋", delta: "回答してね" },
              ].map((stat) => (
                <Card key={stat.label} className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                      <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="mt-1 text-xs text-gray-400">{stat.delta}</p>
                    </div>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-3 lg:p-4">
              <div className="grid grid-cols-4 gap-1 lg:gap-2">
                {HOME_MENU.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.tab) setTab(item.tab);
                      if (item.screen) openSubScreen(item.screen);
                    }}
                    className="relative flex flex-col items-center gap-1.5 rounded-xl py-3 transition-colors hover:bg-gray-50 lg:py-4"
                  >
                    <div className="relative">
                      <span className="text-2xl lg:text-3xl">{item.icon}</span>
                      {item.label === "お知らせ通知" && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: BRAND }}>
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <span className="text-center text-[10px] leading-tight font-medium text-gray-600 lg:text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            <div className="hidden lg:block">
              <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">直近のスケジュール</p>
              <Card className="divide-y divide-gray-100">
                {upcoming.map((event) => (
                  <button key={event.id} type="button" onClick={() => setTab("schedule")} className="flex w-full items-center gap-4 px-5 py-3.5 text-left">
                    <div className="h-10 w-1 shrink-0 rounded-full" style={{ background: EVENT_META[event.type].color }} />
                    <div className="w-16 shrink-0 text-center">
                      <p className="text-xs font-bold text-gray-500">{event.date.slice(5).replace("-", "/")}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                      <p className="text-xs text-gray-400">
                        {event.startTime}〜{event.endTime} · {event.location}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: EVENT_META[event.type].color }}>
                      {EVENT_META[event.type].label}
                    </span>
                  </button>
                ))}
              </Card>
            </div>
          </div>

          <div className="hidden space-y-4 lg:block">
            <div>
              <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">直近のお知らせ</p>
              <Card className="divide-y divide-gray-100">
                {notifications.map((item) => (
                  <button key={item.id} type="button" onClick={() => setTab("notifications")} className={`flex w-full items-start gap-3 px-4 py-3.5 text-left ${item.read ? "" : "bg-red-50/40"}`}>
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.important ? "" : "bg-gray-100"}`} style={item.important ? { background: BRAND } : {}}>
                      <BellIcon className={`h-3.5 w-3.5 ${item.important ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs leading-snug font-bold text-gray-800">{item.title}</p>
                      <p className="mt-1 text-[10px] text-gray-400">{item.time}</p>
                    </div>
                    {!item.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: BRAND }} />}
                  </button>
                ))}
              </Card>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">今季成績</p>
              <Card className="p-5">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  {SEASON_RECORD.map((stat) => (
                    <div key={stat.label} className="px-2 text-center">
                      <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">直近のお知らせ</p>
          <Card className="divide-y divide-gray-100">
            {notifications.slice(0, 2).map((item) => (
              <button key={item.id} type="button" onClick={() => setTab("notifications")} className="flex w-full items-start gap-3 px-4 py-3 text-left">
                <BellIcon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800">{item.title}</p>
                </div>
                <span className="shrink-0 text-[10px] text-gray-400">{item.time}</span>
              </button>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
