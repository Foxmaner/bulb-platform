'use client';
import {Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";


export default function PageHeader({userName}: {userName: string}) {
   
    return (
        <div className="bg-slate-100 w-full flex-col justify-between">
            <div className="bg-white">
                <h2 className="text-black">Good afternoon, {userName}</h2>
            </div>
            <h1 className="text-black font-bold text-4xl mx-5">Meetings</h1>
            <div className="flex w-full">
                <Button>Create</Button>
                <Button>Company</Button>
                <Button>Monthly</Button>
                <Button>01</Button>
                <Button>Filter</Button>
            </div>

        </div>
    );
}
