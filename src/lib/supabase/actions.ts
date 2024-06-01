"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";

export async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
    // redirect("/auth/auth-error-code");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
    // redirect("/auth/auth-error-code");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function checkOtp({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const supabase = createClient();
  console.log(email, token);

  const data = {
    email,
    token,
    type: "email" as EmailOtpType,
  };

  const { error } = await supabase.auth.verifyOtp(data);
  console.log(error);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signinGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
