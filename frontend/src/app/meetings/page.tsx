'use client';

import PageHeader from "../components/pageHeader";
import TableView from "../../components/table/TableView";
import { Meeting } from "index";

import { Selection, ChipProps } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MenuBtn from "components/btn/MenuBtn";

import { Select, SelectItem } from "@nextui-org/react";

import { BsPlusLg, BsCalendar, BsCheckCircle } from "react-icons/bs";

import Request from "../utils/client-request";
import { useMeetingContext } from "app/context/meetingProvider";

const statusColorMap: Record<string, ChipProps["color"]> = {
	done: "success",
	inprogress: "danger",
	upcomming: "warning",
};


const columns = [
	{ name: "ID", uid: "_id" },
	{ name: "NAME", uid: "name", sortable: true },
	{ name: "TEAM", uid: "team" },
	{ name: "DATE", uid: "date", sortable: true },
	{ name: "STATUS", uid: "status", sortable: true },
	{ name: "ACTIONS", uid: "actions" }
];

const modified = [ 
	{ name: "Idag", uid: "idag" }, 
	{ name: "7 dagar", uid: "7dagar" },
	{ name: "30 dagar", uid: "30dagar" } 
]

const statusOptions = [
	{ name: "Completed", uid: "done" },
	{ name: "InProgress", uid: "inprogress" },
	{ name: "Upcomming", uid: "upcomming" },
	{ name: "Unset", uid: "unset" }
];


export default function MeetingsPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { setMeeting } = useMeetingContext();
	const [ meetingList, setMeetingList ] = useState<Meeting[]>([]);
	const [ loading, setLoading] = useState<boolean>(true);

	const [statusFilter, setStatusFilter] = useState<Selection>("all");
	const [dayFilter, setDayFilter] = useState<Selection>("all");

	const createMeeting = async () => {
		const resp = await Request.post({
			url: "/meeting/create",
			body: {
				name: "Namnlöst Möte",
			}
		});

		if (resp.status !== 201) {
			console.log("Error creating meeting");
		}

		const data = await resp.json();

		const meeting = data.meeting;
		
		setMeeting(meeting)
		router.push(`/meetings/${meeting._id}`);
	}

	const checkDate = (value: Meeting) => {
		const now = new Date();
		const meetingDate = new Date(value.date);

		const timeDifference = now.getTime() - meetingDate.getTime();

		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

		if (dayFilter !== "all") {
			const day = Array.from(dayFilter)[0];

			if (day === "idag") {
				return daysDifference === 0;
			} else if (day === "7dagar") {
				return daysDifference <= 7;
			} else if (day === "30dagar") {
				return daysDifference <= 30;
			}
		}
		return true;
	}

	useEffect(() => {
		const fetchMeetings = async () => {
			let holder = searchParams.get("holder");

			const valid = ["user", "shared", "published"];

			if (!holder || !valid.includes(holder)) {
				holder = "user"
			}

			const resp = await Request.get({
				url: "/meeting/"+holder
			});

			setLoading(false);
	
			if (resp.status !== 200) {
				console.log("Error fetching meetings");
				return;
			}
	
			const data = await resp.json();
	
			const meetings = data.meetings;
			setMeetingList(meetings);

		}

		fetchMeetings();
	}, [searchParams]);

	return (
		<div className="flex-col h-[calc(100vh-2rem)] w-full bg-white border m-4 ml-0 rounded-lg">
			<PageHeader contentTitle="Meetings">
				<div className="flex flex-row items-center justify-between space-x-2 w-1/5 ml-0.5 mt-2">
					<div className="flex-1">
						<MenuBtn createButton={createMeeting}>
							<BsPlusLg />
							Ny
						</MenuBtn>
					</div>
					<div className="flex-1">
						<Select 
							aria-label="date-filter"
							value={dayFilter as string}
							onSelectionChange={(item) => {
								if (Array.from(item).length > 0) {
									setDayFilter(item)
								} else {
									setDayFilter("all")
								}
							}}
							placeholder="Modifierad"
							startContent={<BsCalendar />}
							classNames={{
								base: "rounded-lg bg-transparent outline-none shadow-none border-none text-primaryText h-7 hover:bg-transparent w-36",
								mainWrapper: "bg-none h-7 rounded-lg bg-white hover:bg-primaryGrey border border-edge hover:bg-transparent w-full",
								innerWrapper: " text-primaryText h-7 w-24 [&>span]:text-primaryText",
								trigger: "rounded-lg bg-transparent shadow-none border-none text-primaryText min-h-7 h-7 data-[hover=true]:bg-transparent gap-0 w-full mr-4",
								value: "px-0 w-24 group-data-[has-value=true]:text-primaryText",
							}}
							items={modified}
						>
							{
								(item) => (
									<SelectItem key={item.uid}>{item.name}</SelectItem>
								)
							}
						</Select>
					</div>
					<div className="flex-1">
						<Select 
							aria-label="date-filter"
							value={statusFilter as string}
							onSelectionChange={(item) => {
								if (Array.from(item).length > 0) {
									setStatusFilter(item)
								} else {
									setStatusFilter("all")
								}
							}}
							placeholder="Status"
							startContent={<BsCheckCircle />}
							classNames={{
								base: "rounded-lg bg-transparent outline-none shadow-none border-none text-primaryText h-7 hover:bg-transparent",
								mainWrapper: "bg-none h-7 rounded-lg bg-white hover:bg-primaryGrey border border-edge hover:bg-transparent w-full",
								innerWrapper: " text-primaryText h-7 [&>span]:text-primaryText",
								trigger: "rounded-lg bg-transparent shadow-none border-none text-primaryText min-h-7 h-7 data-[hover=true]:bg-transparent gap-0 w-full mr-4",
								value: "px-0 w-24 group-data-[has-value=true]:text-primaryText",
							}}
							items={statusOptions}
						>
							{
								(item) => (
									<SelectItem key={item.uid}>{item.name}</SelectItem>
								)
							}
						</Select>
					</div>
				</div>
			</PageHeader>
			<div className="h-[70%]">
				{
				/*
					<Select
						aria-label="status"
						selectedKeys={cellvalue !== "" ? cellvalue : "Unset"}
						className="max-w-xs"
					>
						{statusOptions.map((statusOption) => (
							<SelectItem key={statusOption.uid}>
								{statusOption.name}
							</SelectItem>
						))}
					</Select>
				*/
				}
				<TableView<Meeting>
					name="meetings"
          			link="/meetings/"
					defaultVisibleColumns={["name", "date", "status", "actions"]}
					specificComponents={{
					status: (value: Meeting, cellvalue: string) => (
						<p>{cellvalue}</p>
					),
					}}
                    searchFilter={'name'}
					externalFilters={{
						status: {
							name: "Status",
							setFilter: setStatusFilter,
							filterValue: statusFilter,
							values: statusOptions,
						},
						date: {
							name: "Date",
							filterFunction: checkDate,
							setFilter: setDayFilter,
							filterValue: dayFilter,
							values: modified,
						}
					}}

					data={meetingList}
					columns={columns}
					loading={loading}
				/>
			</div>
		</div>
	);
}
