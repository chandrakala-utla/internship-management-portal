import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

import {
	getAllApplications,
	updateApplicationStatus,
	assignAssessment,
} from "../utils/storage";

export default function ApplicationDetails() {
	const { id } = useParams();

	const navigate = useNavigate();

	const applications = getAllApplications();

	const app = applications[id];

	if (!app) {
		return <h2>Application Not Found</h2>;
	}

	const changeStatus = (status) => {
		updateApplicationStatus(id, status);

		alert("Status Updated Successfully");

		navigate("/admin");
	};

	return (
		<>
			<AdminNavbar />

			<div className="admin-page">
				<h1>Application Details</h1>

				<div className="details-card">
					<h2>{app.name}</h2>

					<p>
						<strong>Company:</strong> {app.company}
					</p>

					<p>
						<strong>Role:</strong> {app.role}
					</p>

					<p>
						<strong>Status:</strong> {app.status}
					</p>

					<h3>Resume Review</h3>

					<div className="action-buttons">
						<button onClick={() => changeStatus("Shortlisted")}>
							Approve Resume
						</button>

						<button onClick={() => changeStatus("Rejected")}>
							Reject Resume
						</button>
					</div>

					<hr />

					<h3>Assessment</h3>

					<button
						className="assign-btn"
						onClick={() => {
							assignAssessment(id);
							alert("Assessment Assigned");
							navigate("/admin");
						}}
					>
						Assign Assessment
					</button>
				</div>
				<hr />

				<h3>Interview</h3>

				<button
					className="assign-btn"
					onClick={() => {
						updateApplicationStatus(id, "Interview Scheduled");
						alert("Interview Scheduled");
						navigate("/admin");
					}}
				>
					Schedule Interview
				</button>
				<hr />

				<h3>Final Decision</h3>

				<div className="action-buttons">
					<button
						onClick={() => {
							updateApplicationStatus(id, "Selected");
							alert("Candidate Selected");
							navigate("/admin");
						}}
					>
						Select Candidate
					</button>

					<button
						onClick={() => {
							updateApplicationStatus(id, "Rejected");
							alert("Candidate Rejected");
							navigate("/admin");
						}}
					>
						Reject Candidate
					</button>
				</div>
			</div>

			<Footer />
		</>
	);
}
