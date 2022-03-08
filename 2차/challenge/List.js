import React from 'react'
import ListText from './ListText';

const List = React.memo(({ id, title, complete, todoData, edit, setTodoData, provided, snapshot, }) => {

    const handleClick = (id) => {
        let newTodoData = todoData.filter(data => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.complete = !data.complete;
            }
            return data;
        })
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    return (
        <div
            key={id} {...provided.draggableProps}
            ref={provided.innerRef} {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
            <div className='w-full flex place-items-stretch'>
                <input
                    className='mx-1 my-2 place-self-center'
                    type="checkbox"
                    defaultChecked={complete}
                    onChange={() => handleCompleteChange(id)} />
                <ListText
                    key={id}
                    id={id}
                    title={title}
                    complete={complete}
                    edit={edit}
                    todoData={todoData}
                    setTodoData={setTodoData}
                />
            </div>
            <div className='item-center'>
                <button className='px-2 py-2 float-right'
                    onClick={() => handleClick(id)}>x</button>

            </div>
        </div>
    );
});

export default List
