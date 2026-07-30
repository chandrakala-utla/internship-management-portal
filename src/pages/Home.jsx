import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<Navbar />

			<section className="hero">
				<div className="hero-content">
					<h1>Launch Your Career With The Best Internships</h1>

					<p>
						Find internships from top companies, apply online, track your
						applications and build your professional career.
					</p>

					<div className="buttons">
						<Link to="/internships" className="primary-btn">
							Explore Internships
						</Link>

						<Link to="/register" className="secondary-btn">
							Get Started
						</Link>
					</div>
				</div>
			</section>

			<section className="stats">
				<div className="stat-card">
					<h2>150+</h2>
					<p>Internships</p>
				</div>

				<div className="stat-card">
					<h2>60+</h2>
					<p>Companies</p>
				</div>

				<div className="stat-card">
					<h2>2500+</h2>
					<p>Students</p>
				</div>

				<div className="stat-card">
					<h2>95%</h2>
					<p>Success Rate</p>
				</div>
			</section>

			<section className="features">
				<h2>Why Choose Our Portal?</h2>

				<div className="feature-grid">
					<div className="feature-card">
						<h3>🔍 Smart Search</h3>
						<p>Find internships based on skills and location.</p>
					</div>

					<div className="feature-card">
						<h3>📝 Easy Apply</h3>
						<p>Apply with just one click.</p>
					</div>

					<div className="feature-card">
						<h3>📊 Dashboard</h3>
						<p>Track all your applications easily.</p>
					</div>

					<div className="feature-card">
						<h3>💼 Top Companies</h3>
						<p>Apply to leading companies.</p>
					</div>
				</div>
			</section>

			<section className="companies">
				<h2>Top Hiring Companies</h2>

				<div className="company-grid">
					<div>Google</div>
					<div>Microsoft</div>
					<div>Amazon</div>
					<div>Infosys</div>
					<div>TCS</div>
					<div>Accenture</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Home;
