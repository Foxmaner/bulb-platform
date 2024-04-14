import { useEffect, useState, useRef } from "react";

import InputField from "./inputField";
import QuestionForm from "./questionForm";
import paragraphForm from "./paragraph";



interface IAddSection {
    addSection: any
}


export default function AddSection({ addSection }: IAddSection) {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const popupRef = useRef<HTMLDivElement>(null);


    const toggleMenu = () => {
        addSection()
        setMenuOpen(!menuOpen);
    };
    //Detta för att kunna klicka vart som helst för att stänga popupen
    //Just nu kan man klicka i popupen för att inte stänga rutan
    useEffect(() =>{
        const handler = (event: MouseEvent) => {
            if(popupRef.current && popupRef.current.contains(event.target as Node)){
                return;
            }
            setMenuOpen(false);
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    },[]);

    return (
        <div className="relative w-full h-full flex justify-center">
            <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={toggleMenu}>
                <p className="text-3xl select-none">----Lägg till avsnitt----</p>
            </div>
        </div>
    );
};
