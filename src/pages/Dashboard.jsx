import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../utils/storage";

export default function Dashboard() {
	const navigate = useNavigate();

	const applications = getApplications();

	const applied = applications.filter((app) => app.status === "Applied").length;

	const assessment = applications.filter(
		(app) => app.status === "Assessment Assigned" && !app.assessmentCompleted,
	).length;

	const interview = applications.filter(
		(app) => app.status === "Technical Interview",
	).length;

	const selected = applications.filter(
		(app) => app.status === "Selected",
	).length;

	const rejected = applications.filter(
		(app) => app.status === "Rejected",
	).length;

	const stats = [
		{ title: "Applied", value: applied, icon: "📄" },
		{ title: "Assessment", value: assessment, icon: "📝" },
		{ title: "Interview", value: interview, icon: "💬" },
		{ title: "Selected", value: selected, icon: "🏆" },
		{ title: "Rejected", value: rejected, icon: "❌" },
	];

	const pendingAssessments = applications.filter(
		(app) => app.status === "Assessment Assigned" && !app.assessmentCompleted,
	);

	return (
		<>
			<Navbar />

			<div className="dashboard">
				<div className="welcome-card">
					<h1>👋 Welcome Back</h1>

					<p>
						Track your internship applications and stay updated with every stage
						of the recruitment process.
					</p>
				</div>

				{/* Statistics */}

				<div className="stats-grid">
					{stats.map((item, index) => (
						<div className="stat-box" key={index}>
							<div className="stat-icon">{item.icon}</div>

							<h2>{item.value}</h2>

							<p>{item.title}</p>
						</div>
					))}
				</div>

				{/* Quick Actions */}

				<div className="quick-actions">
					<h2>Quick Actions</h2>

					<div className="action-buttons">
						<button onClick={() => navigate("/internships")}>
							Browse Internships
						</button>

						<button onClick={() => navigate("/applications")}>
							My Applications
						</button>
					</div>
				</div>

				{/* Assessments */}

				<div className="assessment-section">
					<h2>Available Assessments</h2>

					{pendingAssessments.length === 0 ?
						<p>No assessment assigned yet.</p>
					:	pendingAssessments.map((app) => (
							<div
								className="assessment-card"
								key={`${app.email}-${app.company}`}
							>
								<h3>{app.company}</h3>

								<p>{app.role}</p>

								<button
									className="action-btn"
									onClick={() => navigate(`/assessment/${app.originalIndex}`)}
								>
									Start Assessment
								</button>
							</div>
						))
					}
				</div>

				{/* Applications */}

				<div className="recent-table">
					<h2>My Applications</h2>

					<table>
						<thead>
							<tr>
								<th>Company</th>
								<th>Role</th>
								<th>Status</th>
							</tr>
						</thead>

						<tbody>
							{applications.length === 0 ?
								<tr>
									<td colSpan="3">No applications found.</td>
								</tr>
							:	applications.map((item, index) => (
									<tr key={index}>
										<td>{item.company}</td>

										<td>{item.role}</td>

										<td>
											<span
												className={`status ${item.status
													.toLowerCase()
													.replace(/\s/g, "-")}`}
											>
												{item.status}
											</span>

											{item.status === "Assessment Assigned" &&
												!item.assessmentCompleted && (
													<div style={{ marginTop: "10px" }}>
														<button
															className="action-btn"
															onClick={() =>
																navigate(`/assessment/${item.originalIndex}`)
															}
														>
															Take Assessment
														</button>
													</div>
												)}
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>

			<Footer />
		</>
	);
}
