import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const res = await login(form);

        console.log("LOGIN RESPONSE:", res);
        navigate("/");
    };


    return (
        <form className="auth-box" onSubmit={submit}>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button>Login</button>
            <p style={{ marginTop: "12px", textAlign: "center" }}>
                Don’t have an account?{" "}
                <Link to="/register" style={{ color: "#2563eb" }}>
                    Register
                </Link>
            </p>
        </form>
    );
}
