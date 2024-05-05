import { useEffect, useState, useRef } from "react";
import InputField from "../inputField";


export default function AddSection() {
    const [menuOpen, setMenuOpen] = useState(false);
    //Måste berätta för Typescript att det är en sjukt nice div
    const popupRef = useRef<HTMLDivElement>(null);


    const toggleMenu = () => {
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
        <div ref={popupRef} className="relative w-full h-full flex justify-center">
            <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={toggleMenu}>
                <p className="text-3xl select-none">----Lägg till avsnitt----</p>
            </div>
            {menuOpen && (
                <div ref={popupRef} className="flex justify-center absolute mt-2 w-96 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    
                    <div className="py-1">
                        <p className="flex text-lg text-primaryText select-none">Lägg till stycke</p>
                        <button className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                            Paragraf
                        </button>
                        <button className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                            Fråga
                        </button>
                        <button className="block px-4 py-2 text-lg text-primaryText hover:bg-gray-100">
                            Bild
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
