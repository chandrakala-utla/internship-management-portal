import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { login } from "../utils/storage";

export default function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = (e) => {
		e.preventDefault();

		const role = login(email, password);

		if (role === "admin") {
			alert("Admin Login Successful");

			navigate("/admin");
		} else if (role === "student") {
			alert("Login Successful");

			navigate("/dashboard");
		} else {
			alert("Invalid Email or Password");
		}
	};

	return (
		<div className="login-page">
			<div className="login-card">
				<h1>Login</h1>

				<form onSubmit={submit}>
					<input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button>Login</button>
				</form>

				<p className="bottom-text">
					New User?
					<Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
}
