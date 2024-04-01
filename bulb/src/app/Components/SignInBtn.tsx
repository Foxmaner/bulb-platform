"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <div className="flex flex-col">
      <button
          className="bg-slate-600 px-4 py-2 text-white m-2"
          onClick={() => signIn("github", { callbackUrl: "/meetings" })}
          type="button"
        >
          GitHub
        </button>
        <button
          className="bg-slate-600 px-4 py-2 text-white m-2"
          onClick={() => signIn("google", { callbackUrl: "/meetings" })}
          type="button"
        >
          Google
        </button>
    </div>
  );
};

export default SignInButton;