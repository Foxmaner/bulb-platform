"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";


import {
    Selection,
    useDisclosure
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

import {
    EventSourceInput,
} from "@fullcalendar/core/index.js";

import { CalendarHeader } from "app/components/calenderHeader";
import CalenderEvent, { Event } from "app/components/calenderEvent";


const INITIAL_EVENTS = [
    {
        id: 123,
        title: "All-day event",
        start: "2024-04-21T00:00:00",
        allDay: false,
    },
    {
        id: 456,
        title: "Timed event",
        start: "2024-04-22T00:00:00",
        allDay: false,
    },
];

export default function Calender() {

    // TMP
    const [ id, setId ] = useState<number>(0);

    const [selectedViews, setSelectedViews] = useState<Selection>(
        new Set(["timeGridWeek"])
    );
    const ref = useRef<FullCalendar>(null);
    const [event, setEvent] = useState<Event>();
    const [allEvents, setAllEvents] = useState<Event[]>(INITIAL_EVENTS);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDateClick = (arg: any) => {
        const newId = id + 1;

        setId(newId);

        setEvent({
            title: "Untitled",
            start: new Date(arg.start),
            end: new Date(arg.end),
            allDay: false,
            id: newId,   
        });

        onOpen();
    };

    const handleSelectDay = (text: string) => {
        const calApi = ref.current?.getApi();

        if (calApi) {
            setSelectedViews(new Set(["timeGridDay"]));
            calApi.changeView("timeGridDay");
            calApi.gotoDate(new Date(text));
        }
    };


    return (
        <>
            <main className="flex flex-col border-1 border-edge items-center w-full bg-white m-4 p-4 rounded-lg">
                <CalenderEvent isOpen={isOpen} onOpenChange={onOpenChange} event={event} />
                <CalendarHeader
                    setSelectedViews={setSelectedViews}
                    selectedViews={selectedViews}
                    calendarRef={ref}
                />
                <div className=" text-primary h-[55vh] w-[82vw]">
                    <FullCalendar
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
                                    <h1
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
                                    </h1>
                                </div>
                            );
                        }}
                        nowIndicatorClassNames={"text-primary"}
                        viewClassNames={"bg-white"}
                        dayCellClassNames={"bg-white"}
                        initialView="timeGridWeek"
                        eventBackgroundColor="#8B4270"
                        events={allEvents as EventSourceInput}
                        editable={true}
                        droppable={true}
                        nowIndicator={true}
                        selectable={true}
                        selectMirror={true}

                        select={handleDateClick}
                        eventClick={handleDateClick}
                    />
                </div>
            </main>

        </>
    );
}
