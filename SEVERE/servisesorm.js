import { DataTypes, INTEGER, Model, Op, STRING } from "sequelize";
import sequelize from "./indexorm.js";

class Schedule extends Model { }
Schedule.init({
    ScheduleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        Comment: 'AutoIncrement primary key'
    },
    Task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TaskDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    TaskTime: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Schedule',
    obj: 'Schedule',
    timestamps: false
});

try {
    sequelize.authenticate();
    sequelize.sync({ alter: true })
    console.log('Connection has been  established successfully.');

    var Createschedule = async (Task, TaskDate, TaskTime) => {
        console.log('Task, TaskDate, TaskTime', Task, TaskDate, TaskTime);
        await Schedule.create({ Task: Task, TaskDate: TaskDate, TaskTime: TaskTime }, { returning: false })
        const result = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        console.log('Schedule: ', result);
        return result;
    }

    var getSchedule = async () => {
        const data = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        console.log("ScheduleData:", data)
        return data;
    }

    var UpdateSchedule = async (ScheduleID, Task, TaskDate, TaskTime) => {
        await Schedule.update({ ScheduleID: ScheduleID, Task: Task, TaskDate: TaskDate, TaskTime: TaskTime },
            {
                where: {
                    ScheduleID: ScheduleID
                },
                returning: false,
            });
        const data = await Schedule.findAll({
            order: [['TaskDate', 'ASC'], ['TaskTime', 'ASC']]
        });
        return data;
    }

    var DeletedSchedule = async (ScheduleID) => {
        const data = await Schedule.destroy({
            where: {
                ScheduleID: ScheduleID,
            }
        });
        return data;
    }
}
catch (error) {
    console.log('Unable to connect the database :', error)
}
export { Createschedule, getSchedule, UpdateSchedule, DeletedSchedule,  }
