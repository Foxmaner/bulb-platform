import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CareNeed from "components/card/CareNeed";


interface Item {
    id: string;
    title: string;
    body: string;
    date: string;
    status: string;
}

interface MultiDragDropProps {
	columns: string[]
    lists: Item[][];
}

function MultiDragDrop({ lists, columns }: MultiDragDropProps) {
    const [listsState, setListsState] = useState(lists);

    const handleOnDragEnd = useCallback(
        (result: any) => {
            if (!result.destination) return;

            const sourceList = listsState[result.source.droppableId];
            const destList = listsState[result.destination.droppableId];
            const [removedItem] = sourceList.splice(result.source.index, 1);

            if (result.source.droppableId === result.destination.droppableId) {
                sourceList.splice(result.destination.index, 0, removedItem);
                setListsState({
                    ...listsState,
                    [result.source.droppableId]: sourceList,
                });
            } else {
                destList.splice(result.destination.index, 0, removedItem);
                setListsState({
                    ...listsState,
                    [result.source.droppableId]: sourceList,
                    [result.destination.droppableId]: destList,
                });
            }
        },
        [listsState]
    );

    return (
        <div className="App">
            <header className="flex flex-row">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {Object.entries(listsState).map(([listId, items], i) => (
                        <Droppable key={listId} droppableId={listId}>
                            {(provided) => (
                                <div
                                    className="rounded-md bg-secondary bg-opacity-20 mr-4 min-w-96"
                                >
                                    <div className="flex flex-row justify-between items-center px-2">
                                        <h1 className="p-4 font-bold text-xl text-titleText">{columns[i]}</h1>
                                        <span className="mr-4 bg-secondary flex justify-center items-center w-8 h-8 rounded-full">
                                            <p className="text-white">
                                                {items.length}
                                            </p>
                                        </span>
                                    </div>
                                    <ul
                                        className="p-4 min-w-96"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >


                                        {items.map(({ id, title, body, status, date }, index) => (
                                            <Draggable
                                                key={id}
                                                draggableId={id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="m-2"
                                                    >
                                                        <CareNeed
                                                            title={title}
                                                            body={body}
                                                            date={date}
                                                            status={status}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </header>
        </div>
    );
}

export default MultiDragDrop;
