'use client'
import QRCode from "react-qr-code"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function Page({ qrData }: { qrData: string }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        
            <>
              <Button className="absolute bottom-0 right-0 m-5" onPress={onOpen}>Bjud in</Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                      <ModalBody>
                        <QRCode value={qrData} />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Action
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          );
    
}