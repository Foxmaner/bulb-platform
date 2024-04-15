import PageHeader from "../components/pageHeader";

import MeetingsView from "app/components/meetingList";


export default function meetingPage() {
  return (
    <div className="flex-col w-full bg-white">
      <PageHeader userName="Eskil" />
      <MeetingsView />
    </div>
  );
}
