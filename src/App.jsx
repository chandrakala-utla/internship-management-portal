import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Internships from "./pages/Internships";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationDetails from "./pages/ApplicationDetails";
import Assessment from "./pages/Assessment";
import AdminRoute from "./components/AdminRoute";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/internships" element={<Internships />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/applications"
				element={
					<ProtectedRoute>
						<Applications />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin"
				element={
					<AdminRoute>
						<Admin />
					</AdminRoute>
				}
			/>
			<Route
				path="/apply"
				element={
					<ProtectedRoute>
						<Apply />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/application/:id"
				element={
					<ProtectedRoute>
						<ApplicationDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/assessment/:id"
				element={
					<ProtectedRoute>
						<Assessment />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
