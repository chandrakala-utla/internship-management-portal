import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../utils/storage";
import "../styles/applications.css";

export default function Applications() {
	const navigate = useNavigate();

	const applications = getApplications();

	return (
		<>
			<Navbar />

			<div className="applications-page">
				<h1>My Applications</h1>

				{applications.length === 0 ?
					<p className="empty">You haven't applied for any internships yet.</p>
				:	<div className="table-container">
						<table>
							<thead>
								<tr>
									<th>Company</th>
									<th>Role</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{applications.map((app, index) => (
									<tr key={index}>
										<td>{app.company}</td>

										<td>{app.role}</td>

										<td>
											<span
												className={`status ${app.status
													.toLowerCase()
													.replace(/\s/g, "-")}`}
											>
												{app.status}
											</span>
										</td>

										<td>
											{app.status === "Assessment Assigned" && (
												<button
													className="action-btn"
													onClick={() => navigate(`/assessment/${index}`)}
												>
													Take Assessment
												</button>
											)}

											{app.status === "Technical Interview" && (
												<button
													className="action-btn"
													onClick={() =>
														alert(
															"HR will contact you soon regarding the interview schedule.",
														)
													}
												>
													View Interview
												</button>
											)}

											{app.status === "Selected" && (
												<span className="success-text">
													🎉 Congratulations!
												</span>
											)}

											{![
												"Assessment Assigned",
												"Technical Interview",
												"Selected",
											].includes(app.status) && (
												<span style={{ color: "#888" }}>-</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				}
			</div>

			<Footer />
		</>
	);
}
