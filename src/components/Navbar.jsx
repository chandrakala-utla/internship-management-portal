import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getCurrentUser } from "../utils/storage";

function Navbar() {
	const navigate = useNavigate();
	const user = getCurrentUser();

	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="logo">
				<span className="logo-icon">🎓</span>
				<span>Internship Portal</span>
			</div>

			<div
				className={`hamburger ${menuOpen ? "active" : ""}`}
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<ul className={menuOpen ? "nav-links active" : "nav-links"}>
				<li>
					<Link to="/" onClick={closeMenu}>
						Home
					</Link>
				</li>

				<li>
					<Link to="/internships" onClick={closeMenu}>
						Internships
					</Link>
				</li>

				{isLoggedIn() ?
					<>
						<li>
							<Link to="/dashboard" onClick={closeMenu}>
								Dashboard
							</Link>
						</li>

						<li>
							<Link to="/applications" onClick={closeMenu}>
								Applications
							</Link>
						</li>

						<li className="username">Hi, {user?.name?.toUpperCase()}</li>

						<li>
							<button
								className="logout-btn"
								onClick={() => {
									handleLogout();
									closeMenu();
								}}
							>
								Logout
							</button>
						</li>
					</>
				:	<>
						<li>
							<Link to="/login" onClick={closeMenu}>
								Login
							</Link>
						</li>

						<li>
							<Link to="/register" onClick={closeMenu}>
								Register
							</Link>
						</li>
					</>
				}
			</ul>
		</nav>
	);
}

export default Navbar;
