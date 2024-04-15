'use client';

import { Section, Paragraph, Meeting } from "index";

import React, { createContext, useState, useContext, ReactNode } from 'react';


type MeetingContextType = {
    meeting: Meeting;
    setMeeting: React.Dispatch<React.SetStateAction<Meeting>>;
};

const defaultMeeting: Meeting = {		
    _id: '',
    sections: []
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
