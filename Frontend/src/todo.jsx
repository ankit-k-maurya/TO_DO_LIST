import React, { useEffect, useState } from 'react'
import './style.css';
import axios from './axios.jsx';

const TODO = () => {
    const [inputdata, setInputData] = useState("");
    const [inputtime, setInputtime] = useState("");
    const [inputdate, setInputdate] = useState("");
    const [items, setItems] = useState([]);
    const [isEditItem, setIsEditItem] = useState(" ");
    const [toggleButton, setToggleButton] = useState(false);

    const getData = async () => {
        try {
            const response = await axios.get('/GetSchedule');
            const schedule = response.data.result;
            setItems(await schedule);

        } catch (error) {
            console.log('Error', error);
        }
    }

    //Add Schedule method 
    const addItem = async (event) => {
        event.preventDefault();
        if (!inputdata) alert('Pls fill  the data');
        if (inputdata && inputtime && inputdate && toggleButton) {
            const response = await axios.patch('/UpdateSchedule/' + isEditItem, {
                Task: inputdata,
                TaskDate: inputdate,
                TaskTime: inputtime
            });
            const details = response.data.result;
            setItems(details);
            setInputData(" ");
            setInputdate(" ");
            setInputtime(" ");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const response = await axios.post('/CreateSchedule', {
                Task: inputdata,
                TaskDate: inputdate,
                TaskTime: inputtime
            })
            const details = response.data.result;
            setItems(details);
            setInputData(" ");
            setInputdate(" ");
            setInputtime(" ");
        }
    }

    //Edit Schedule method
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.ScheduleID === index;
        });
        setInputData(item_todo_edited.Task);
        setInputdate(item_todo_edited.TaskDate);
        setInputtime(item_todo_edited.TaskTime);
        setIsEditItem(index);
        setToggleButton(true);
    }

    //Delete Schedule method
    const deleteItem = async (index) => {

        const res = await axios.delete('/deleteSchedule/' + index);
        if (res.status === 200) {
            const detail = items.filter((curElem) => {
                return curElem.ScheduleID !== index;
            })
            setItems(detail);
        }
    };

    //Empty Schedule method
    const removeAll = () => setItems([]);

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./todo.jpg" alt="todologo" />
                        <figcaption>Add your List Item ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text"
                            placeholder='✍ Add Task'
                            className='form-control'
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                    </div>
                    <div className='addItems'>
                        <input type="Date"
                            placeholder='✍ Add Task'
                            className='form-control'
                            value={inputdate}
                            onChange={(event) => setInputdate(event.target.value)}
                        />
                    </div>
                    <div className='addItems'>
                        <input type="Time"
                            placeholder='✍ Add Task'
                            className='form-control'
                            value={inputtime}
                            onChange={(event) => setInputtime(event.target.value)}
                        />
                        <br />
                        <br />

                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    <br />
                    {/* Show Item*/}

                    <div className='showItem'>
                        {
                            items.map((curElem) => {
                                return (
                                    <div className='eachItem' key={curElem.ScheduleID}>
                                        <h1>{curElem.Task}</h1>
                                        <h1>{curElem.TaskDate}</h1>
                                        <h1>{curElem.TaskTime}</h1>
                                        {/* &#50; */}
                                        <div className='todo-btn'>
                                            <i className='far fa-edit add-btn'
                                                onClick={() => editItem(curElem.ScheduleID)}></i>
                                            <i
                                                className="far fa-trash-alt add-btn"
                                                onClick={() => deleteItem(curElem.ScheduleID)}
                                            ></i>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    {/* Remove all Item */}
                    <div className='showItems'>
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span>CHECK LIST </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TODO;