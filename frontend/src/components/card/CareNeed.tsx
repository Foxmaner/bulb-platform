import React from "react";

import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import { BsCalendar } from "react-icons/bs";
import { VerticalDotsIcon } from "components/btn/VerticalDotBtn";

interface CareNeedProps {
    title: string;
    body: string;
    date: string;
    status: string;
}

export default function CareNeed(item: CareNeedProps) {
    const coneverStatus = (status: string) => {
        switch (status) {
            case "Pågående":
                return "warning";
            case "Avslutad":
                return "success";
            case "Planerad":
                return "primary";
            default:
                return "warning";
        }
    }

    return (
        <Card classNames={{
            base: "w-80 max-h-96 gap-0"
        }} shadow="sm">
            <CardHeader className="m-0">
                <div className="flex flex-row justify-between w-full">
                    <Chip classNames={{
                        base: "bg-primaryGrey",
                    }} size="sm"> 
                        <p className={`text-${coneverStatus(item.status)}`}>
                            {item.status}
                        </p>
                    </Chip>
                    <VerticalDotsIcon className="rotate-90" />
                </div>
            </CardHeader>
            <CardBody className="m-0 py-0">
                <div className="flex justify-start">
                    {item.title}
                </div>
                <p className="text-default-500 line-clamp-3">{item.body}</p>
            </CardBody>
            <CardFooter className="text-small justify-left gap-2">
                <BsCalendar />
                <p>{item.date}</p>
            </CardFooter>
        </Card>
    );
}