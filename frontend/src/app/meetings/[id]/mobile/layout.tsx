import { cookies } from "next/headers";

import Stripes from 'app/components/stripesMobile';
import { MeetingProvider } from '../../../context/meetingProvider';
import { EditorProvider } from 'app/context/editorProvider';



interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {
    const cookieStore = cookies()
    const cookie = cookieStore.get('connect.sid');

    return (
        <div className="relative">
            <div className='relative z-10'>
                <EditorProvider cookie={cookie?.value ?? ""}>
                    {children}
                </EditorProvider>
            </div>
            <Stripes/>
        </div>
    );
}