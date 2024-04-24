'use client';

import { Section, Paragraph } from "index"; 

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Meeting } from "index";

type MeetingContextType = {
	meeting: Meeting;
	setMeeting: React.Dispatch<React.SetStateAction<Meeting>>;
};

const DefaultData: Section[] = []

const SectionContext = createContext<MeetingContextType>({
	meeting: DefaultData,
	setMeeting: (): any => {}
});

interface MeetingProviderProps {
	children: React.ReactNode;
};

export const SectionProvider: React.FC<MeetingProviderProps> = ({ children }) => {
  const [meeting, setMeeting] = useState<Meeting>(DefaultData);

  const value = {
    meeting,
    setMeeting
  };

  return ( 
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
};


export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within an SectionProvider');
  }

  return context;
};
