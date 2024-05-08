// "use client";

// // If you are getting type errors, please set 'moduleResolution' to 'bundler' in your tsconfig
// import * as Clerk from "@clerk/elements/common";
// import * as SignUp from "@clerk/elements/sign-up";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";

// export default function SignUpPage() {
//   return (
//     <div className="h-screen w-screen justify-center items-center bg-zinc-100 px-4 sm:justify-center">
//       <SignUp.Root>
//         <SignUp.Step
//           name="start"
//           className="w-full flex flex-col gap-y-4 rounded-2xl bg-background px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
//         >
//           <header className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 40 40"
//               className="mx-auto size-10 text-foreground"
//               aria-hidden
//             >
//               <mask
//                 id="a"
//                 width="40"
//                 height="40"
//                 x="0"
//                 y="0"
//                 maskUnits="userSpaceOnUse"
//               >
//                 <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
//               </mask>
//               <g fill="currentColor" mask="url(#a)">
//                 <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
//                 <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
//               </g>
//             </svg>
//             <h1 className="mt-4 text-xl font-medium tracking-tight text-foreground">
//               Create an account
//             </h1>
//           </header>
//           <Clerk.GlobalError className="block text-sm text-red-400" />
//           <div className="space-y-2">
//             <Clerk.Field name="emailAddress" className="">
//               <Clerk.Label className="">
//                 <Label>Email</Label>
//               </Clerk.Label>
//               <Clerk.Input
//                 type="email"
//                 required
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//               <Clerk.FieldError className="block text-sm text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="">
//               <Clerk.Label className="">
//                 <Label>Password</Label>
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//               <Clerk.FieldError className="block text-sm text-red-400" />
//             </Clerk.Field>
//           </div>
//           <Button className="w-full rounded-md py-1.5 text-sm font-medium shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)]">
//             <SignUp.Action submit>Sign up</SignUp.Action>
//           </Button>

//           <p className="text-center text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <Link
//               href="#"
//               className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </SignUp.Step>
//         <SignUp.Step
//           name="verifications"
//           className="w-full flex flex-col gap-y-4 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
//         >
//           <header className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 40 40"
//               className="mx-auto size-10 text-foreground"
//               aria-hidden
//             >
//               <mask
//                 id="a"
//                 width="40"
//                 height="40"
//                 x="0"
//                 y="0"
//                 maskUnits="userSpaceOnUse"
//               >
//                 <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
//               </mask>
//               <g fill="currentColor" mask="url(#a)">
//                 <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
//                 <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
//               </g>
//             </svg>
//             <h1 className="mt-4 text-xl font-medium tracking-tight text-foreground">
//               Verify email code
//             </h1>
//           </header>
//           <Clerk.GlobalError className="block text-sm text-red-400" />
//           <SignUp.Strategy name="email_code">
//             <Clerk.Field name="code" className="">
//               <Clerk.Label className="">
//                 <Label>Email code</Label>
//               </Clerk.Label>
//               <Clerk.Input
//                 type="otp"
//                 required
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//               <Clerk.FieldError className="block text-sm text-red-400" />
//             </Clerk.Field>
//             <Button className="w-full rounded-md py-1.5 text-sm font-medium shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)]">
//               <SignUp.Action submit>Verify</SignUp.Action>
//             </Button>
//           </SignUp.Strategy>
//           <p className="text-center text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <Link
//               href="/sign-in"
//               className="font-medium text-foreground decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </SignUp.Step>
//         {/* <SignUp.Step
//           name="continue"
//           className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
//         >
//           <header className="text-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 40 40"
//               className="mx-auto size-10 text-foreground"
//               aria-hidden
//             >
//               <mask
//                 id="a"
//                 width="40"
//                 height="40"
//                 x="0"
//                 y="0"
//                 maskUnits="userSpaceOnUse"
//               >
//                 <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
//               </mask>
//               <g fill="currentColor" mask="url(#a)">
//                 <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
//                 <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
//               </g>
//             </svg>
//             <h1 className="mt-4 text-xl font-medium tracking-tight text-foreground">
//               Continue registration
//             </h1>
//           </header>
//           <Clerk.GlobalError className="block text-sm text-red-400" />
//           <Clerk.Field name="username" className="space-y-2">
//             <Clerk.Label className="text-sm font-medium text-foreground">
//               Username
//             </Clerk.Label>
//             <Clerk.Input
//               type="text"
//               required
//               className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
//             />
//             <Clerk.FieldError className="block text-sm text-red-400" />
//           </Clerk.Field>
//           <SignUp.Action
//             submit
//             className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
//           >
//             Continue
//           </SignUp.Action>
//           <p className="text-center text-sm text-zinc-500">
//             Already have an account?{" "}
//             <a
//               href="#"
//               className="font-medium text-foreground decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
//             >
//               Sign in
//             </a>
//           </p>
//         </SignUp.Step> */}
//       </SignUp.Root>
//     </div>
//   );
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-[90vh] flex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
