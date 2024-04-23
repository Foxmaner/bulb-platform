"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react';


import { DateSelectArg, EventClickArg, EventContentArg, EventSourceInput } from '@fullcalendar/core/index.js'


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

const INITIAL_EVENTS = [
    {
        id: 123,
        title: 'All-day event',
        start: '2024-04-21T00:00:00',
        allDay: false
    },
    {
        id: 456,
        title: 'Timed event',
        start: '2024-04-22T00:00:00',
        allDay: false
    }
]

export default function Home() {
    const [allEvents, setAllEvents] = useState<Event[]>(INITIAL_EVENTS);
    const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleDateClick = (arg: any) => {
        setModalPos({ x: arg.jsEvent.clientX, y: arg.jsEvent.clientY });
        onOpen();
    };


    return (
        <>
            <main className="flex flex-col  items-center justify-between w-full">
                <div className="grid grid-cols-10 w-full">
                    <div className="col-span-8 text-primary h-[50vh] w-[87vw]">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin
                            ]}
                            headerToolbar={{
                                left: 'prev,next today title',
                                right: 'dayGridMonth,timeGridWeek'
                            }}
                            contentHeight={'80vh'}
                            allDaySlot={false}
                            titleFormat={{ year: 'numeric', month: 'short' }}
                            dayHeaderContent={({ text, isToday }) => {
                                if (isToday) {
                                    return (
                                        <div className='flex flex-col justify-center items-center p-1'>
                                            <p className='text-xs font-bold p-1 -mb-1 text-secondary'>{text.slice(0, 3)}</p>
                                            <h1 className='font-bold py-1.5 px-2 m-0 text-white bg-secondary rounded-full'>{text.slice(6, 8)}</h1>
                                        </div>
                                    )
                                }

                                return (
                                    <div className='flex flex-col justify-center items-center p-1'>
                                        <p className='text-xs font-bold p-1 -mb-1'>{text.slice(0, 3)}</p>
                                        <h1 className='font-bold py-1.5 px-2 m-0 '>{text.slice(6, 8)}</h1>
                                    </div>
                                )
                            }}

                            nowIndicatorClassNames={'text-primary'}
                            viewClassNames={'bg-white'}
                            dayCellClassNames={'bg-white'}
                            initialView='timeGridWeek'
                            eventBackgroundColor='#8B4270'
                            events={allEvents as EventSourceInput}
                            editable={true}
                            droppable={true}
                            nowIndicator={true}
                            selectable={true}
                            selectMirror={true}
                            
                            dateClick={handleDateClick}
                        />
                    </div>
                </div>
            </main >

            <Modal className='z-1000' isOpen={isOpen} onOpenChange={onOpenChange} closeButton aria-labelledby="modal-title" >
                <ModalContent>
                    <ModalBody>
                        <p>
                            Create Event
                        </p>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>


    )
}