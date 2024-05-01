"use client";

import React, { useState, Key } from "react";
import { Input, Button, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import PageHeader from "app/components/pageHeader";

import Image from "next/image";

import * as bgDecorator from "../../../public/bg-decoration.svg";

export default function Profile() {
    const user = {
        name: "John Doe",
        email: "junior@nextui.org",
        company: "NextUI",
    };

    const [selected, setSelected] = useState("photos");

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] w-full bg-white border m-4 ml-0 rounded-lg justify-between relative overflow-hidden">
            <PageHeader contentTitle="Profile" buttenMenu={false} />
            <div className="ml-5 flex flex-row w-full h-full">
                <div className="w-1 h-[90%] bg-primary mt-8"/>
                <div className="flex flex-col w-full ml-4">
                    <div className="m-4 h-24 w-24 cursor-pointer bg-secondary flex justify-center items-center text-white rounded-md relative">
                        <h1 className="text-4xl">M</h1>
                    </div>
                    <div className="flex flex-row mx-4 justify-start w-[80%]">
                        <Input
                            radius="sm"
                            type="name"
                            label="Display Name"
                            variant="underlined"
                            className="w-[30%] mr-8"
                            defaultValue={user.name}
                        />
                        <Input
                            isReadOnly
                            radius="sm"
                            type="email"
                            label="Email"
                            className="w-[30%] mr-8"
                            variant="underlined"
                            defaultValue={user.email}
                        />
                    </div>
                    <div className="flex flex-row items-end m-4">
                        <Input
                            isReadOnly
                            radius="sm"
                            type="company"
                            label="Company"
                            className="w-[26%]"
                            variant="underlined"
                            defaultValue={user.company}
                        />
                        <Button
                            className="btn-wide mx-4 px-12 font-bold"
                            color="secondary"
                            radius="sm"
                            key="delete"
                            variant="bordered"
                        >
                            Apply
                        </Button>
                    </div>
                    <div className="flex w-full flex-col m-3.5 max-w-[50%]">
                        <Tabs
                            aria-label="Options"
                            selectedKey={selected}
                            onSelectionChange={(value: Key) => setSelected(value as string)}
                        >
                            <Tab key="photos" title="Swedish">
                                <p className="text-secondaryGrey">Du valt svenska som språk.</p>
                            </Tab>
                            <Tab key="music" title="English">
                                <p className="text-secondaryGrey">You set english as language.</p>
                            </Tab>
                        </Tabs>
                    </div>
                    <Button
                        className="absolute bottom-6 ml-4 w-1/5 text-danger"
                        color="danger"
                        radius="sm"
                        variant="bordered"
                        key="delete"
                    >
                        Delete Profile
                    </Button>
                </div>
            </div>
            <Image
                src={bgDecorator}
                alt="Background Decorator"
                className="absolute w-1/3 bottom-0 right-0"
            />
        </div>
    );
}
