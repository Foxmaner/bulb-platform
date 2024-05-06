import {
    Button,
    DatePicker,
    Input,
    Autocomplete,
    AutocompleteItem,
    Selection,
    ListboxItem,
    User as UserComponent,
    Listbox,
    Textarea
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { User } from "index";

import Image from "next/image";

import * as clockIcon from "app/../../public/icons/clock.svg";
import * as userIcon from "app/../../public/icons/user.svg";
import * as mapPointIcon from "app/../../public/icons/map-point.svg";
import * as textIcon from "app/../../public/icons/text.svg";
import * as xIcon from "app/../../public/icons/x.svg";

import React from "react";
import RequestApi from "app/utils/client-request";

const users: User[] = [
    {
        _id: "1",
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        email: "tony.reichert@example.com",
    }
] 

export interface Event {
    title: string;
    start: Date | string;
    end: Date | string;
    id: string;
}

interface TimeScedule {
    label: string;
    value: string;
}

interface CalenderEventProps {
    unselect: () => void;
    onOpenChange: (open: string) => void;
    event: Event | undefined;
    createEvent: (event: Event) => void;
}

export default function CalenderEvent({
    unselect,
    onOpenChange,
    event,
    createEvent,
}: CalenderEventProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const [ value, setValue ] = useState<string>("");
    const [ guests, setGuests ] = useState<User[]>([]);

    const [filteredGuests, setFilteredGuests] = useState(
        users.map((guest) => ({
            label: guest.name,
            key: guest._id.toString(),
            name: guest.name
        }))
    );

    const getInitialValues = useMemo(() => {
        const values: TimeScedule[] = [];

        for (let i = 0; i < 96; i++) {
            const time = new Date(0, 0, 0, 0, 15 * i, 0).toLocaleString("en", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });

            values.push({
                label: time.toLowerCase(),
                value: `${i}`,
            });
        }

        return values;
    }, []);

    const getDefaultDate = useCallback((date: Date | string | undefined) => {
        if (!date || typeof date === "string") date = new Date();

        return date.toISOString().split("T")[0];
    }, []);

    const getDefaultTime = useCallback((date: Date | string | undefined) => {
        if (!date) return "";

        const time = new Date(date).toLocaleString("en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        const key = getInitialValues.find(
            (item) => item.label === time.toLowerCase()
        );

        if (key) return key.value;

        return "1";
    }, [getInitialValues]);

    const handleGuests = (keys: Selection): any => {
        console.log(keys);
    };

    const handleClose = useCallback(() => {
        unselect();
        onOpenChange("0");
    }, [unselect, onOpenChange]);

    const submitEvent = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        if (!event) return;

        e.preventDefault();

        const resp = await RequestApi.post({
            url: "/meeting/create",
            body: {
                name: event.title,
                scheduledStart: event.start,
                scheduledEnd: event.end
            }
        })

        if (resp.status === 201) {
            const data = await resp.json();

            const newEvent: Event = {
                title: event.title,
                start: event.start,
                end: event.end,
                id: data.meeting._id,
            };

            createEvent(newEvent);
            handleClose();
        }

    }, [createEvent, event, handleClose]);

    return (
        <div className="w-full">
            <div className="flex flex-row w-full h-8 bg-easyGrey justify-end items-center px-2">
                <div className="p-1 cursor-pointer hover:bg-edge rounded-full">
                    <Image 
                        src={xIcon} 
                        alt="Close Icon"
                        height={20} 
                        width={20} 
                        onClick={handleClose}
                    />
                </div>
            </div>
            <form onSubmit={submitEvent} className="flex flex-col gap-4 p-4">
                <div className="flex flex-row items-center ml-6">
                    <Input
                        ref={titleRef}
                        isRequired
                        defaultValue={event?.title}
                        color="secondary"
                        classNames={{ base: "ml-4", input: "text-2xl" }}
                        variant={"underlined"}
                        placeholder="Lägg till titel"
                        onChange={(value) => {
                            if (!event) return;
                            event.title = value.target.value;
                        }}
                    />
                </div>

                <div className=" ml-6">
                    <Button
                        isDisabled
                        className="ml-4 w-1/3"
                        color="primary"
                        radius="sm"
                    >
                        Möte
                    </Button>
                </div>
                <div className="flex flex-col w-full justify-between items-start gap-2">
                    <div className="flex w-full justify-between items-center">
                        <Image
                            src={clockIcon}
                            alt="Clock Icon"
                            className="mr-2"
                            width={25}
                            height={25}
                        />
                        <DatePicker
                            isRequired
                            label="date"
                            color="secondary"
                            className="w-40 mr-2"
                            aria-label="Date"
                            variant={"underlined"}
                            defaultValue={parseDate(getDefaultDate(event?.start))}
                        />
                        <div className="flex flex-row">
                            <Autocomplete
                                isRequired
                                label="from"
                                defaultSelectedKey={getDefaultTime(event?.start)}
                                radius="sm"
                                color="secondary"
                                variant="underlined"
                                placeholder="hh:mm"
                                classNames={{
                                    base: "w-[5.5rem] mr-2",
                                    endContentWrapper: "w-0 hidden",
                                    popoverContent: "w-40",
                                }}
                                items={getInitialValues}
                            >
                                {(item) => (
                                    <AutocompleteItem key={item.value}>
                                        {item.label}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                            <Autocomplete
                                isRequired
                                label="to"
                                defaultSelectedKey={getDefaultTime(event?.end)}
                                radius="sm"
                                color="secondary"
                                variant={"underlined"}
                                placeholder="hh:mm"
                                classNames={{
                                    base: "w-[5.5rem]",
                                    endContentWrapper: "w-0 hidden",
                                    popoverContent: "w-40",
                                }}
                                items={getInitialValues}
                            >
                                {(item) => (
                                    <AutocompleteItem key={item.value}>
                                        {item.label}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                    </div>
                    <div>
                        <Button
                            className="ml-10 w-24 text-secondary bg-transparent hover:text-primary hover:bg-opacity-30 hover:bg-primary"
                            radius="sm"
                        >
                            Hitta en tid
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row">
                        <Image
                            src={userIcon}
                            alt="User Icon"
                            height={25}
                            width={25}
                        />
                        <Autocomplete
                            autoCorrect="off"
                            autoComplete="off"
                            menuTrigger="input"
                            inputValue={value}
                            radius="sm"
                            color="secondary"
                            variant="flat"
                            placeholder="Lägg till gäster"
                            classNames={{
                                base: "w-full ml-4",
                                endContentWrapper: "w-0 hidden",
                            }}
                            defaultItems={filteredGuests}
                            onSelectionChange={(key) => {
                                const user = users.find(
                                    (user) => user._id === key
                                );

                                if (user) {
                                    setGuests([user, ...guests]);
                                    setValue("");
                                }
                            }}
                            onInputChange={(value) => setValue(value)}
                        >
                            {(item) => (
                                <AutocompleteItem key={item.key}>
                                    {item.label}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    </div>
                    {guests.length > 0 && (
                        <Listbox
                            classNames={{
                                base: "max-w-xs ml-8",
                                list: "max-h-[150px] overflow-scroll",
                            }}
                            items={guests}
                            label="Assigned to"
                            selectionMode="multiple"
                            onSelectionChange={handleGuests}
                            variant="flat"
                        >
                            {(item) => (
                                <ListboxItem key={item._id} textValue={item.name}>
                                    <UserComponent
                                        name={item.name}
                                        description="Product Designer"
                                    />
                                </ListboxItem>
                            )}
                        </Listbox>
                    )}
                </div>

                <div className="flex flex-row">
                    <Image
                        src={mapPointIcon}
                        alt="Map Point Icon"
                        className="mb-2"
                        height={15}
                        width={15}
                    />
                    <Input
                        color="primary"
                        classNames={{ base: "ml-6" }}
                        variant={"underlined"}
                        placeholder="Lägg till plats"
                    />
                </div>

                <div className="flex flex-row w-full">
                    <Image
                        src={textIcon}
                        alt="Text Icon"
                        className="mb-4"
                        height={20}
                        width={20}
                    />
                    <Textarea
                        label="Description"
                        radius="sm"
                        placeholder="Lägg till beskrivning"
                        classNames={{
                            base: "ml-4",
                            input: "max-h-20",
                        }}
                    />
                </div>

                <div className="flex flex-row justify-end w-full p-4">
                    <Button className="mx-2" color="default">
                        Fler Alternativ
                    </Button>
                    <Button color="secondary" type="submit">
                        Spara
                    </Button>
                </div>
            </form>
        </div>
    );
}
