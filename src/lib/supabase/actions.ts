"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function signin({ email }: { email: string }) {
  const supabase = createClient();

  if (!email) {
    throw new Error("Email is required");
  }

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    // options: {
    //   // set this to false if you do not want the user to be automatically signed up
    //   shouldCreateUser: true,
    // },
  });

  if (error) {
    throw new Error(error.message);
    // redirect("/auth/auth-error-code");
  }

  cookies().set("user_email", email, {
    // secure: true,
    // httpOnly: true,
    // sameSite: "lax",
    // expire in 5 seconds
    expires: new Date(Date.now() + 3000),
  });

  revalidatePath("/auth/verify", "page");
  redirect("/auth/verify");
}

// export async function signup({ email }: { email: string }) {
//   const supabase = createClient();

//   if (!email) {
//     throw new Error("Email is required.");
//   }

//   const { data, error } = await supabase.auth.signUp({ email });
//   console.log(data);

//   if (error) {
//     throw new Error(error.message);
//   }

//   const { data: data2, error: error2 } = await supabase
//     .from("user_profiles")
//     .insert({ user_id: data.user?.id, email: email, email_verified: false });

//   await supabase.auth.refreshSession();

//   revalidatePath(`/auth/verify`, "page");
//   redirect("/auth/verify");
// }

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

  const { error: error2 } = await supabase.from("user_profiles").upsert(
    [
      {
        email,
        email_verified: true,
      },
    ],
    { onConflict: "email" },
  );

  if (error2) {
    throw new Error(error2.message);
  }

  // cookies().delete("user_email");

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

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
