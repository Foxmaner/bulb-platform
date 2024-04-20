import PageHeader from "../components/pageHeader";
import MeetingsView from "app/components/meetingList";
import TemplatePopup from "app/Components/templatePopup";

export default function meetingPage() {
  return (
    <div className="bg-primaryGrey w-full h-screen py-3 pr-6">
      <div className="flex flex-col rounded-2xl w-full h-full bg-white border-1 border-edge">
        <div className="rounded-t-2xl overflow-hidden">
          <PageHeader userName="Eskil" />
        </div>
        <MeetingsView />
      </div>
    </div>
  );
}
