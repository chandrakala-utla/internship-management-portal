import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/storage";

function InternshipCard({ internship }) {
    const navigate = useNavigate();

		const handleApply = () => {
			if (!isLoggedIn()) {
				alert("Please login first.");
				navigate("/login");
				return;
			}

			navigate("/apply", {
				state: { internship },
			});
		};

	return (
		<div className="internship-card">
			<div className="company-logo">
				<img
					src={internship.logo}
					alt={internship.company}
					className="logo-image"
				/>
			</div>

			<h2>{internship.company}</h2>

			<h3>{internship.role}</h3>

			<p>📍 {internship.location}</p>

			<p>💰 {internship.stipend}</p>

			<p>🕒 {internship.duration}</p>

			<div className="skills">
				{internship.skills.map((skill, index) => (
					<span key={index}>{skill}</span>
				))}
			</div>

			<button className="apply-btn" onClick={handleApply}>
				Apply Now
			</button>
		</div>
	);
}

export default InternshipCard;
