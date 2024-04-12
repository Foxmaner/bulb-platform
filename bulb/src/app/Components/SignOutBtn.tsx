"use client";

import RequestApi from "../utils/request";



const SignOutButton = () => {
	const handleOAuth = async () => {
		const response = await RequestApi.post({
            url: "/auth/logout",
        });

        if (response.status === 200) {
            window.location.href = "/auth/signIn";
        }
	};

    return (
        <button
            className="bg-slate-600 px-4 py-2 text-white"
            onClick={handleOAuth}
            type="button"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;