import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/storage";

export default function AdminRoute({ children }) {
	if (!isAdmin()) {
		alert("Access Denied");

		return <Navigate to="/dashboard" replace />;
	}

	return children;
}
