import api from "../api/axios";
import "../styles/TaskList.css";

export default function TaskList({ tasks, onEdit, onRefresh }) {
    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        await api.delete(`/tasks/${id}`);
        onRefresh();
    };

    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>
                        <span className={`tag status-${task.status}`}>{task.status}</span>
                        <span className={`tag priority-${task.priority}`}>{task.priority}</span>
                    </p>


                    <div className="task-actions">
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
