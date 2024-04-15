'use client';

import { Section } from "index"; 

import React, { createContext, useState, useContext, ReactNode } from 'react';

type DataType = {
    sections: Section[];
}

type MeetingContextType = {
    data: DataType;
    setData: React.Dispatch<React.SetStateAction<DataType>>;
};

const DefaultData: DataType = { 
    sections: []
}

const MeetingContext = createContext<MeetingContextType>({
    data: DefaultData,
    setData: (): any => {}
});

type MeetingProviderProps = {
  children: React.ReactNode;
};

export const MeetingProvider: React.FC<MeetingProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataType>(DefaultData);

  const value = {
    data,
    setData
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
    throw new Error('useMeetingContext must be used within an MeetingProvider');
  }
  return context;
};
