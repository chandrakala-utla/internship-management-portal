import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "../styles/admin.css";

import { getAllApplications, updateApplicationStatus } from "../utils/storage";

export default function Admin() {
	const [applications, setApplications] = useState(getAllApplications());
	const [search, setSearch] = useState("");

	const updateStatus = (index, status) => {
		updateApplicationStatus(index, status);
		setApplications(getAllApplications());
	};

	const filteredApplications = applications.filter(
		(app) =>
			app.name.toLowerCase().includes(search.toLowerCase()) ||
			app.company.toLowerCase().includes(search.toLowerCase()) ||
			app.role.toLowerCase().includes(search.toLowerCase()),
	);

	const totalStudents = new Set(applications.map((a) => a.email)).size;
	const totalApplications = applications.length;
	const applied = applications.filter((a) => a.status === "Applied").length;
	const assessment = applications.filter(
		(a) => a.status === "Assessment Assigned",
	).length;
	const interview = applications.filter(
		(a) =>
			a.status === "Technical Interview" || a.status === "Interview Scheduled",
	).length;
	const selected = applications.filter((a) => a.status === "Selected").length;
	const rejected = applications.filter((a) => a.status === "Rejected").length;

	return (
		<>
			<AdminNavbar />

			<div className="admin-container">
				<h1>Admin Dashboard</h1>

				<div className="stats" id="dashboard">
					<div className="card">
						<div className="icon">👨‍🎓</div>
						<h2>{totalStudents}</h2>
						<p>Students</p>
					</div>

					<div className="card">
						<div className="icon">📄</div>
						<h2>{totalApplications}</h2>
						<p>Applications</p>
					</div>

					<div className="card">
						<div className="icon">🟡</div>
						<h2>{applied}</h2>
						<p>Applied</p>
					</div>

					<div className="card">
						<div className="icon">📝</div>
						<h2>{assessment}</h2>
						<p>Assessment</p>
					</div>

					<div className="card">
						<div className="icon">💬</div>
						<h2>{interview}</h2>
						<p>Interview</p>
					</div>

					<div className="card">
						<div className="icon">🏆</div>
						<h2>{selected}</h2>
						<p>Selected</p>
					</div>

					<div className="card">
						<div className="icon">❌</div>
						<h2>{rejected}</h2>
						<p>Rejected</p>
					</div>
				</div>

				<div className="table-box" id="applications">
					<div className="table-header">
						<h2>Application Management</h2>

						<input
							type="text"
							className="search-box"
							placeholder="🔍 Search student, company or role..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					<table>
						<thead>
							<tr>
								<th>Student</th>
								<th>Company</th>
								<th>Role</th>
								<th>Status</th>
								<th>Update Status</th>
							</tr>
						</thead>

						<tbody>
							{filteredApplications.length === 0 ?
								<tr>
									<td colSpan="5">No Applications Found</td>
								</tr>
							:	filteredApplications.map((app) => {
									const originalIndex = applications.findIndex(
										(a) =>
											a.email === app.email &&
											a.company === app.company &&
											a.role === app.role,
									);

									return (
										<tr key={`${app.email}-${app.company}-${app.role}`}>
											<td>{app.name}</td>

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
												<select
													value={app.status}
													onChange={(e) =>
														updateStatus(originalIndex, e.target.value)
													}
												>
													<option value="Applied">Applied</option>

													<option value="Resume Approved">
														Resume Approved
													</option>

													<option value="Assessment Assigned">
														Assessment Assigned
													</option>

													<option value="Technical Interview">
														Technical Interview
													</option>

													<option value="Selected">Selected</option>

													<option value="Rejected">Rejected</option>
												</select>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<Footer />
		</>
	);
}
