'use client';

import {
	Button,
} from "@nextui-org/react";

interface MenuBtnProps {
    children?: React.ReactNode;
    createButton?: () => void;
}

export default function MenuBtn({ children, createButton }: MenuBtnProps) {

    return (
        <Button
            onClick={createButton}
            className="rounded-lg bg-white border border-edge text-primaryText h-7"
        >
            {children}
        </Button>
    )
}