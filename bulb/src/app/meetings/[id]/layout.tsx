import Stripes from 'app/components/stripes';
import { MeetingProvider } from '../../context/meetingProvider';
import { EditorProvider } from 'app/context/editorProvider';


interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {


    return (
        <div className="relative">
            <div className='relative z-10'>
                
                <EditorProvider>
                    <MeetingProvider>
                        {children}
                    </MeetingProvider>
                </EditorProvider>
            </div>
            <Stripes/>
        </div>
    );
}