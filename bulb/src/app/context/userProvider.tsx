'use client';

import { User } from "index";
import { usePathname } from "next/navigation";

import RequestApi from "app/utils/client-request";

import React, { createContext, useContext, useEffect, useState } from 'react';


type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  	children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const path = usePathname();
	
	const [ user, setUser ] = useState<User | null>(null);

	useEffect(() => {
		const handleUser = async () => {
			if (!user && !path.includes("login") && path !== "/") {
				const resp = await RequestApi.get({
					url: `/user`
				})

				if (resp.status === 200) {
					const data = await resp.json();
					setUser(data.user);
				} else {
                    console.log("Error", resp);
                }
			}
		}

		handleUser();
	}, [user, path]);

	const value = {
		user,
		setUser
	};

	return (
		<UserContext.Provider value={value}>
	    	{children}
    	</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
    	throw new Error('useSectionContext must be used within an SectionProvider');
	}

  	return context;
};

