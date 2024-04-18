import { useState } from "react";
import { usePathname } from "next/navigation";
import { BsCalendarEvent, BsFileEarmarkTextFill } from "react-icons/bs";
import Link from "next/link";

export default function Menu() {
  const [isVisable, setIsVisable] = useState(false);

  const toggleVisibility = () => {
    setIsVisable(!isVisable);
  };
  const setInvisible = () => {
    setIsVisable(false);
  };
  const pathname = usePathname();

  return (
    <div className="">
      {/* Möten */}
      <div
        className={`text-gray-500 font-bold text-lg flex items-center mb-1 cursor-pointer ${
          pathname.includes("/meetings") || isVisable ? "text-primary" : ""
        }`}
        onClick={toggleVisibility}
      >
        {/* Calender icon */}
        <BsCalendarEvent
          className="mr-1"
          color={`${
            pathname.includes("/meetings") || isVisable ? "#831843" : "#6b7280"
          }`}
        />
        Möten
      </div>

      {/* Mötesmenyn */}
      {isVisable && (
        <div className="text-gray-500 font-bold flex flex-row">
          <div className="bg-primary w-0.5 mx-2 mt-1 mb-2"></div>
          <div className="flex flex-col">
            <Link href={"/meetings"} className={`hover:text-primary ${pathname.includes("")}`}>
              Mina
            </Link>
            <Link href={"/meetings/shared"} className={`hover:text-primary ${pathname.includes("/shared")}`}>
              Delade
            </Link>
            <Link href={"/meetings"} className={`hover:text-primary mb-2 ${pathname.includes("/published") ? "text-primary" : ""}`}>
              Publicerade
            </Link>
          </div>
        </div>
      )}

      {/* Mallar */}
      <a
        href="/templates"
        className={`text-gray-500 font-bold text-lg flex items-center mb-1 ${
          pathname.includes("/templates") ? "text-primary" : ""
        }`}
        onClick={setInvisible}
      >
        <BsFileEarmarkTextFill
          className="mr-1"
          color={`${pathname.includes("/templates") ? "#831843" : "#6b7280"}`}
        />
        Mallar
      </a>

      {/* Hjälp */}
      <a
        href="/help"
        className={`text-gray-500 font-bold text-lg flex items-center mb-2 ${
          pathname.includes("/help") ? "text-primary" : ""
        }`}
        onClick={setInvisible}
      >
        <BsFileEarmarkTextFill
          className="mr-1"
          color={`${pathname.includes("/help") ? "#831843" : "#6b7280"}`}
        />
        Hjälp
      </a>
    </div>
  );
}
