"use client";

import React, { Suspense } from 'react';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCallback, useRef, useState } from "react";

import './calender.css';

import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Selection,
    useDisclosure,
    Spinner
} from "@nextui-org/react";


import {
    EventSourceInput,
} from "@fullcalendar/core/index.js";

import { CalendarHeader } from "app/components/calenderHeader";
import { Event } from "app/components/calenderEvent";
import CalenderPopover from 'app/components/calenderPopover';


const INITIAL_EVENTS = [
    {
        id: 123,
        title: "All-day event",
        start: "2024-04-21T11:00:00",
        end: "2024-04-21T12:00:00"
    },
    {
        id: 456,
        title: "Timed event",
        start: "2024-04-22T10:00:00",
        end: "2024-04-22T12:00:00"
    },
];

export default function Calender() {
    const [open, setOpen] = useState<number>(0);

    const [ id, setId ] = useState<number>(0); // TMP

    const [selectedViews, setSelectedViews] = useState<Selection>(
        new Set(["timeGridWeek"])
    );
    const ref = useRef<FullCalendar>(null);
    const [event, setEvent] = useState<Event>();
    const [allEvents, setAllEvents] = useState<Event[]>(INITIAL_EVENTS);

    const createEvent = (event: Event) => {
        setAllEvents([...allEvents, event]);
    }

    const handleEventClick = (arg: any) => {
        setEvent({
            title: arg.event.title,
            start: new Date(arg.event.start),
            end: new Date(arg.event.end),
            id: arg.event.id,   
        });

        setOpen(arg.event.id);
    };

    const handleDateClick = useCallback((arg: any) => {
        const newId = id + 1;
        setId(newId);

        setEvent({
            title: "",
            start: new Date(arg.start),
            end: new Date(arg.end),
            id: newId,   
        });

        setOpen(newId);

    }, [setEvent, id, setId]);

    const handleSelectDay = useCallback((text: string) => {
        const calApi = ref.current?.getApi();

        if (calApi) {
            const [day, month] = text.slice(3).split("/");
            const year = calApi.getDate().getFullYear()

            setSelectedViews(new Set(["timeGridDay"]));
            calApi.changeView("timeGridDay");
            calApi.gotoDate(new Date(`${year}/${day}/${month}`));
        }
    }, [ref]);

    const handleQtip = ({ event: eventInfo }: any) => {
        return (
            <CalenderPopover 
                calendarRef={ref}
                createEvent={createEvent}
                open={open} 
                setOpen={setOpen}
                event={eventInfo} 
            />
        )
    }

    return (
        <>
            <main className="flex flex-col border-1 border-edge items-center w-full bg-white m-4 p-4 rounded-lg">
                <CalendarHeader
                    setSelectedViews={setSelectedViews}
                    selectedViews={selectedViews}
                    calendarRef={ref}
                />
                <div className=" text-primary h-[55vh] w-[82vw]">
                    <Suspense fallback={<Spinner />}>
                        <FullCalendar
                            eventContent={handleQtip}
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
                            dayHeaderContent={({ text, isToday }) => {
                                return (
                                    <div className="flex flex-col justify-center items-center p-1">
                                        <p
                                            className={`text-xs font-bold p-1 -mb-1 ${
                                                isToday ? " text-secondary" : ""
                                            }`}
                                        >
                                            {text.slice(0, 3)}
                                        </p>
                                        {
                                            ref.current?.getApi()?.view.type === "timeGridWeek" && (<h1
                                                onClick={() => handleSelectDay(text)}
                                                className={`font-bold py-1.5 px-2 m-0 ${
                                                    isToday
                                                        ? "text-white bg-secondary hover:bg-opacity-90"
                                                        : "hover:bg-easyGrey"
                                                } cursor-pointer rounded-full`}
                                            >
                                                {isToday
                                                    ? text.slice(6, 8)
                                                    : text.split("/")[1]}
                                            </h1>)
                                        }
                                        
                                    </div>
                                );
                            }}
    
                            initialView="timeGridWeek"
                            eventBackgroundColor="#8B4270"
                            events={allEvents as EventSourceInput}
                            editable={false}
                            nowIndicator={true}
                            selectable={true}
                            selectMirror={true}

                            unselectAuto={false}
                            select={handleDateClick}
                            unselect={() => {
                                return false;
                            }}
                            eventClick={handleEventClick}
                        />
                    </Suspense>
                </div>
            </main>

        </>
    );
}
