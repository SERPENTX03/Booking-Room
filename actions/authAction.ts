"use server";
import { signIn, signOut } from "@/auth";

export async function SignIn() {
  await signIn("google");
}

export async function signOutAction() {
  await signOut()
}