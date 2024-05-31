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

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

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

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
    // redirect("/auth/auth-error-code");
  }

  // send to backend
  const data = {
    email,
    created_at,
    updated_at,
    last_sign_in_at,
    ip_address,
    user_agent,
    first_name,
    last_name,
    phone_number,
    birth_date,
    is_active,
    is_verified,
    profile_picture_url,
    preferences,
  };

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
