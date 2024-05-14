'use client'
import QRCode from "react-qr-code"
import { BsX } from "react-icons/bs";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import { usePathname} from 'next/navigation'

export default function Page({ qrData }: { qrData: string }) {
  const pathname = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCardVisible, setCardVisible] = useState(true); // Add this line
  const qrDataLink = "localhost:3000" + pathname + "/mobile/"

  


  return (

    <>

      {!isCardVisible && ( // Add this line

        <Button className="absolute bottom-0 right-0 m-5 bg-primary text-white" radius="full" variant="shadow" onClick={() => setCardVisible(true)}>
          QR-kod
        </Button>

      )}

      {/* Here we get hydration error */}
      {isCardVisible && (
        <div className="absolute bottom-0 right-0 m-5" onClick={onOpen}>
          <Card>
            <CardBody>
              <div className="flex items-center space-x-4">
                <QRCode value={qrData} className="w-20 h-20" />
                <div className="flex flex-wrap">
                  <p className="text-xl font-bold underline w-1/2">Kod</p>
                  <Button className="absolute top-0 right-0 bg-transparent" isIconOnly radius="full" onClick={() => setCardVisible(false)}>
                    <BsX size={50} />
                  </Button>
                  <div className="bg-white">
                    <p className="text-center text-xl font-bold underline ">{qrData}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}


      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="bg-primaryGrey">
                <div className="flex items-center space-x-4">
                  <QRCode value={qrDataLink} />
                  <div className="space-y-4 flex-col">
                    <p className="text-4xl font-bold underline">Kod</p>
                    <div className="bg-white">
                      <p className="text-center text-xl font-bold underline ">{qrData}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );

}
