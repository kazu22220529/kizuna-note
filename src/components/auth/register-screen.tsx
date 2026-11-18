"use client";

import { useState } from "react";
import { useApp } from "@/components/app-state";
import { ChevronLeftIcon } from "@/components/icons";
import { BrandPanel, PageHeader, RedButton, fieldClassName } from "@/components/ui";
import { BRAND } from "@/lib/constants";

export function RegisterScreen() {
  const { openLogin, finishRegister } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const goNext = () => {
    if (!name.trim() || !email.trim() || password.trim().length < 8) {
      setError("お名前、メールアドレス、8文字以上のパスワードを入力してください");
      return;
    }
    setError(null);
    setStep(2);
  };

  const submit = () => {
    if (!childName.trim() || !inviteCode.trim()) {
      setError("お子様のお名前と招待コードを入力してください");
      return;
    }
    finishRegister();
  };

  return (
    <div className="min-h-dvh bg-white lg:grid lg:grid-cols-2">
      <div className="lg:hidden">
        <PageHeader title="新規登録" onBack={openLogin} />
      </div>
      <BrandPanel />
      <div className="flex items-start justify-center px-4 pt-6 lg:items-center lg:px-16 lg:pt-0">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="mb-6 hidden lg:block">
            <button
              type="button"
              onClick={openLogin}
              className="mb-5 flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
              style={{ color: BRAND }}
            >
              <ChevronLeftIcon className="h-4 w-4" /> ログインに戻る
            </button>
            <h2 className="text-2xl font-bold text-gray-900">新規登録</h2>
            <p className="mt-1 text-sm text-gray-400">アカウントを作成してチームに参加しましょう</p>
          </div>

          <div className="mb-6 flex gap-1.5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-1 flex-1 rounded-full transition-all"
                style={{ background: step >= item ? BRAND : "#E5E7EB" }}
              />
            ))}
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <p className="mb-4 text-xs text-gray-400">ステップ 1 / 2 — アカウント情報</p>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="お名前" className={fieldClassName()} />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="メールアドレス" className={fieldClassName()} />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="パスワード（8文字以上）" className={fieldClassName()} />
              {error && <p className="text-xs font-medium text-red-600">{error}</p>}
              <RedButton onClick={goNext}>次へ</RedButton>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="mb-4 text-xs text-gray-400">ステップ 2 / 2 — チーム参加</p>
              <input value={childName} onChange={(event) => setChildName(event.target.value)} placeholder="お子様のお名前" className={fieldClassName()} />
              <div>
                <input
                  value={inviteCode}
                  onChange={(event) => setInviteCode(event.target.value)}
                  placeholder="招待コード（例：HINODE-2024）"
                  className={`${fieldClassName()} font-mono`}
                />
                <p className="mt-1.5 pl-1 text-xs text-gray-400">コーチから共有された招待コードを入力してください</p>
              </div>
              {error && <p className="text-xs font-medium text-red-600">{error}</p>}
              <RedButton onClick={submit}>登録する</RedButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
