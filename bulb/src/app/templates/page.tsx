import PageHeader from "../components/pageHeader";
import TemplateView from "../components/templateList";

export default function documentPage() {
  return (
    <div className="bg-primaryGrey w-full h-screen py-3 pr-6">
      <div className="flex flex-col rounded-2xl w-full h-full bg-white border-1 border-edge">
        <div className="rounded-t-2xl overflow-hidden">
          <PageHeader userName="Eskil" />
        </div>
        <TemplateView />
      </div>
    </div>
  );
}
