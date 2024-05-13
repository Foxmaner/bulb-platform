'use client';

import PageHeader from "../components/pageHeader";

import CareNeed from "components/card/CareNeed";
import MultiDragDrop from "components/table/MultipleDragDrop/MultipleDragDrop";



export default function MeetingsPage() {


	return (
		<div className="flex-col h-[calc(100vh-2rem)] w-[86.5%] bg-white border m-4 ml-0 rounded-lg overflow-hidden">
			<PageHeader contentTitle="Behov"/>

            {/*<div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                <CareNeed title="Behov 1" 
                        body="Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nulla nec purus feugiat, 
                        molestie ipsum et, eleifend nunc. Ut in nulla elementum, 
                        lacinia purus nec, vehicula nunc." date="2022-01-01" status="Pågående"
                />
            </div>*/}

            <div className="flex flex-row m-0 px-4 w-[100%] h-[calc(74vh)] overflow-scroll">
                <MultiDragDrop
                    columns={["Inkommande", "Pågående", "Avslutade"]}
                    lists={[
                        [
                            {
                                id: '1',
                                title: 'Behov 1',
                                body: "123",
                                status: "Pågående",
                                date: "2022-01-01"
                            },
                            {
                                id: '2',
                                title: 'Behov 2',
                                body: "123",
                                status: "Pågående",
                                date: "2022-01-01"
                            }
                        ],
                        [
                            {
                                id: '5',
                                title: 'Behov 5',
                                body: "lorem ipsum dolor sit amet consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Ut in nulla elementum, lacinia purus nec, vehicula nunc.", 
                                status: "Pågående",
                                date: "2022-01-01"
                            },
                            {
                                id: '6',
                                title: 'Behov 6',
                                body: "123",
                                status: "Pågående",
                                date: "2022-01-01"
                            }
                        ],
                        [
                            {
                                id: '7',
                                title: 'Behov 7',
                                body: "123",
                                status: "Pågående",
                                date: "2022-01-01"
                            },
                            {
                                id: '8',
                                title: 'Behov 8',
                                body: "123",
                                status: "Pågående",
                                date: "2022-01-01"
                            }
                        ]
                    ]}
                />

            </div>

		</div>
	);
}
