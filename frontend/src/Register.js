import { useState } from "react";
import API from "./api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        try {
            const res = await API.post("/auth/register", {
                name,
                email,
                password
            });

            alert("User registered!");
            console.log(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={registerUser}>Register</button>
        </div>
    );
};

export default Register;