/**
 * MeetingProvider Component
 * 
 * This component provides a context for managing the meeting data throughout the application.
 * It wraps the entire application with the MeetingContext, allowing components to access and update the meeting data.
 * 
 * Props:
 * - children: ReactNode - The child components wrapped by the MeetingProvider.
 * 
 * Usage:
 * <MeetingProvider>
 *   <App />
 * </MeetingProvider>
 * 
 * Note: This component should be placed at the top level of the component tree to provide access to the meeting context across the entire application.
 */

'use client';

import { Meeting } from "index";
import { usePathname } from "next/navigation";

import RequestApi from "app/utils/client-request";

import React, { createContext, useContext, useEffect, useState } from 'react';


type MeetingContextType = {
    meeting: Meeting;
    setMeeting: React.Dispatch<React.SetStateAction<Meeting>>;
};

const defaultMeeting: Meeting = {		
	_id: "",
	name: "",
	team: "",
	status: "",
	date: "",
	sections: [],
	members: []
}

const MeetingContext = createContext<MeetingContextType>({
    meeting: defaultMeeting,
    setMeeting: (): any => { }
});

interface MeetingProviderProps {
  	children: React.ReactNode;
};

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ children }) => {
	const path = usePathname();
    const room = path.split("/");
	
	const [meeting, setMeeting] = useState<Meeting>(defaultMeeting);

	useEffect(() => {
		const handleMeeting = async () => {
			if (meeting._id === "" && path.includes("meetings") && room.length > 2) {
				const resp = await RequestApi.get({
					url: `/meeting/${room[2]}`
				})

				if (resp.status === 200) {
					const data = await resp.json();

					console.log("GOT MEETING!!", data.meeting)
					setMeeting(data.meeting);
				} else {
					console.log("Status", resp.status)
				}
			}
		}

		handleMeeting();
	}, [meeting, path, room]);

	const value = {
		meeting,
		setMeeting
	};

	return (
		<MeetingContext.Provider value={value}>
	    	{children}
    	</MeetingContext.Provider>
	);
};

export const useMeetingContext = () => {
	const context = useContext(MeetingContext);
	if (!context) {
    	throw new Error('useSectionContext must be used within an SectionProvider');
	}

  	return context;
};
function io(arg0: string) {
	throw new Error("Function not implemented.");
}

