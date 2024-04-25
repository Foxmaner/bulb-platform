import PageHeader from "../components/pageHeader"
import TemplateView from "../components/templateList"


export default function documentPage() {
    return(
        <div className='flex-col w-full bg-white'>
            <PageHeader userName = "Eskil" />
            <TemplateView />
        </div>
    );
}

