import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
    BsCalendarEvent,
    BsJustifyLeft,
    BsCalendarDate,
    BsCaretRightFill,
    BsBuilding,
	BsArchive
} from "react-icons/bs";

import Link from "next/link";


export default function Menu() {
    const [isVisable, setIsVisable] = useState(true);

    const toggleVisibility = () => {
        setIsVisable(!isVisable);
    };
    const setInvisible = () => {
        setIsVisable(false);
    };
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className="w-full select-none">
            {/* Hjälp */}
            <Link
                href="/calendar"
                className={`text-gray-500 font-bold text-lg flex items-center mb-2 ${
                    pathname.includes("/calendar")
                        ? "text-primary"
                        : "hover:text-secondary"
                }`}
                onClick={setInvisible}
            >
                <BsCalendarDate
                    className="mr-1"
                    color={`${
                        pathname.includes("/calendar") ? "#831843" : "#6b7280"
                    }`}
                />
                Kalender
            </Link>
            {/* Behov */}
            <Link
				href="/careneeds"
                className="text-gray-500 font-bold text-lg flex justify-between items-center mb-1 cursor-pointer"
            >
                <div className="flex items-center">
                    {/* Calender icon */}
                    <BsArchive
                        className="mr-1"
                        color={`${
                            pathname.includes("/careneeds")
                                ? "#831843"
                                : "#6b7280"
                        }`}
                    />
                    <h1
                        className={`${
                            pathname.includes("/careneeds") ? "text-primary" : ""
                        }`}
                    >
                        Behov
                    </h1>
                </div>
            </Link>
            {/* Möten */}
            <div
                className="text-gray-500 font-bold text-lg flex justify-between items-center mb-1 cursor-pointer"
                onClick={toggleVisibility}
            >
                <div className="flex items-center">
                    {/* Calender icon */}
                    <BsCalendarEvent
                        className="mr-1"
                        color={`${
                            pathname.includes("/meetings")
                                ? "#831843"
                                : "#6b7280"
                        }`}
                    />
                    <h1
                        className={`${
                            pathname.includes("/meetings") ? "text-primary" : ""
                        }`}
                    >
                        Möten
                    </h1>
                </div>
                <BsCaretRightFill
                    className={`mr-1 mb-1 ${
                        isVisable ? "transform rotate-90" : ""
                    }`}
                    color={`${
                        pathname.includes("/meetings") ? "#831843" : "#6b7280"
                    }`}
                />
            </div>

            {/* Mötesmenyn */}
            {isVisable && (
                <div className="text-gray-500 font-bold flex flex-row w-full ml-2 mb-1">
                    <div
                        className={`${
                            pathname.includes("/meetings")
                                ? "bg-primary bg-opacity-50"
                                : "bg-secondaryGrey"
                        } bg-opacity-50 w-0.5 mr-2`}
                    ></div>
                    <div className="flex flex-col w-[85%]">
                        <Link
                            href={"/meetings?holder=user"}
                            className={`px-1 mb-1 bg-opacity-50 rounded-md ${
                                searchParams.get("holder") === "user"
                                    ? "text-primary bg-secondary"
                                    : "hover:text-secondary"
                            }`}
                        >
                            Mina
                        </Link>
                        <Link
                            href={"/meetings?holder=shared"}
                            className={`px-1 mb-1 bg-opacity-50 rounded-md ${
                                searchParams.get("holder") === "shared"
                                    ? "text-primary bg-secondary"
                                    : "hover:text-secondary"
                            }`}
                        >
                            Delade
                        </Link>
                    </div>
                </div>
            )}

            {/* Mallar */}
            <Link
                href="/templates"
                className={`text-gray-500 font-bold text-lg flex items-center mb-1 ${
                    pathname.includes("/templates")
                        ? "text-primary"
                        : "hover:text-secondary"
                }`}
                onClick={setInvisible}
            >
                <BsJustifyLeft
                    className="mr-1"
                    color={`${
                        pathname.includes("/templates") ? "#831843" : "#6b7280"
                    }`}
                />
                Mallar
            </Link>
            <Link
                href="/organisation"
                className={`text-gray-500 font-bold text-lg flex items-center mb-1 ${
                    pathname.includes("/organisation")
                        ? "text-primary"
                        : "hover:text-secondary"
                }`}
                onClick={setInvisible}
            >
                <BsBuilding
                    className="mr-1"
                    color={`${
                        pathname.includes("/organisation")
                            ? "#831843"
                            : "#6b7280"
                    }`}
                />
                Organisation
            </Link>
        </div>
    );
}
