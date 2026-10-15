import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { isLang, type Lang } from "@/i18n/langs";

const COOKIE = "esfe_pass";
const MAX_AGE = 60 * 60 * 24 * 200;

function signingSecret(): string {
  const fromEnv = process.env.ESFE_ACCESS_SECRET?.trim();
  if (fromEnv) return fromEnv;
  for (const path of [".access-secret", "/workspace/.access-secret"]) {
    try {
      const text = readFileSync(path, "utf8").trim();
      if (text) return text;
    } catch {
      /* local file is optional */
    }
  }
  return "";
}

const HASHES = [
  "a464100c7620eaf65d0350127be28637eee8ba1ffb59f2f047f4aa6b90278734",
  "1545c06b388df2ab5cdec6f0f30646012578ce6e08d93cf66b6a993ca1879136",
  "4ea2e1a439b10afb8ca57b6999310102520a2c5d82d071b1cb00a92f19d25223",
  "b89f447773568ff4a82b6ced3e744589a40f50d1e85295dbb1089af647604319",
  "a42a3c2fb481c7381dff8b2e2ed680e97358ef45d4ada8f60193f400b78e5126",
  "987d5b8eb54fed871cd16d7dfe5fd776897e6164bbc8074166d9b2594d47146e",
  "04a4bb6abab5a79dd180feac51df4cbbe38e593705d0a0883d45196f1a375c35",
  "05c9d835f7674f866d67ec17a37f18f78a32d814966f53cde635eeacc2d8c25d",
];

function normalize(key: string): string {
  return key.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function keyMatches(key: string): boolean {
  const digest = createHash("sha256").update(normalize(key)).digest("hex");
  const got = Buffer.from(digest);
  let ok = false;
  for (const hash of HASHES) {
    const want = Buffer.from(hash);
    if (got.length === want.length && timingSafeEqual(got, want)) ok = true;
  }
  return ok;
}

function secureCookie(): boolean {
  try {
    return new URL(getRequest().url).protocol === "https:";
  } catch {
    return false;
  }
}

export function signPass(): string {
  const secret = signingSecret();
  if (!secret) return "";
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const body = `v1.${exp}`;
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyPass(token: string | undefined | null): boolean {
  const secret = signingSecret();
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ver, exp, sig] = parts;
  if (ver !== "v1" || !exp || !sig) return false;
  const expected = createHmac("sha256", secret).update(`${ver}.${exp}`).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const until = Number(exp);
  return Number.isFinite(until) && until > Date.now() / 1000;
}

export function readLang(): Lang {
  const raw = getCookie("esfe-lang") ?? "";
  return isLang(raw) ? raw : "en";
}

export function isOpen(token?: string): boolean {
  if (verifyPass(token)) return true;
  return verifyPass(getCookie(COOKIE));
}

export function grant(key: string): { ok: true; token: string } | { ok: false } {
  if (!keyMatches(key)) return { ok: false };
  const token = signPass();
  if (!token) return { ok: false };
  setCookie(COOKIE, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    maxAge: MAX_AGE,
  });
  return { ok: true, token };
}

export function revoke(): { ok: true } {
  setCookie(COOKIE, "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    maxAge: 0,
  });
  return { ok: true };
}
