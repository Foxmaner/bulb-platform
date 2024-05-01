'use client';

import dynamic from 'next/dynamic'
import React, { useMemo, useRef } from 'react'

import { MeetingProvider } from '../../context/meetingProvider';


export default function Page() {
	const toolbarRef = useRef<HTMLDivElement>(null);
    const editorTempHolder = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

	const Meeting = useMemo(() => {

		return dynamic(() => import("../../components/Meeting"), {
		
		loading: () => <p>loading...</p>,
		
		ssr: false,
		
		});
		
	}, []);
		

  return (
	<div>
		<MeetingProvider 
			editorTempHolder={editorTempHolder} 
			editorRef={editorRef} 
			toolbarRef={toolbarRef}
		>
			<Meeting />
		</MeetingProvider>
	</div>
  )
}
