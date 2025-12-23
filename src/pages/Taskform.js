import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/TaskForm.css";
import { useNavigate } from "react-router-dom"

export default function TaskForm({ editingTask, onSuccess }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: ""
    });
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title,
                description: editingTask.description || "",
                status: editingTask.status,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate?.slice(0, 10) || ""
            });
        }
    }, [editingTask]);

    const submit = async (e) => {
        e.preventDefault();

        if (editingTask) {
            await api.put(`/tasks/${editingTask._id}`, form);
        } else {
            await api.post("/tasks", form);
        }

        setForm({
            title: "",
            description: "",
            status: "pending",
            priority: "medium",
            dueDate: ""
        });

        onSuccess();
    };

    return (
        <form onSubmit={submit} className="task-form">
            <div className="task-form-header">
                <h3>{editingTask ? "Edit Task" : "Create Task"}</h3>
            </div>

            <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />

            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />

            <button>{editingTask ? "Update Task" : "Create Task"}</button>
            <div className="task-form-header">
                <button type="button" className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>

        </form>
    );
}
