import Stripes from 'app/components/stripes';


interface layoutProps {
    children: React.ReactNode;
}

export default function LayoutPage({ children }: layoutProps) {


    return (
        <div className="relative">
            <div className='relative z-10'>
                {children}
            </div>
            <Stripes/>
        </div>
    );
}