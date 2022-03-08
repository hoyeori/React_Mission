import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';


const Lists = React.memo(({ todoData, setTodoData }) => {
    const handleEnd = (result) => {
        if (!result.destination) return;                //이벤트 취소

        const newTodoData = todoData;
        const [reorderdItem] = newTodoData.splice(result.source.index, 1)       //드래그한 아이템 배열에서 제거 후 저장

        newTodoData.splice(result.destination.index, 0, reorderdItem);          //원하는 배열 자리에 저장값 넣기
        setTodoData(newTodoData);

    };

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId='todo'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        < List
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            complete={data.complete}
                                            edit={data.edit}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div >
    )
});

export default Lists
