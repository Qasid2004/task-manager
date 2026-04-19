import { useEffect, useState } from "react";
import API from "./api";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        await API.post("/tasks", {
            title: "Test Task",
            description: "Hello",
            dueDate: "2026-04-20",
            tableId: 1
        });

        getTasks();
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <h2>Tasks</h2>

            <button onClick={addTask}>Add Task</button>

            {tasks.map((t) => (
                <div key={t._id}>
                    <h4>{t.title}</h4>
                    <p>{t.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Tasks;