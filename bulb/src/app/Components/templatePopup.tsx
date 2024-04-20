import TemplatesView from "./templateList";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

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
            {/* Rubrik */}
            <h2 className="text-xl font-bold mb-4">Mallar</h2>

            {/* Lista på mallar */}
            <TemplatesView />

            {/* Close-knapp */}
            <Button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </Button>

            {/* Skapa utan mall-knapp */}
            <Button
              onClick={() => router.push("/meetings/create")}
              className="bg-white border-2 border-edge text-primaryText font-bold rounded h-7 m-2"
            >
              Skapa utan mall
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
