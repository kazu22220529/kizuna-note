"use client";

import { useApp } from "@/components/app-state";
import { AlbumTab } from "@/components/album/album-tab";
import { LoginScreen } from "@/components/auth/login-screen";
import { RegisterScreen } from "@/components/auth/register-screen";
import { AttendanceScreen } from "@/components/attendance/attendance-screen";
import { HomeTab } from "@/components/home/home-tab";
import { MembersScreen, MenuTab, HelpScreen, InviteScreen, SettingsScreen } from "@/components/menu/menu-screens";
import { NotificationsTab } from "@/components/notifications/notifications-tab";
import { PostScreen } from "@/components/post/post-screen";
import { ResultsScreen } from "@/components/results/results-screen";
import { ScheduleTab } from "@/components/schedule/schedule-tab";
import { BottomNav, SidebarNav } from "@/components/shell/navigation";
import { TeamLogo } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export function AppRoot() {
  const { ready, page, tab, subScreen } = useApp();

  if (!ready) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4" style={{ background: BRAND }}>
        <TeamLogo size={96} />
        <p className="text-lg font-bold text-white">日の出キッカーズ</p>
      </div>
    );
  }

  if (page === "login") return <LoginScreen />;
  if (page === "register") return <RegisterScreen />;

  const content = (() => {
    if (subScreen === "attendance") return <AttendanceScreen />;
    if (subScreen === "results") return <ResultsScreen />;
    if (subScreen === "post") return <PostScreen />;
    if (subScreen === "members") return <MembersScreen />;
    if (subScreen === "invite") return <InviteScreen />;
    if (subScreen === "settings") return <SettingsScreen />;
    if (subScreen === "help") return <HelpScreen />;
    if (tab === "home") return <HomeTab />;
    if (tab === "schedule") return <ScheduleTab />;
    if (tab === "notifications") return <NotificationsTab />;
    if (tab === "album") return <AlbumTab />;
    return <MenuTab />;
  })();

  return (
    <div className="flex h-dvh overflow-hidden bg-[#F4F4F4]">
      {!subScreen && <SidebarNav />}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">{content}</div>
      {!subScreen && <BottomNav />}
    </div>
  );
}
