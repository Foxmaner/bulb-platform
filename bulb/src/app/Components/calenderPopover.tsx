import React, { RefObject, useCallback, useState } from 'react'

import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import CalenderEvent, { Event } from './calenderEvent';
import FullCalendar from '@fullcalendar/react';

interface CalenderPopoverProps {
    calendarRef: RefObject<FullCalendar>;
    event: Event;
    createEvent: (event: Event) => void;
    open: number;
    setOpen: (open: number) => void;
}

export default function CalenderPopover({
    calendarRef, createEvent, event, open, setOpen 
}: CalenderPopoverProps) {

    const handleCloseCreateEvent = useCallback(() => {
        const calApi = calendarRef.current?.getApi();

        if (calApi) {
            calApi.unselect();
        }
    }, [ calendarRef ])

    const handleToggleEvent = useCallback(() => {
        if (open === event.id) {
            setOpen(0);
        } else {
            setOpen(event.id);
        }
    }, [open, event?.id, setOpen]);

    return (
        <Popover aria-label='event' isOpen={open === event?.id} onOpenChange={() => {
            setOpen(0);
            handleCloseCreateEvent();
        }} placement="right" showArrow={true} radius="sm" shadow="lg">
            <PopoverTrigger>
                <Button aria-label='event' onClick={() => { console.log(event.id); handleToggleEvent() }} className="flex flex-col h-full w-full bg-transparent z-50 rounded-none items-start justify-start p-1">
                    <h1 className="text-white">
                        {event?.title === "" ? "(Ingen titel)" : event?.title}
                    </h1>
                    <p className="text-white -mt-2 font-light text-xs">
                        {new Date(event?.start).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })} - 
                        {new Date(event?.end).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })} 
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <CalenderEvent 
                    unselect={handleCloseCreateEvent}
                    onOpenChange={setOpen}
                    event={event} 
                    createEvent={createEvent}
                />
            </PopoverContent>
        </Popover>
    )
}
