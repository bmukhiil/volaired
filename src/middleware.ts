import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(
  (auth, req) => {
    // Add your middleware checks
    console.log("Middleware checks");
  },
  { debug: true },
);

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
