"use client";

import {
    Autocomplete,
    AutocompleteItem,
    Listbox,
    ListboxItem,
	Select,
	SelectItem,
} from "@nextui-org/react";
import UserComponent from "app/components/User";

import React, { useEffect, useState } from "react";

import Request from "../utils/client-request";

import { Member, User } from "index";
import { useUserContext } from "app/context/userProvider";
import { useMeetingContext } from "app/context/meetingProvider";

export default function ShareModal() {
    const { user } = useUserContext();

    const users: User[] = [];

    const { meeting } = useMeetingContext();

    const [ value, setValue ] = useState<string>("");

    const [ guests, setGuests ] = useState<User[]>([]);

    const [ filteredGuests, setFilteredGuests ] = useState(
        users.map((guest) => ({
            label: guest.name,
            key: guest._id.toString(),
            name: guest.name,
        }))
    );

    const handleGuests = async (key: any) => {
		const resp = await Request.post({
			url: "/meeting/addmember/"+meeting?._id,
			body: {
				userID: key
			}
		})

		console.log(resp)
		if (resp.status !== 200) {
			return
		}

		const person = filteredGuests.find((guest) => guest.key === key);

		if (!person) return;

		const newGuest = {
			_id: key,
			name: person?.name,
			role: "editor",
		};

		setGuests((prev) => [
			...prev,
        	newGuest as any
		]);

		setFilteredGuests((prev) =>
			prev.filter((guest) => guest.key !== key)
		);
    };

    useEffect(() => {
        const fecthUsers = async () => {
            const respMeetingMembers = await Request.get({
                url: "/meeting/members/" + meeting?._id,
            });

            if (respMeetingMembers.status === 200) {
                const data = await respMeetingMembers.json();

				console.log("))))", data.members)
				
                setGuests(
                    data.members.map((member: any) => ({
                        _id: member.id,
                        name: member.name,
                        role: "owner", // LOL, fixar sen
                        key: member.name,
                    }))
                );

                const memberIDs = data.members.map(
                    (member: any) => member.id
                );

                const resp = await Request.get({
                    url: "/user/all",
                });

                if (resp.status === 200) {
                    const data = await resp.json();

                    const newUsers = data.users.filter(
                        (newUser: any) => !memberIDs?.includes(newUser.id)
                    );

                    setFilteredGuests(
                        newUsers.map((newUser: any) => ({
                            label: newUser.name,
                            key: newUser.id,
                            name: newUser.name,
                        }))
                    );
                }
            }
        };

        fecthUsers();
    }, [meeting, setFilteredGuests, user?._id]);

    return (
        <div className="w-full">
            <div className="flex flex-row">
                <Autocomplete
                    autoCorrect="off"
                    autoComplete="off"
                    menuTrigger="input"
                    inputValue={value}
                    radius="sm"
                    aria-label="user"
                    color="secondary"
                    variant="flat"
                    placeholder="Lägg till gäster"
                    classNames={{
                        base: "w-full ml-4",
                        endContentWrapper: "w-0 hidden",
                    }}
					
                    defaultItems={filteredGuests}
                    onSelectionChange={handleGuests}
                    onInputChange={(value) => setValue(value)}
                >
                    {(item) => (
                        <AutocompleteItem aria-label="user" key={item.key}>
                            {item.label}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            </div>
            <h1 className="px-8 pt-4">Folk med tillåtelse</h1>
            {guests.length > 0 && (
                <Listbox
					arial-label="user"
                    classNames={{
                        base: "max-w-xs ml-8 overflow-y-hidden",
                        list: "max-h-[150px] overflow-hidden w-96",
                    }}
                    items={guests}
                    label="Assigned to"
                    selectionMode="multiple"
                    variant="flat"
                    aria-label="user"
					disabledKeys={[user?._id || ""]}
					onAction={() => {}}
                >
                    {(item) => (
                        <ListboxItem
							arial-label="userlist"
                            classNames={{
                                base: "flex flex-row items-center justify-between w-96 overflow-hidden",
                                wrapper: "flex flex-row items-center justify-between w-96 overflow-hidden",
                            }}
                            aria-label="user"
                            key={item._id}
                            textValue={item.name}
                        >
                            <div arial-label="usertype" className="flex overflow-hidden flex-row items-center justify-between">
								<UserComponent arial-label="usertype" name={item.name} />
                                
								{
									item._id === user?._id ? (
										<p className="text-primary">ägare</p>
									) : (
										<p className="text-primary">redaktör</p>
									)
								}
								{
									/*
								
								<Select
                                    className="w-32"
									isDisabled={item._id === user?._id}
									selectedKeys={[ "owner"]}
									variant="bordered"
									classNames={{
										trigger: "border-none shadow-none",

									}}
                                >
									{
										item._id !== user?._id ? (
											<SelectItem
												aria-label="role"
												key={"owner"}
											>
												ägare
											</SelectItem>
										) : (
											<SelectItem
												aria-label="role"
												key={"editor"}
											>
												redaktör
											</SelectItem>
										)
									}
									
                                </Select>
								*/}
                            </div>
                        </ListboxItem>
                    )}
                </Listbox>
            )}
        </div>
    );
}
