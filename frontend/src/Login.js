import { useState } from "react";
import API from "./api";

const loginUser = async () => {
    console.log("LOGIN BUTTON CLICKED"); // 👈 ADD THIS FIRST

    try {
        const res = await API.post("/auth/login", {
            email,
            password
        });

        console.log(res.data); // 👈 ADD THIS
        localStorage.setItem("token", res.data.token);

        alert("Login success");
    } catch (err) {
        console.log("LOGIN ERROR:", err.response?.data || err.message);
    }
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            alert("Login successful!");
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginUser}>Login</button>
        </div>
    );
};

export default Login;