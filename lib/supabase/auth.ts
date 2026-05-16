"use client";
import { supabase } from "./client";
import type { ClassLevel } from "@/lib/types";
import type { ProfileRow, ProfileGameState } from "./types";

export interface SignUpInput {
  email: string;
  password: string;
  username: string;
  classLevel: ClassLevel;
}

export interface SignInInput {
  email: string;
  password: string;
}

export type AuthErrorCode =
  | "username_taken"
  | "invalid_credentials"
  | "email_taken"
  | "weak_password"
  | "network"
  | "unknown";

export class AuthError extends Error {
  code: AuthErrorCode;
  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

function genInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "KAS-";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .limit(1);
  if (error) throw new AuthError("network", error.message);
  return (data ?? []).length === 0;
}

export async function signUp(input: SignUpInput): Promise<ProfileRow> {
  const trimmedUsername = input.username.trim();
  if (!trimmedUsername || trimmedUsername.length < 2)
    throw new AuthError("unknown", "Kullanıcı adı en az 2 karakter olmalı.");

  const available = await isUsernameAvailable(trimmedUsername);
  if (!available) throw new AuthError("username_taken", "Bu kullanıcı adı alınmış.");

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });

  if (authError) {
    const msg = authError.message.toLowerCase();
    if (msg.includes("already") || msg.includes("registered"))
      throw new AuthError("email_taken", "Bu e-posta zaten kayıtlı.");
    if (msg.includes("password"))
      throw new AuthError("weak_password", "Parola en az 6 karakter olmalı.");
    throw new AuthError("unknown", authError.message);
  }
  const userId = authData.user?.id;
  if (!userId) throw new AuthError("unknown", "Auth başarısız.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      username: trimmedUsername,
      class_level: input.classLevel,
      game_state: null,
    } as never)
    .select()
    .single();

  if (profileError) {
    // Profil kayıt başarısız olduysa auth user'ı da silinmeli (orphan kalmasın)
    // Ama anon key ile silemeyiz; loglayıp atlıyoruz.
    throw new AuthError("unknown", profileError.message);
  }
  return profile as ProfileRow;
}

export async function signIn(input: SignInInput): Promise<ProfileRow> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });
  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid") || msg.includes("credential"))
      throw new AuthError("invalid_credentials", "E-posta veya parola hatalı.");
    throw new AuthError("unknown", error.message);
  }
  const userId = data.user?.id;
  if (!userId) throw new AuthError("unknown", "Giriş başarısız.");

  const profile = await fetchProfile(userId);
  if (!profile) throw new AuthError("unknown", "Profil bulunamadı.");
  return profile;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new AuthError("network", error.message);
  return (data as ProfileRow | null) ?? null;
}

export async function saveGameState(
  userId: string,
  gameState: ProfileGameState
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ game_state: gameState } as never)
    .eq("id", userId);
  if (error) throw new AuthError("network", error.message);
}

export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function inviteCodeFor(username: string): string {
  // Stabil görünmesi için username + sabit suffix'ten türetiyoruz
  let h = 0;
  for (let i = 0; i < username.length; i++) {
    h = (h * 31 + username.charCodeAt(i)) >>> 0;
  }
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KAS-";
  let n = h;
  for (let i = 0; i < 6; i++) {
    code += chars[n % chars.length];
    n = Math.floor(n / chars.length) + 7;
  }
  return code;
}

export { genInviteCode };
