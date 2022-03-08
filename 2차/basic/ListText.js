import React, { useState } from 'react'



const ListText = ({ id, title, complete, todoData, edit, setTodoData, }) => {

    const [listText, setListText] = useState(title);

    const handleSubmit = (e) => {
        e.preventDefault();
        textSubmit(id);
    }

    const handleChange = (e) => {
        setListText(e.target.value);
    };

    const textSubmit = (id) => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.title = listText;
                data.edit = !data.edit;
            }
            return data;
        })
        setTodoData(newTodoData);
    };

    const handleEdit = (id) => {

        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.edit = !data.edit;
            }
            return data;
        })
        setTodoData(newTodoData);
    };


    if (!edit) {
        return (
            <div className='group w-full py-1'>
                <span className={`${complete ? "line-through" : undefined} px-2`}>{title}</span>
                <button
                    className='py-1 px-1 float-right text-xs text-slate-100 group-hover:text-slate-400'
                    onClick={() => handleEdit(id)}>edit</button>
            </div>
        );
    }
    else {
        return (
            <div className='w-full flex items-center justify-between'>
                <form className="px-1 w-full" onSubmit={handleSubmit}>
                    <input
                        className="w-full px-1 py-0.5 text-gray-500 bg-gray-100 border"
                        type="text"
                        name="value"
                        value={listText}
                        onChange={handleChange}
                    />
                </form>
                <button
                    onClick={() => textSubmit(id)}
                    className="text-xs px-1 h-full text-slate-400">done</button>
            </div>


        );
    }
};

export default ListText