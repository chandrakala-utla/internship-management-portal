import { useState } from "react";
import internships from "../data/internships";
import InternshipCard from "../components/InternshipCard";
import "../styles/internships.css";

function Internships() {
	const [search, setSearch] = useState("");

	const filteredInternships = internships.filter(
		(item) =>
			item.company.toLowerCase().includes(search.toLowerCase()) ||
			item.role.toLowerCase().includes(search.toLowerCase()) ||
			item.location.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<section className="internships-page">
			<h1>Find Your Dream Internship</h1>

			<p>Search and apply for internships from top companies.</p>

			<input
				type="text"
				placeholder="Search by company, role or location..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<div className="internship-grid">
				{filteredInternships.map((internship) => (
					<InternshipCard key={internship.id} internship={internship} />
				))}
			</div>
		</section>
	);
}

export default Internships;
