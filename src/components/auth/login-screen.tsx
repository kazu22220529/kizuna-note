"use client";

import { useState, type FormEvent } from "react";
import { useApp } from "@/components/app-state";
import { EyeIcon, LockIcon, MailIcon } from "@/components/icons";
import { BrandPanel, RedButton, TeamLogo } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export function LoginScreen() {
  const { login, openRegister, notice, clearNotice } = useApp();
  const [email, setEmail] = useState("yamada@example.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgot, setForgot] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setForgot(false);
    const message = login(email, password);
    setError(message);
  };

  return (
    <div className="min-h-dvh bg-white lg:grid lg:grid-cols-2">
      <BrandPanel showFeatures />
      <div className="flex items-center justify-center px-6 py-10 lg:px-16">
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <TeamLogo size={88} />
            <h1 className="mt-4 text-center text-lg font-bold text-gray-900">ようこそ！</h1>
            <p className="text-center text-sm text-gray-600">日の出キッカーズアプリへ</p>
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-gray-900">ログイン</h2>
            <p className="mt-1 text-sm text-gray-400">アカウント情報を入力してください</p>
          </div>

          {notice && (
            <p className="mb-4 rounded-xl bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
              {notice}
              <button type="button" onClick={clearNotice} className="ml-2 underline">
                閉じる
              </button>
            </p>
          )}

          <div className="mb-4 space-y-3">
            <div className="relative">
              <MailIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="メールアドレス"
                autoComplete="username"
                className="w-full rounded-xl border border-gray-200 py-3.5 pr-4 pl-10 text-sm outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/15"
              />
            </div>
            <div className="relative">
              <LockIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="パスワード"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 py-3.5 pr-10 pl-10 text-sm outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
              >
                <EyeIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-xs"
                style={{ color: BRAND }}
                onClick={() => {
                  setForgot(true);
                  setError(null);
                }}
              >
                パスワードをお忘れの方
              </button>
            </div>
          </div>

          {error && <p className="mb-3 text-xs font-medium text-red-600">{error}</p>}
          {forgot && (
            <p className="mb-3 text-xs leading-relaxed text-gray-500">
              デモアプリのため、メール送信は行いません。上の欄にメールアドレスとパスワードを入れてログインできます。
            </p>
          )}

          <div className="space-y-2.5">
            <RedButton type="submit">ログイン</RedButton>
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">または</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <RedButton outline onClick={openRegister}>
              新規登録はこちら
            </RedButton>
          </div>
        </form>
      </div>
    </div>
  );
}
