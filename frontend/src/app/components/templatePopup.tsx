import TemplatesView from "./templateList";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import PopupImg from "./../../../public/popup.svg";
import Image from "next/image";

export default function TemplatePopup() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setItOpen] = useState(false);
  const openPopup = () => {
    setItOpen(true);
  };
  const closePopup = () => {
    setItOpen(false);
  };

  return (
    <div>
      {/* Skapa-knappen som finns i headern */}
      <Button
        onClick={
          pathname.includes("/meetings")
            ? openPopup
            : () => router.push("/meetings/create") //ska ändras till templates/create när vi har det
        }
        className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2"
      >
        {" "}
        Skapa
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-2xl">
            <div className="flex flex-row w-full border-b-1 mb-5 justify-between">
              {/* Rubrik */}
              <div className="flex self-end">
                <h2 className="text-5xl font-bold">Använd mall</h2>
              </div>

              <div className="flex-shrink-0 ml-20">
                <Image src={PopupImg} alt="" width={150} />
              </div>
            </div>

            {/* Lista på mallar */}
            <TemplatesView />

            <div className="w-full flex justify-between">
              {/* Close-knapp */}
              <Button
                onClick={closePopup}
                className="mt-4 bg-primary text-white py-2 px-4 rounded"
              >
                Close
              </Button>

              {/* Skapa utan mall-knapp */}
              <Button
                onClick={() => router.push("/meetings/create")}
                className="bg-white border-2 border-edge text-primaryText font-bold rounded h-7 self-end"
              >
                Skapa utan mall
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
