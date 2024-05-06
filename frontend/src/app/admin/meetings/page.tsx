'use client';

import PageHeader from "../../components/pageHeader";
import TableView from "../../../components/table/TableView";
import { Meeting } from "index";

import { Selection, Chip, ChipProps } from "@nextui-org/react";
import { useState } from "react";
import MenuBtn from "components/btn/MenuBtn";



const statusColorMap: Record<string, ChipProps["color"]> = {
	done: "success",
	inprogress: "danger",
	upcomming: "warning",
};
  



const meetings: Meeting[] = Array.from({ length: 50 }, (_, index) => (
	{
		_id: index.toString(),
		name: `test ${index}`,
        team: "test",
        status: "done",
		sections: [],
		date: new Date().toISOString(),
	}
));

const columns = [
	{ name: "ID", uid: "_id", sortable: true },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "TEAM", uid: "team" },
	{ name: "STATUS", uid: "status", sortable: true },
	{ name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
	{ name: "Completed", uid: "done" },
	{ name: "InProgress", uid: "inprogress" },
	{ name: "Upcomming", uid: "upcomming" },
];



export default function MeetingsPage() {
	const [statusFilter, setStatusFilter] = useState<Selection>("all");

	return (
		<div className="flex-col h-[calc(100vh-2rem)] w-full bg-white border m-4 rounded-lg">
			<PageHeader contentTitle="Meetings">
				<div className="flex flex-row items-center justify-between space-x-2 w-2/5 ml-0.5 mt-2">
					<div className="flex-1">
						<MenuBtn>
							Skapa
						</MenuBtn>
					</div>
					<div className="flex-1">
						<MenuBtn>
							Företag
						</MenuBtn>
					</div>
					<div className="flex-1">
						<MenuBtn>
							Månad
						</MenuBtn>
					</div>
					<div className="flex-1">
						<MenuBtn>
							01
						</MenuBtn>
					</div>
					<div className="flex-1">
						<MenuBtn>
							Filter
						</MenuBtn>
					</div>
				</div>
			</PageHeader>
			<div className="h-[80%]">
				<TableView<Meeting>
					name="meetings"
					defaultVisibleColumns={["name", "status", "actions"]}
					specificComponents={{
						status: (value: Meeting, cellvalue: string) => (
							<Chip className="capitalize" color={statusColorMap[value.status]} size="sm" variant="flat">
								{cellvalue}
							</Chip>
						)
					}}
                    searchFilter={'name'}
					externalFilters={{
						status: {
							name: "Status",
							setFilter: setStatusFilter,
							filterValue: statusFilter,
							values: statusOptions,
						}
					}}

					data={meetings}
					columns={columns}
				/>
			</div>

		</div>
	);
}
