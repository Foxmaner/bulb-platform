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

import { Toolbar } from "app/components/toolbar";
import { Section, Paragraph, Meeting } from "index";

import React, { createContext, useState, useContext, ReactNode } from 'react';


type MeetingContextType = {
    meeting: Meeting;
    setMeeting: React.Dispatch<React.SetStateAction<Meeting>>;
};

const defaultMeeting: Meeting = {		
    _id: '',
	title:"",
    sections: [],
	
}

const MeetingContext = createContext<MeetingContextType>({
    meeting: defaultMeeting,
    setMeeting: (): any => { }
});

interface MeetingProviderProps {
  	children: React.ReactNode;
};

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ children }) => {
	const [meeting, setMeeting] = useState<Meeting>(defaultMeeting);
	
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
