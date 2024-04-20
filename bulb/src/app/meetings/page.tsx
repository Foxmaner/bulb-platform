import PageHeader from "../components/pageHeader";
import MeetingsView from "app/components/meetingList";

export default function meetingPage() {
  return (
    <div className="bg-primaryGrey w-full py-3 pr-6">
      <div className="flex flex-col rounded-2xl w-full h-full bg-white border-1 border-edge">
        <div className="rounded-t-2xl overflow-hidden">
          <PageHeader userName="Eskil" />
        </div>
        <div className="h-full mt-4">
          <MeetingsView />
        </div>
      </div>
    </div>
  );
}
