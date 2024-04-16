import Stripes from 'app/components/stripes';
import { MeetingProvider } from '../../context/meetingProvider';


interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {


    return (
        <div className="relative">
            <div className='relative z-10'>
                <MeetingProvider>
                    {children}
                </MeetingProvider>
            </div>
            <Stripes/>
        </div>
    );
}