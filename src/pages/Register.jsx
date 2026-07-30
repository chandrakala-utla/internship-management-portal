import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";
import { saveUser } from "../utils/storage";

export default function Register() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		college: "",
		branch: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		saveUser(form);

		alert("Registration Successful!");

		navigate("/login");
	};

	return (
		<div className="register-page">
			<div className="register-card">
				<h1>Create Account</h1>

				<form onSubmit={handleSubmit}>
					<input
						name="name"
						placeholder="Full Name"
						onChange={handleChange}
						required
					/>

					<input
						name="email"
						type="email"
						placeholder="Email"
						onChange={handleChange}
						required
					/>

					<input name="college" placeholder="College" onChange={handleChange} />

					<input name="branch" placeholder="Branch" onChange={handleChange} />

					<input
						name="password"
						type="password"
						placeholder="Password"
						onChange={handleChange}
						required
					/>

					<input
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						onChange={handleChange}
						required
					/>

					<button type="submit">Register</button>
				</form>

				<p className="bottom-text">
					Already have an account?
					<Link to="/login"> Login</Link>
				</p>
			</div>
		</div>
	);
}
