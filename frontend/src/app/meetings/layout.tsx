import { MeetingProvider } from 'app/context/meetingProvider';


interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {


    return (
        <MeetingProvider>
            {children}
        </MeetingProvider>
    );
}