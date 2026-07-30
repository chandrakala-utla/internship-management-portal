import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { applyInternship } from "../utils/storage";

export default function Apply() {
	const location = useLocation();
	const navigate = useNavigate();

	const internship = location.state?.internship;

	// If user opens /apply directly
	if (!internship) {
		return (
			<>
				<Navbar />

				<div className="dashboard">
					<h2>No Internship Selected</h2>
					<br />
					<button
						className="primary-btn"
						onClick={() => navigate("/internships")}
					>
						Browse Internships
					</button>
				</div>

				<Footer />
			</>
		);
	}

	const handleApply = () => {
		const success = applyInternship(internship);

		if (success) {
			alert("Application Submitted Successfully!");
			navigate("/applications");
		} else {
			alert("You have already applied for this internship.");
		}
	};

	return (
		<>
			<Navbar />

			<div className="dashboard">
				<div className="welcome-card">
					<h1>Confirm Your Application</h1>
					<br />
					<h2>{internship.company}</h2>
					<p>
						<strong>Role:</strong> {internship.role}
					</p>
					<p>
						<strong>Location:</strong> {internship.location}
					</p>
					<p>
						<strong>Stipend:</strong> {internship.stipend}
					</p>
					<p>
						<strong>Duration:</strong> {internship.duration}
					</p>
					<br />
					<button className="primary-btn" onClick={handleApply}>
						Submit Application
					</button>
					&nbsp;&nbsp;
					<button
						className="secondary-btn"
						onClick={() => navigate("/internships")}
					>
						Cancel
					</button>
				</div>
			</div>

			<Footer />
		</>
	);
}
