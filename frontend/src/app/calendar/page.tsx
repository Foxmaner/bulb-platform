"use client";

import React, { Suspense, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import { useCallback, useRef, useState } from "react";

import "./calender.css";

import {
    Selection,
    Spinner,
} from "@nextui-org/react";

import { EventSourceInput } from "@fullcalendar/core/index.js";

import { CalendarHeader } from "app/components/calendar/calendarHeader";
import { Event } from "app/components/calendar/calendarEvent";
import CalenderPopover from "app/components/calendar/calendarPopover";
import CalenderDayHeader from "app/components/calendar/calendarDayHeader";
import RequestApi from "app/utils/client-request";
import { Meeting } from "index";


export default function Calender() {
    const [open, setOpen] = useState<string>("0");

    const [id, setId] = useState<number>(0); // TMP

    const [selectedViews, setSelectedViews] = useState<Selection>(
        new Set(["timeGridWeek"])
    );
    const ref = useRef<FullCalendar>(null);
    const [event, setEvent] = useState<Event>();
    const [allEvents, setAllEvents] = useState<Event[]>([]);

    const createEvent = (event: Event) => {
        setAllEvents([...allEvents, event]);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const resp = await RequestApi.get({
                url: "/meeting/user"
            });

            if (resp.status === 200) {
                const data = await resp.json();
                
                console.log("999", data.meetings);

                const newMeetings = data.meetings.filter(
                    (meeting: Meeting) => meeting.scheduledStart && meeting.scheduledEnd
                );

                console.log("888", newMeetings);

                const newEvents = newMeetings.map((meeting: Meeting) => {
                    return {
                        title: meeting.name,
                        start: new Date(meeting.scheduledStart!),
                        end: new Date(meeting.scheduledEnd!),
                        id: meeting._id,
                    };
                })

                setAllEvents(newEvents);
            }
        };

        fetchEvents();
    }, [setAllEvents])

    const handleEventClick = (arg: any) => {
        setEvent({
            title: arg.event.title,
            start: new Date(arg.event.start),
            end: new Date(arg.event.end),
            id: arg.event.id,
        });

        setOpen(arg.event.id);
    };

    const handleDateClick = useCallback(
        (arg: any) => {
            const newId = id + 1;
            setId(newId);

            setEvent({
                title: "",
                start: new Date(arg.start),
                end: new Date(arg.end),
                id: newId.toString(),
            });

            setOpen(newId.toString());
        },
        [setEvent, id, setId]
    );

    const handleSelectDay = useCallback(
        (text: string) => {
            const calApi = ref.current?.getApi();

            if (calApi) {
                const [day, month] = text.slice(3).split("/");
                const year = calApi.getDate().getFullYear();

                setSelectedViews(new Set(["timeGridDay"]));
                calApi.changeView("timeGridDay");
                calApi.gotoDate(new Date(`${year}/${day}/${month}`));
            }
        },
        [ref]
    );

    return (
        <main className="flex flex-col border-1 border-edge items-center w-full bg-white m-4 p-4 rounded-lg">
            <CalendarHeader
                setSelectedViews={setSelectedViews}
                selectedViews={selectedViews}
                calendarRef={ref}
            />
            <div className=" text-primary h-[55vh] w-[82vw]">
                <Suspense fallback={<Spinner />}>
                    <FullCalendar
                        eventContent={({ event: eventInfo }: any) => {
                            return (
                                <CalenderPopover
                                    calendarRef={ref}
                                    createEvent={createEvent}
                                    open={open}
                                    setOpen={setOpen}
                                    event={
                                        eventInfo.title === ""
                                            ? event
                                            : eventInfo
                                    }
                                />
                            );
                        }}
                        ref={ref}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin,
                        ]}
                        headerToolbar={false}
                        slotDuration={"00:15:00"}
                        slotLabelFormat={[
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                omitZeroMinute: false,
                                meridiem: "short",
                            },
                        ]}
                        slotMinTime={"01:00:00"}
                        slotLabelContent={({ text }) => {
                            if (text.slice(3, 5) === "00") {
                                return (
                                    text.slice(0, 2) + " " + text.slice(5, 8)
                                );
                            }
                            return "";
                        }}
                        contentHeight={"84vh"}
                        allDaySlot={false}
                        titleFormat={{ year: "numeric", month: "short" }}
                        dayHeaderContent={({ text, isToday }) => (
                            <CalenderDayHeader
                                isToday={isToday}
                                text={text}
                                calendarRef={ref}
                                handleSelectDay={handleSelectDay}
                            />
                        )}
                        initialView="timeGridWeek"
                        eventBackgroundColor="#8B4270"
                        events={allEvents as EventSourceInput}
                        editable={false}
                        nowIndicator={true}
                        selectable={true}
                        selectAllow={(selectInfo) => {
                            return (
                                selectInfo.start.getDay() ===
                                selectInfo.end.getDay()
                            );
                        
                        }}
                        droppable={true}
                        selectMirror={true}
                        unselectAuto={false}
                        select={handleDateClick}
                        unselect={() => false}
                        eventClick={handleEventClick}
                    />
                </Suspense>
            </div>
        </main>
    );
}
