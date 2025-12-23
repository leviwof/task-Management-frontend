import { useAuth } from "../context/AuthContext";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h3>Task Manager</h3>
            <button onClick={() => navigate("/login")}>Logout</button>
        </nav>
    );
}
