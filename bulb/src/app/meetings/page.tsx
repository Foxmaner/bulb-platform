import PageHeader from "../components/pageHeader";
import MeetingsView from "app/components/meetingList";
import TemplatePopup from "app/Components/templatePopup";
import homepageimage from "../../../public/homepage2.svg";
import Image from "next/image";

export default function meetingPage() {
  return (
    <div className="bg-primaryGrey w-full h-screen py-3 pr-6 relative">
      <div className="flex flex-col rounded-2xl w-full h-full bg-white border-1 border-edge z-20">
        <div className="rounded-t-2xl overflow-hidden">
          <PageHeader userName="Eskil" />
        </div>
        <MeetingsView />
      </div>

      {/* // not done
      <Image
        src={homepageimage}
        alt={"image"}
        className="z-10 mb-3 overflow-hidden absolute bottom-0 right-0"
      ></Image>  */}
    </div>
  );
}
