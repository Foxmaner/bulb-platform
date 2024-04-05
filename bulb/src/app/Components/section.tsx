import { useState } from "react";

export default function addSection() {
    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative w-full h-full">
            <div className="border-2 w-11/12 h-11/12 text-center border-dashed cursor-pointer" onClick={toggleMenu}>
                <p className="text-3xl">----Lägg till avsnitt----</p>
            </div>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <button className="block px-4 py-2 text-sm text-primaryText hover:bg-gray-100">
                            Add Item 1
                        </button>
                        <button className="block px-4 py-2 text-sm text-primaryText hover:bg-gray-100">
                            Add Item 2
                        </button>
                        <button className="block px-4 py-2 text-sm text-primaryText hover:bg-gray-100">
                            Add Item 3
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
