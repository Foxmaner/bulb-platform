import React, { useCallback } from "react";

interface CalendarDayHeaderProps {
    isToday: boolean;
    text: string;
    calendarRef: any; // Renamed from 'ref' to 'calendarRef'
    handleSelectDay: (text: string) => void;
}

export default function CalendarDayHeader({ isToday, text, calendarRef, handleSelectDay }: CalendarDayHeaderProps) {
    
    const handleSelectedDay = useCallback(() => {
        const calApi = calendarRef.current?.getApi();

        if (calApi && calApi.view.type === "timeGridWeek") {
            return (
                <h1
                    onClick={() => handleSelectDay(text)}
                    className={`font-bold py-1 w-8 h-8 ${
                        isToday
                            ? "text-white bg-secondary hover:bg-opacity-90"
                            : "hover:bg-easyGrey"
                    } cursor-pointer rounded-full`}
                >
                    {isToday ? text.slice(6, 8) : text.split("/")[1]}
                </h1>
            )
        } 

        return null;
    }, [calendarRef, handleSelectDay, isToday, text])

    return (
        <div className="flex flex-col justify-center items-center p-1">
            <p
                className={`text-xs font-bold p-1 -mb-1 ${
                    isToday ? "text-secondary" : ""
                }`}
            >
                {text.slice(0, 3)}
            </p>
            {handleSelectedDay()}
        </div>
    );
}
