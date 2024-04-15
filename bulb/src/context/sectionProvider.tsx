'use client';

import { Section, Paragraph } from "index"; 

import React, { createContext, useState, useContext, ReactNode } from 'react';


type SectionContextType = {
	sections: Section[];
	setSections: React.Dispatch<React.SetStateAction<Section[]>>;
};

const DefaultData: Section[] = []

const SectionContext = createContext<SectionContextType>({
	sections: DefaultData,
	setSections: (): any => {}
});

interface SectionProviderProps {
	children: React.ReactNode;
};

export const SectionProvider: React.FC<SectionProviderProps> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>(DefaultData);

  const value = {
    sections,
    setSections
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
