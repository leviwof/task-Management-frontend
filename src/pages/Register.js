import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const submit = async (e) => {
        e.preventDefault();

        // 🔍 DEBUG (temporary)
        console.log("Register payload:", form);

        await register({
            name: form.name,
            email: form.email,
            password: form.password
        });

        alert("Registered successfully. Please login.");
        navigate("/login");
    };

    return (
        <form className="auth-box" onSubmit={submit}>
            <h2>Register</h2>

            <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />

            <button type="submit">Register</button>

            <p style={{ marginTop: "12px", textAlign: "center" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#2563eb" }}>
                    Login
                </Link>
            </p>
        </form>
    );
}
