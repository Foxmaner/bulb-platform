
import PageHeader from "../components/pageHeader";

import MeetingsView from "../components/meetingsView";

import RequestApi from "app/utils/server-request";
import { cookies } from "next/headers";

export default async function MeetingPage() {


	const response = await RequestApi.get({
		url: "/meeting/"
	})

	console.log(response.status);

	return (
        <div className="flex-col w-full bg-white">
            <PageHeader userName="Eskil" />
            <MeetingsView meetings={[]}/>
        </div>
    );
}
