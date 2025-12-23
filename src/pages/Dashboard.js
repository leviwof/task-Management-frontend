import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskList from "../pages/TaskList";
import Taskform from "../pages/Taskform";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        const res = await api.get("/tasks");
        setTasks(res.data.data || res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <Taskform
                editingTask={editingTask}
                onSuccess={() => {
                    setEditingTask(null);
                    fetchTasks();
                }}
            />

            <TaskList
                tasks={tasks}
                onEdit={setEditingTask}
                onRefresh={fetchTasks}
            />
        </>
    );
}
