// ============================
// USER AUTHENTICATION
// ============================

// Register Student
export function saveUser(user) {
	const users = JSON.parse(localStorage.getItem("users")) || [];

	users.push({
		...user,
		role: "student",
	});

	localStorage.setItem("users", JSON.stringify(users));
}

// Login
export function login(email, password) {
	// Admin Login
	if (email === "admin@gmail.com" && password === "admin123") {
		const admin = {
			name: "Administrator",
			email,
			role: "admin",
		};

		localStorage.setItem("currentUser", JSON.stringify(admin));

		return "admin";
	}

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		localStorage.setItem("currentUser", JSON.stringify(user));

		return "student";
	}

	return null;
}

// Logout
export function logout() {
	localStorage.removeItem("currentUser");
}

// Current User
export function getCurrentUser() {
	return JSON.parse(localStorage.getItem("currentUser"));
}

// Check Login
export function isLoggedIn() {
	return getCurrentUser() !== null;
}

// Check Admin
export function isAdmin() {
	const user = getCurrentUser();

	return user?.role === "admin";
}

// ============================
// APPLICATIONS
// ============================

// Student Apply Internship
export function applyInternship(internship) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	const currentUser = getCurrentUser();

	const exists = applications.find(
		(app) =>
			app.email === currentUser.email && app.company === internship.company,
	);

	if (exists) return false;

	applications.push({
		name: currentUser.name,
		email: currentUser.email,

		company: internship.company,
		role: internship.role,

		status: "Applied",

		assessmentAssigned: false,
		assessmentCompleted: false,
		assessmentScore: 0,
	});

	localStorage.setItem("applications", JSON.stringify(applications));

	return true;
}

// Student Applications
export function getApplications() {
	const currentUser = getCurrentUser();

	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	return applications
		.map((app, index) => ({
			...app,
			originalIndex: index,
		}))
		.filter((app) => app.email === currentUser.email);
}

// Admin Applications
export function getAllApplications() {
	return JSON.parse(localStorage.getItem("applications")) || [];
}
// Update Status
export function updateApplicationStatus(index, status) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].status = status;

	// Keep assessment flag in sync
	if (status === "Assessment Assigned") {
		applications[index].assessmentAssigned = true;
		applications[index].assessmentCompleted = false;
	}

	if (status === "Technical Interview") {
		applications[index].assessmentAssigned = true;
		applications[index].assessmentCompleted = true;
	}

	if (status === "Selected" || status === "Rejected") {
		applications[index].assessmentCompleted = true;
	}

	localStorage.setItem("applications", JSON.stringify(applications));
}
// ============================
// ASSESSMENT
// ============================

export function assignAssessment(index) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].assessmentAssigned = true;

	applications[index].status = "Assessment Assigned";

	localStorage.setItem("applications", JSON.stringify(applications));
}

export function completeAssessment(index, score) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].assessmentCompleted = true;
	applications[index].assessmentScore = score;

	if (score >= 60) {
		applications[index].status = "Technical Interview";
	} else {
		applications[index].status = "Rejected";
	}

	localStorage.setItem("applications", JSON.stringify(applications));
}
// ============================
// INTERVIEW
// ============================

export function scheduleInterview(index) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].status = "Interview Scheduled";

	localStorage.setItem("applications", JSON.stringify(applications));
}

export function selectCandidate(index) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].status = "Selected";

	localStorage.setItem("applications", JSON.stringify(applications));
}

export function rejectCandidate(index) {
	const applications = JSON.parse(localStorage.getItem("applications")) || [];

	applications[index].status = "Rejected";

	localStorage.setItem("applications", JSON.stringify(applications));
}
