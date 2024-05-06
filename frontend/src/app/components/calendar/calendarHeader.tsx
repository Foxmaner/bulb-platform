import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";


import * as nextArrow from "app/../../public/icons/next-arrow.svg";
import * as prevArrow from "app/../../public/icons/prev-arrow.svg";
import * as settings from "app/../../public/icons/settings.svg";

import Image from "next/image";
import {
    Button,
    Calendar,
    Selection,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
    CalendarDate
} from "@nextui-org/react";

export type TCalendarHeader = {
    calendarRef: RefObject<FullCalendar>;
    selectedViews: Selection;
    setSelectedViews: Dispatch<SetStateAction<Selection>>
};

const updateWeekDate = (start: Date, end: Date): string => {
    if (start.getMonth() === end.getMonth()) {
        return start.toLocaleDateString("sv", { month: "long", year: "numeric" });
    
    } else if (start.getMonth() !== end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return`${
            start.toLocaleString('sv', { month: 'short' })
        }. - ${end.toLocaleString('sv', { month: 'short' })}. ${end.getFullYear()}`;
    }
    else {
        return `${
            start.toLocaleString('default', { month: 'short' })
        }. ${start.getFullYear()} - ${end.toLocaleString('sv', { month: 'short' })}. ${end.getFullYear()}`;
    }
}

const updateDayDate = (start: Date): string => {
    return `Den ${start.toLocaleDateString("sv", { day: "numeric", month: "long", year: "numeric" })}`
}

const updateMonthDate = (start: Date): string => {
    start.setDate(start.getDay()+7);
    return start.toLocaleDateString("sv", { month: "long", year: "numeric" });
}

const getDefaultDates = (): [start: Date, end: Date] => {
    const start = new Date(); // Look for closest monday
    const currentDay = start.getDay();
    const daysUntilSunday = (currentDay % 7) - 1;
    start.setDate(start.getDate() - daysUntilSunday);

    const end = new Date(start); // Look for closest friday
    end.setDate(start.getDate() + 6);

    return [start, end];
}

