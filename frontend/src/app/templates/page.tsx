import PageHeader from "../components/pageHeader";
import TableView from "../../components/table/TableView";
import { Meeting, Template } from "index";


const getDate = (index: number) => {
	const date = new Date();
	date.setDate(date.getDate() + index);
	return date.toLocaleDateString("default", { day: "numeric", month: "long", year: "numeric" });
}

const templates: Template[] = Array.from({ length: 50 }, (_, index) => (
	{
		_id: index,
		name: `test ${index}`,
        team: "test",
        status: "done",
		date: getDate(index),
	}
));

const columns = [
	{ name: "ID", uid: "_id" },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "TEAM", uid: "team" },
	{ name: "DATE", uid: "date", sortable: true },
	{ name: "ACTIONS", uid: "actions" },
];


export default function TemplatesPage() {
	return (
		<div className="flex-col h-[calc(100vh-2rem)] w-full bg-white border m-4 ml-0 rounded-lg">
			

		</div>
	);
}
