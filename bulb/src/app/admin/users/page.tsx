'use client';

import PageHeader from "../../components/pageHeader";
import TableView from "../../../components/table/TableView";
import { User } from "index";

import { User as UserComponent, Selection, Chip, ChipProps } from "@nextui-org/react";
import { useState } from "react";



const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
  };
  



const users = Array.from({ length: 50 }, (_, index) => (
	{
		_id: index,
		name: `Kan inte komma på mötet, är i alperna ${index}`,
		role: "Alperna",
		team: "Management",
		status: "active",
		age: "29",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
		email: "IAlperna@gmail.com",
	}
));

const columns = [
	{ name: "ID", uid: "_id", sortable: true },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "AGE", uid: "age", sortable: true },
	{ name: "ROLE", uid: "role", sortable: true },
	{ name: "TEAM", uid: "team" },
	{ name: "EMAIL", uid: "email" },
	{ name: "STATUS", uid: "status", sortable: true },
	{ name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
	{ name: "Vacation", uid: "vacation" },
];



export default function meetingPage() {
	const [statusFilter, setStatusFilter] = useState<Selection>("all");

	return (
		<div className="flex-col h-[calc(100vh-2rem)] w-full bg-white border m-4 rounded-lg">
			<PageHeader contentTitle="Users" buttenMenu={false} />
			<div className="h-[80%]">
				<TableView<User>
					name="Users"
					defaultVisibleColumns={["name", "role", "status", "actions"]}
					specificComponents={{
						name: (value: User, cellvalue: string) => (
							<UserComponent
								avatarProps={{ radius: "lg", src: value.avatar }}
								description={value.email}
								name={cellvalue}
							>
								{value.email}
							</UserComponent>
						),
						status: (value: User, cellvalue: string) => (
							<Chip className="capitalize" color={statusColorMap[value.status]} size="sm" variant="flat">
								{cellvalue}
							</Chip>
						),
						role: (value: User, cellvalue: string) => (
							<div className="flex flex-col">
								<p className="text-bold text-small capitalize">{cellvalue}</p>
								<p className="text-bold text-tiny capitalize text-default-400">{value.team}</p>
							</div>
						)
					}}
					externalFilters={{
						status: {
							name: "Status",
							setFilter: setStatusFilter,
							filterValue: statusFilter,
							values: statusOptions,
						}
					}}

					data={users}
					columns={columns}
				/>
			</div>

		</div>
	);
}
