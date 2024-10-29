import fs from 'fs';
import { Createschedule, getSchedule, UpdateSchedule, DeletedSchedule } from './servisesorm.js';
import * as jose from 'jose';

const BulidSchedule = async (req, res) => {
    let obj;
    const { Task, TaskDate, TaskTime } = req.body;
    const result = await Createschedule(Task, TaskDate, TaskTime);
    if (result) {
        obj = { message: 'Task is successfully registerd', result }
    }
    else {
        obj = { message: 'Task is not registerd' }
    }
    res.status(201).send(obj);
}

const getScheduleDetails = async (req, res) => {
    let obj;
    const result = await getSchedule();
    if (result) {
        obj = { message: 'Your schedule is complete today', result }
    }
    else {
        obj = { message: "Your schedule is not found" }
    }
    res.status(200).json(obj);
}

const UpdateScheduleDetail = async (req, res) => {
    let obj;
    const ScheduleID = req.params.ScheduleID;
    const { Task, TaskDate, TaskTime } = req.body;
    const result = await UpdateSchedule(ScheduleID, Task, TaskDate, TaskTime);
    if (result) {
        obj = { message: 'Your Schedule is Updated', result }
    }
    else {
        obj = { message: 'Your Schedule is not found' }
    }
    res.status(201).send(obj);
}

const deleteSchedule = async (req, res) => {
    let obj;
    const ScheduleID = req.params.ScheduleID;
    const result = await DeletedSchedule(ScheduleID);
    if (result) {
        obj = { message: 'Your schedule is deleted', result }
    }
    else {
        obj = { message: 'Your schedule is not found' }
    }
    res.status(200).send(obj);
}

const sendData = async (res) =>{
       res.send(res.obj);
}

export {sendData,BulidSchedule,getScheduleDetails,UpdateScheduleDetail,deleteSchedule}
