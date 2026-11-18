"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { ChevronRightIcon } from "@/components/icons";
import { Card, PageHeader, RedButton, TeamLogo } from "@/components/ui";
import { BRAND } from "@/lib/constants";
import { MEMBERS } from "@/lib/data";
import type { SubScreen } from "@/lib/types";

const MENU_ITEMS: { label: string; icon: string; sub: string; screen?: SubScreen }[] = [
  { label: "チーム登録・招待", icon: "👥", sub: "招待コードを共有", screen: "invite" },
  { label: "出欠確認", icon: "✅", sub: "回答が必要なイベントを確認", screen: "attendance" },
  { label: "試合結果管理", icon: "🏆", sub: "直近の試合結果を確認", screen: "results" },
  { label: "お知らせ投稿", icon: "📝", sub: "保護者にお知らせを送る", screen: "post" },
  { label: "通知設定", icon: "🔔", sub: "通知のオン・オフを設定", screen: "settings" },
  { label: "メンバー一覧", icon: "📋", sub: "チームのメンバーを確認", screen: "members" },
  { label: "ヘルプ・お問い合わせ", icon: "❓", sub: "困ったときはこちら", screen: "help" },
];

export function MenuTab() {
  const { openSubScreen, logout, attendance } = useApp();
  const pending = Object.values(attendance).filter((record) => !record.submitted).length;

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <div className="flex items-center gap-4 px-4 py-5 lg:px-8" style={{ background: BRAND }}>
        <TeamLogo size={50} />
        <div>
          <p className="text-base font-bold text-white">山田 花子</p>
          <p className="text-xs text-white/70">yamada@example.com</p>
          <p className="text-xs text-white/70">お子様：山田 陸（U-12）</p>
        </div>
      </div>
      <div className="space-y-2 px-4 pt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3 lg:space-y-0 lg:px-8">
        {MENU_ITEMS.map((item) => (
          <button key={item.label} type="button" onClick={() => item.screen && openSubScreen(item.screen)} className="w-full text-left">
            <Card className="flex items-center gap-3.5 px-4 py-3.5 transition-shadow hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">
                  {item.screen === "attendance" ? `回答が必要なイベント${pending}件` : item.sub}
                </p>
              </div>
              <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-400" />
            </Card>
          </button>
        ))}
        <button type="button" onClick={logout} className="mt-2 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 lg:col-span-2">
          ログアウト
        </button>
      </div>
    </div>
  );
}

export function MembersScreen() {
  const { closeSubScreen } = useApp();
  const [query, setQuery] = useState("");
  const shown = MEMBERS.filter((member) => `${member.name}${member.childName}`.includes(query.trim()));

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="メンバー一覧" onBack={closeSubScreen} />
      <div className="px-4 pt-4 lg:max-w-2xl lg:px-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="名前で探す"
          className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#8B1A1A]"
        />
        <Card className="divide-y divide-gray-100">
          {shown.map((member) => (
            <div key={member.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: BRAND }}>
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                <p className="text-xs text-gray-400">{member.childName} の保護者</p>
              </div>
            </div>
          ))}
          {shown.length === 0 && <p className="px-4 py-8 text-center text-sm text-gray-400">該当するメンバーはいません</p>}
        </Card>
      </div>
    </div>
  );
}

export function InviteScreen() {
  const { closeSubScreen } = useApp();
  const [copied, setCopied] = useState(false);
  const code = "HINODE-2024";

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="チーム登録・招待" onBack={closeSubScreen} />
      <div className="space-y-3 px-4 pt-4 lg:max-w-xl lg:px-8">
        <Card className="p-5 text-center">
          <p className="text-xs font-bold text-gray-400">招待コード</p>
          <p className="mt-2 font-mono text-2xl font-bold tracking-wide text-gray-900">{code}</p>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">新しく参加する保護者に、このコードを伝えてください。</p>
          <div className="mt-4">
            <RedButton
              onClick={async () => {
                await navigator.clipboard.writeText(code);
                setCopied(true);
              }}
            >
              {copied ? "コピーしました" : "コードをコピー"}
            </RedButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function SettingsScreen() {
  const { closeSubScreen, settings, updateSettings } = useApp();
  const rows: { key: keyof typeof settings; label: string; sub: string }[] = [
    { key: "schedule", label: "スケジュール", sub: "練習や試合の追加・変更" },
    { key: "notice", label: "お知らせ", sub: "コーチからの連絡" },
    { key: "result", label: "試合結果", sub: "結果が登録されたとき" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="通知設定" onBack={closeSubScreen} />
      <div className="px-4 pt-4 lg:max-w-xl lg:px-8">
        <Card className="divide-y divide-gray-100">
          {rows.map((row) => (
            <button
              key={row.key}
              type="button"
              onClick={() => updateSettings({ ...settings, [row.key]: !settings[row.key] })}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{row.label}</p>
                <p className="text-xs text-gray-400">{row.sub}</p>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: settings[row.key] ? "#16A34A" : "#D1D5DB" }}>
                {settings[row.key] ? "オン" : "オフ"}
              </span>
            </button>
          ))}
        </Card>
        <p className="mt-3 text-xs leading-relaxed text-gray-400">このデモでは、端末の通知許可は使いません。設定はこのブラウザに保存されます。</p>
      </div>
    </div>
  );
}

export function HelpScreen() {
  const { closeSubScreen } = useApp();
  const items = [
    { q: "ログインできない", a: "メールアドレスとパスワードの両方が入力されていれば入れます。実在のアカウント照合はしていません。" },
    { q: "出欠を間違えた", a: "イベントを開き、「回答を変更する」を押すと、もう一度選べます。" },
    { q: "データを最初からに戻したい", a: "ブラウザのこのサイトの保存データ（localStorage）を消すと、サンプルデータに戻ります。" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
      <PageHeader title="ヘルプ・お問い合わせ" onBack={closeSubScreen} />
      <div className="space-y-3 px-4 pt-4 lg:max-w-xl lg:px-8">
        {items.map((item) => (
          <Card key={item.q} className="p-4">
            <p className="text-sm font-bold text-gray-800">{item.q}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.a}</p>
          </Card>
        ))}
        <Card className="p-4">
          <p className="text-sm font-bold text-gray-800">お問い合わせ</p>
          <p className="mt-1 text-sm text-gray-500">hinode-kickers@example.com</p>
        </Card>
      </div>
    </div>
  );
}
