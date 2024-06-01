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

  if (typeof window !== "undefined") {
    sessionStorage.setItem("userEmail", email);
  } else {
    // server-side
    // setCookie("userEmail", email);
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
    options: {
      // additional info
      // data: {
      //   first_name: "John",
      //   last_name: "Doe",
      // },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/auth/verify`, "page");
  redirect("/auth/verify");
}

export async function checkOtp({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const supabase = createClient();

  const data = {
    email,
    token,
    type: "email" as EmailOtpType,
  };

  console.log(data);

  const { error } = await supabase.auth.verifyOtp(data);

  if (error) {
    throw new Error(error.message);
  }
  const { error: error2 } = await supabase.from("user_profiles").insert({
    email,
  });

  if (error2) {
    throw new Error(error2.message);
  }

  revalidatePath("/profile/setup", "layout");
  redirect("/profile/setup");
}

// not working
export async function resendOtp({ email }: { email: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  console.log("resendOtp error", error);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/auth/verify`, "page");
  redirect("/auth/verify");
}

export async function createUserProfile({
  firstName,
  lastName,
  date,
}: {
  firstName: string;
  lastName: string;
  date: Date;
}) {
  const supabase = createClient();

  const { error } = await supabase.from("user_profiles").insert({
    first_name: firstName,
    last_name: lastName,
    date_of_birth: date,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
