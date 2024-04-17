import PageHeader from "../components/pageHeader";
import DocumentsView from "../components/documentList";

export default function documentPage() {
  return (
    <div className="flex-col w-full bg-white">
      <PageHeader userName="Eskil" />
      <DocumentsView />
    </div>
  );
}