export function CalendarHeader({ calendarRef, selectedViews, setSelectedViews }: TCalendarHeader) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["viewWeekends", "viewEndedMeetings"]));
    const [date, setDate] = useState<string>(updateWeekDate(...getDefaultDates()));

    const handleDateChange = (direction: "prev" | "today" | "next"): void => {
        const calApi = calendarRef.current?.getApi();

        if (calApi) {
            if (direction === "prev") {
                calApi.prev();
            } else if (direction === "next") {
                calApi.next();
            } else {
                calApi.today();
            }

            const view = calApi.view;
            const viewStart = new Date(view.activeStart);
            const viewEnd = new Date(view.activeEnd);

            if (calApi.view.type === "dayGridMonth") {
                setDate(updateMonthDate(viewStart));
            } else if (calApi.view.type === "timeGridWeek") {
                setDate(updateWeekDate(viewStart, viewEnd));
            } else {
                setDate(updateDayDate(viewStart));
            }

        }
    };

    const handleViewSelect = (keys: Selection): any => {
        const calApi = calendarRef.current?.getApi();

        if (calApi) {
            setSelectedViews(keys as Set<string>);
            calApi.changeView(Array.from(keys)[0] as string);
        }
    }

    const handleOptions = (keys: Selection): any => {
        const calApi = calendarRef.current?.getApi();

        if (calApi) {
            const viewWeekends = Array.from(keys).includes("viewWeekends");
            
            calApi.setOption("weekends", viewWeekends);
            
            setSelectedKeys(keys as Set<string>);
        }
    }

    const SelectNewViewDate = (date: CalendarDate) => {
        console.log(date);
        const calApi = calendarRef.current?.getApi();

        if (calApi) {
            const formatedDate = [date.year, date.month, date.day].join("-");

            calApi.gotoDate(new Date(formatedDate));
        }
    }

    return (
        <header className="flex flex-row justify-between items-center m-0 mb-2 p-0 px-8 pb-3 w-full border-b border-edge">
            <div className="flex ml-4">
                <h1 className="text-3xl mr-8">Kalender</h1>
                <Button
                    color="primary"
                    variant="bordered"
                    className="border-1 border-edge rounded-lg"
                    onClick={() => handleDateChange("today")}
                >
                    Idag
                </Button>

                <div className="flex flex-row justify-center items-center ml-4">
                    <Button
                        isIconOnly
                        className="bg-transparent hover:bg-primaryGrey rounded-full"
                        onClick={() => handleDateChange("prev")}
                    >
                        <Image
                            alt="Previous arrow"
                            src={prevArrow}
                            height={20}
                            width={20}
                        />
                    </Button>
                    <Button
                        isIconOnly
                        className="bg-transparent hover:bg-primaryGrey rounded-full"
                        onClick={() => handleDateChange("next")}
                    >
                        <Image
                            alt="Next arrow"
                            src={nextArrow}
                            height={20}
                            width={20}
                        />
                    </Button>
                    <Dropdown
                        closeOnSelect={false}
                        classNames={{
                            content:
                                "bg-transparent shadow-none hover:bg-transparent",
                        }}
                    >
                        <DropdownTrigger>
                            <Button
                                color="primary"
                                variant="flat"
                                className="bg-transparent text-3xl"
                            >
                                {date}
                                <Image
                                    alt="Next arrow"
                                    src={nextArrow}
                                    className="rotate-90 font-bold"
                                    height={15}
                                    width={15}
                                />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            color={"secondary"}
                            classNames={{
                                list: "[&>li]:hover:bg-transparent",
                            }}
                            aria-label="Options"
                        >
                            <DropdownItem
                                classNames={{}}
                                key="new"
                                className="bg-transparent hover:bg-transparent"
                            >
                                <Calendar
                                    className="border-1 border-edge shadow-none"
                                    color="secondary"
                                    aria-label="Date (No Selection)"
                                    onFocusChange={SelectNewViewDate}
                                />
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="flex items-center">
                <Dropdown
                    aria-label="Dropdown Variants"
                    classNames={{
                        trigger: "bg-transparent shadow-none border-none",
                    }}
                >
                    <DropdownTrigger className="bg-transparent shadow-none border-none">
                        <Image
                            alt="Settings"
                            src={settings}
                            className="cursor-pointer font-bold h-12 w-12 p-2 mx-4 hover:bg-primaryGrey rounded-full"
                            height={30}
                            width={30}
                        />
                    </DropdownTrigger>
                    <DropdownMenu 
                        selectedKeys={selectedKeys}
                        selectionMode="multiple"
                        onSelectionChange={handleOptions}
                        aria-label="Dropdown Variants"
                    >
                        <DropdownItem key="viewWeekends">Visa Helger</DropdownItem>
                        <DropdownItem key="viewEndedMeetings">Visa slutförda möten</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Select
                    aria-label="View Select"
                    disallowEmptySelection
                    selectedKeys={selectedViews}
                    radius="sm"
                    classNames={{
                        base: "w-24",
                        trigger:
                            "data-[hover=true]:bg-transparent bg-transparent shadow-none border-1 border-edge",
                        mainWrapper: "hover:bg-transparent",
                        listbox: "[&>li]:bg-transparent",
                    }}
                    onSelectionChange={handleViewSelect}
                    
                >
                    <SelectItem
                        classNames={{
                            base: "data-[pressed=true]:bg-primaryGrey data-[hover=true]:bg-primaryGrey",
                        }}
                        key={"timeGridDay"}
                        value={"Day"}
                        onClick={() => handleDateChange("today")}
                    >
                        Dag
                    </SelectItem>
                    <SelectItem
                        classNames={{
                            base: "data-[pressed=true]:bg-primaryGrey data-[hover=true]:bg-primaryGrey",
                        }}
                        key={"timeGridWeek"}
                        value={"Week"}
                        onClick={() => handleDateChange("today")}
                    >
                        Vecka
                    </SelectItem>
                    <SelectItem
                        classNames={{
                            base: "data-[pressed=true]:bg-primaryGrey data-[hover=true]:bg-primaryGrey",
                        }}
                        key={"dayGridMonth"}
                        value={"Month"}
                        onClick={() => handleDateChange("today")}
                    >
                        Månad
                    </SelectItem>
                </Select>
            </div>
        </header>
    );
}
