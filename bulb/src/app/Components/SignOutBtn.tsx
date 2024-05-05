"use client";

import RequestApi from "../utils/client-request";



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
            onClick={handleOAuth}
            type="button"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;