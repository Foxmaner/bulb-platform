"use client";

import { signOut } from "next-auth/react";


const SignOutButton = () => {
    const handleSignOut = async () => {
        /*const resp = await fetch("http://localhost:3001/api/auth/callback/github/signOut", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });*/

        signOut({ callbackUrl: '/auth/signIn' });
    };

    return (
        <button
            className="bg-slate-600 px-4 py-2 text-white"
            onClick={handleSignOut}
            type="button"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;