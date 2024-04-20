import TemplatesView from "./templateList";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function TemplatePopup() {
  const [isOpen, setItOpen] = useState(false);
  const openPopup = () => {
    setItOpen(true);
  };
  const closePopup = () => {
    setItOpen(false);
  };

  return (
    <div>
      <Button
        onClick={openPopup}
        className="bg-white border-2 border-edge text-primaryText w-5 h-7 m-2"
      >
        {" "}
        Skapa
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Mallar</h2>
            <TemplatesView />
            <Button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
