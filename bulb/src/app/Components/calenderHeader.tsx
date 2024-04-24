import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";


import * as nextArrow from "../../../public/icons/next-arrow.svg";
import * as prevArrow from "../../../public/icons/prev-arrow.svg";
import * as settings from "../../../public/icons/settings.svg";

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

export function CalendarHeader({ calendarRef, selectedViews, setSelectedViews }: TCalendarHeader) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["viewWeekends", "viewEndedMeetings"]));
    const [date, setDate] = useState<string | null>();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const calApi = calendarRef.current?.getApi();

        if (calApi) {

            const view = calApi.view;
            const viewStart = new Date(view.activeStart);
            const viewEnd = new Date(view.activeEnd);

            if (viewStart.getMonth() === viewEnd.getMonth()) {
                setDate(viewStart.toLocaleDateString("default", { month: "long", year: "numeric" }));
            } else {
                setDate(`${
                    viewStart.toLocaleString('default', { month: 'short' })
                } - ${viewStart.toLocaleString('default', { month: 'short' })}, ${viewEnd.getFullYear()}`);
            }
        }
        
        
    }, [calendarRef]);

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

            if (viewStart.getMonth() === viewEnd.getMonth()) {
                setDate(viewStart.toLocaleDateString("default", { month: "long", year: "numeric" }));
            } else {
                setDate(`${
                    viewStart.toLocaleString('default', { month: 'short' })
                }. - ${viewEnd.toLocaleString('default', { month: 'short' })}. ${viewEnd.getFullYear()}`);
            }

            if (viewStart.getFullYear() !== viewEnd.getFullYear()) {
                setDate(`${
                    viewStart.toLocaleString('default', { month: 'short' })
                }. ${viewStart.getFullYear()} - ${viewEnd.toLocaleString('default', { month: 'short' })}. ${viewEnd.getFullYear()}`);
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
            setIsOpen(false);
        }
    }

    return (
        <header className="flex flex-row justify-between items-center m-0 mb-2 p-0 px-8 pb-3 w-full border-b border-edge">
            <div className="flex ml-4">
                <h1 className="text-3xl mr-8">Calender</h1>
                <Button
                    color="primary"
                    variant="bordered"
                    className="border-1 border-edge rounded-lg"
                    onClick={() => handleDateChange("today")}
                >
                    Today
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
                        <DropdownItem key="viewEndedMeetings">Visa slutfördamöten</DropdownItem>
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
                    >
                        Day
                    </SelectItem>
                    <SelectItem
                        classNames={{
                            base: "data-[pressed=true]:bg-primaryGrey data-[hover=true]:bg-primaryGrey",
                        }}
                        key={"timeGridWeek"}
                        value={"Week"}
                    >
                        Week
                    </SelectItem>
                    <SelectItem
                        classNames={{
                            base: "data-[pressed=true]:bg-primaryGrey data-[hover=true]:bg-primaryGrey",
                        }}
                        key={"dayGridMonth"}
                        value={"Month"}
                    >
                        Month
                    </SelectItem>
                </Select>
            </div>
        </header>
    );
}
