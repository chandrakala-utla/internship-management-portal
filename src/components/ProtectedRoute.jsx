import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/storage";

export default function ProtectedRoute({ children }) {
	if (!isLoggedIn()) {
		alert("Please Login First");

		return <Navigate to="/login" replace />;
	}

	return children;
}
