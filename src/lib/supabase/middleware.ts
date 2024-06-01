import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function updateSession(
  request: NextRequest,
  protectedRoutes: string[],
) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const authPaths = ["/sign-in", "/sign-up"];

  const { data, error } = await supabase.auth.getUser();

  let user = data?.user ?? null;

  const user_email = request.cookies.get("user_email");
  if (!user_email && request.nextUrl.pathname.startsWith("/auth/verify")) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  console.log(user);

  if (user) {
    const { data: data2, error: error2 } = await supabase
      .from("user_profiles")
      .select("email_verified")
      .eq("user_id", user.id)
      .single();
    if (
      data2?.email_verified === true &&
      request.nextUrl.pathname.startsWith("/auth/verify")
    ) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  if (
    !user &&
    protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (
    user &&
    authPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (user && request.nextUrl.pathname === "/profile/setup") {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("has_completed_profile_setup")
      .eq("user_id", user.id)
      .single();

    if (data?.has_completed_profile_setup) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return response;
}
