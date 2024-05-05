"use client";

import Link from "next/link";


const SignInButton = () => {

	const handleOAuth = () => {
		window.open(`http://localhost:3001/auth/google`, "_self");
	};

    return (
        <div className="flex flex-col">
			<button onClick={handleOAuth} className="bg-slate-600 px-4 py-2 text-white m-2">
				Logga in med Google
			</button>
        </div>
    );
};

export default SignInButton;
