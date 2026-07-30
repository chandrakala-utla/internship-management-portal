import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/storage";

export default function AdminNavbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const scrollToApplications = () => {
		if (location.pathname !== "/admin") {
			navigate("/admin");

			setTimeout(() => {
				document
					.getElementById("applications")
					?.scrollIntoView({ behavior: "smooth" });
			}, 200);
		} else {
			document
				.getElementById("applications")
				?.scrollIntoView({ behavior: "smooth" });
		}
	};
	const scrollToDashboard = () => {
		if (location.pathname !== "/admin") {
			navigate("/admin");

			setTimeout(() => {
				document
					.getElementById("dashboard")
					?.scrollIntoView({ behavior: "smooth" });
			}, 200);
		} else {
			document
				.getElementById("dashboard")
				?.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<nav className="admin-navbar">
			<div className="admin-logo">
				🎓 <span>Internship Portal | Admin</span>
			</div>

			<ul>
				<li>
					<button className="nav-btn" onClick={scrollToDashboard}>
						Dashboard
					</button>
				</li>

				<li>
					<button className="nav-btn" onClick={scrollToApplications}>
						Applications
					</button>
				</li>

				<li>
					<button className="logout-btn" onClick={handleLogout}>
						Logout
					</button>
				</li>
			</ul>
		</nav>
	);
}
