import type { ReactNode } from "react";
import { BRAND } from "@/lib/constants";
import { ChevronLeftIcon } from "@/components/icons";

export function TeamLogo({ size = 64 }: { size?: number }) {
  return (
    <img
      src="/logo.jpg"
      alt="YOKOHAMA HINODE TOTSUKA ロゴ"
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 lg:px-8" style={{ background: BRAND }}>
      {onBack && (
        <button type="button" onClick={onBack} className="text-white/80 transition-colors hover:text-white" aria-label="戻る">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}
      <h2 className="flex-1 text-base font-bold text-white">{title}</h2>
    </div>
  );
}

export function RedButton({
  children,
  onClick,
  outline = false,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  outline?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed ${className}`}
      style={
        outline
          ? { border: `2px solid ${BRAND}`, color: BRAND, background: "white" }
          : { background: disabled ? "#E5E7EB" : BRAND, color: disabled ? "#9CA3AF" : "white" }
      }
    >
      {children}
    </button>
  );
}

const FEATURES = [
  { icon: "📅", text: "スケジュール管理" },
  { icon: "✅", text: "出欠確認" },
  { icon: "🏆", text: "試合結果管理" },
  { icon: "📣", text: "お知らせ通知" },
  { icon: "📷", text: "写真アルバム" },
];

/** パソコン幅のとき、ログイン画面の左半分に出す赤い紹介パネル */
export function BrandPanel({ showFeatures = false }: { showFeatures?: boolean }) {
  return (
    <div className="relative hidden flex-col items-center justify-center overflow-hidden px-16 lg:flex" style={{ background: BRAND }}>
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white opacity-10" />
      <div className="absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-white opacity-10" />
      <div className="absolute top-1/2 right-0 h-48 w-48 -translate-y-1/2 rounded-full bg-white opacity-5" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <TeamLogo size={140} />
        <h1 className="mt-8 text-3xl leading-tight font-bold text-white">日の出キッカーズ</h1>
        <p className="mt-2 text-base text-white/70">YOKOHAMA HINODE TOTSUKA</p>
        <div className="my-6 h-0.5 w-12 bg-white/30" />
        <p className="max-w-xs text-sm leading-relaxed text-white/80">
          チームの絆を、アプリでひとつに。
          <br />
          スケジュール・出欠・試合結果を
          <br />
          かんたんに管理できます。
        </p>
        {showFeatures && (
          <div className="mt-8 w-full max-w-xs space-y-2.5 text-left">
            {FEATURES.map((feature) => (
              <div key={feature.text} className="flex items-center gap-3">
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium text-white/80">{feature.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function fieldClassName() {
  return "w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition-all focus:border-[#8B1A1A]";
}
