import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";


export default function App() {

  const initTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

  const [todoData, setTodoData] = useState(initTodoData);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    console.log(JSON.parse(localStorage.getItem("todoData")))
  }, [todoData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),               //유니크한 값을 가지게 하기 위함
      title: value,
      complete: false,
      edit: false,
    };
    //원래 데이터에 붙히기
    setTodoData(prev => [...prev, newTodo])   //전개연산자
    setValue("");
  };

  const handleDelete = (e) => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <div>
            <button
              className="p-2 mb-1 text-sm text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
              onClick={handleDelete}>
              모두 지우기</button>
          </div>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />

      </div>
    </div>
  )
}