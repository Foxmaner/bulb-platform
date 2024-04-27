import {
    Button,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Autocomplete,
    AutocompleteItem,
    Selection,
    ListboxItem,
    User as UserComponent,
    Listbox,
    Textarea,
    ModalFooter
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { FormEvent, useMemo, useRef, useState } from "react";
import { User } from "index";

import Image from "next/image";

import * as clockIcon from "../../../public/icons/clock.svg";
import * as userIcon from "../../../public/icons/user.svg";
import * as mapPointIcon from "../../../public/icons/map-point.svg";
import * as textIcon from "../../../public/icons/text.svg";

import React from "react";

const users = [
    {
        _id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        email: "tony.reichert@example.com",
    },
    {
        _id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "zoey.lang@example.com",
    },
    {
        _id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
        email: "jane.fisher@example.com",
    },
    {
        _id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
        email: "william.howard@example.com",
    },
    {
        _id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
        email: "kristen.cooper@example.com",
    },
    {
        _id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
        email: "brian.kim@example.com",
        status: "Active",
    },
    {
        _id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
        email: "michael.hunt@example.com",
    },
    {
        _id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
        email: "samantha.brooks@example.com",
    },
    {
        _id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
        email: "frank.harrison@example.com",
    },
    {
        _id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
        email: "emma.adams@example.com",
    },
    {
        _id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
        email: "brandon.stevens@example.com",
    },
    {
        _id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
        email: "megan.richards@example.com",
    },
    {
        _id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "active",
        age: "37",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
        email: "oliver.scott@example.com",
    },
    {
        _id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "active",
        age: "30",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
        email: "grace.allen@example.com",
    },
    {
        _id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "paused",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
        email: "noah.carter@example.com",
    },
    {
        _id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
        email: "ava.perez@example.com",
    },
    {
        _id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "active",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
        email: "liam.johnson@example.com",
    },
    {
        _id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "active",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
        email: "sophia.taylor@example.com",
    },
    {
        _id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "paused",
        age: "32",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
        email: "lucas.harris@example.com",
    },
    {
        _id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "active",
        age: "26",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
        email: "mia.robinson@example.com",
    },
];

export interface Event {
    title: string;
    start: Date | string;
    end: Date | string;
    id: number;
}

interface TimeScedule {
    label: string;
    value: string;
}

interface CalenderEventProps {
    unselect: () => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    event: Event | undefined;
    createEvent: (event: Event) => void;
}

export default function CalenderEvent({
    unselect,
    isOpen,
    onOpenChange,
    event,
    createEvent
}: CalenderEventProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [guests, setGuests] = useState<User[]>([]);

    const [filteredGuests, setFilteredGuests] = useState(
        users.map((guest) => ({
            label: guest.name,
            key: guest._id.toString(),
            name: guest.name,
            avatar: guest.avatar,
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
    }, [])

    const getDefaultDate = (date: Date | string | undefined) => {
        if (!date || typeof date === "string") date = new Date();

        return date.toISOString().split("T")[0];
    };

    const getDefaultTime = (date: Date | string | undefined) => {
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
    };

    const handleGuests = (keys: Selection): any => {
        console.log(keys);
    };

    const submitEvent = (e: FormEvent<HTMLFormElement>) => {
        if (!event) return;

        e.preventDefault();

        const newEvent: Event = {
            title: event.title,
            start: event.start,
            end: event.end,
            id: Math.floor(Math.random() * 1000),
        };

        createEvent(newEvent);
        unselect();
        onOpenChange(false);

        return false;
    };

    const handleClose = () => {
        unselect();
        onOpenChange(false);
    }

    return (
        <Modal
            className="z-1000"
            radius="sm"
            scrollBehavior="inside"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            closeButton
            onClose={handleClose}
            aria-labelledby="event"
        >
            <ModalContent>
                <ModalHeader className="w-full bg-edge mb-4 rounded-t-lg">
                    <div className="w-full h-2" />
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={submitEvent} className="flex flex-col gap-4">
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
                                    defaultValue={parseDate(
                                        getDefaultDate(event?.start)
                                    )}
                                />
                                <div className="flex flex-row">
                                    <Autocomplete
                                        isRequired
                                        label="from"
                                        defaultSelectedKey={getDefaultTime(
                                            event?.start
                                        )}
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
                                        defaultSelectedKey={getDefaultTime(
                                            event?.end
                                        )}
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
                                            (user) =>
                                                user._id === parseInt(key as string)
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
                                        <ListboxItem
                                            key={item._id}
                                            textValue={item.name}
                                        >
                                            <UserComponent
                                                name={item.name}
                                                description="Product Designer"
                                                avatarProps={{
                                                    src: item.avatar,
                                                }}
                                                
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
                    </form>
                </ModalBody>
                <ModalFooter>
                    <div className="flex flex-row justify-end w-full">
                        <Button className="mx-2" color="default">
                            Fler Alternativ
                        </Button>
                        <Button color="secondary" type="submit">
                            Spara
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
