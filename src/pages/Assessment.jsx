import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import questions from "../data/questions";
import { completeAssessment } from "../utils/storage";
import "../styles/assessment.css";

export default function Assessment() {
	const { id } = useParams();
	const navigate = useNavigate();

	// ==========================
	// TIMER
	// ==========================

	const TOTAL_TIME = 15 * 60;

	const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

	// ==========================
	// QUESTIONS
	// ==========================

	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [answers, setAnswers] = useState({});

	// ==========================
	// ANSWER COUNT
	// ==========================

	const answeredQuestions = Object.keys(answers).length;

	const progress = (answeredQuestions / questions.length) * 100;

	// ==========================
	// HANDLE OPTION CHANGE
	// ==========================

	const handleChange = (value) => {
		setAnswers((prev) => ({
			...prev,
			[currentQuestion]: value,
		}));
	};

	// ==========================
	// PREVIOUS
	// ==========================

	const previousQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1);
		}
	};

	// ==========================
	// NEXT
	// ==========================

	const nextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
		}
	};

	// ==========================
	// SUBMIT
	// ==========================

	function submitAssessment(autoSubmit = false) {
		if (!autoSubmit) {
			if (answeredQuestions !== questions.length) {
				alert("Please answer all questions.");
				return;
			}

			const ok = window.confirm(
				"Submit Assessment?\nYou cannot modify answers later.",
			);

			if (!ok) return;
		}

		let score = 0;

		questions.forEach((q, index) => {
			if (answers[index] === q.answer) {
				score++;
			}
		});

		const percentage = Math.round((score / questions.length) * 100);

		console.log("Score:", score);
		console.log("Percentage:", percentage);

		completeAssessment(Number(id), percentage);

		alert(
			`Assessment Completed!\n\nCorrect Answers: ${score}/${questions.length}\nPercentage: ${percentage}%`,
		);

		navigate("/dashboard");
	}

	// ==========================
	// TIMER
	// ==========================

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					submitAssessment(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// ==========================
	// TIME FORMAT
	// ==========================

	const minutes = Math.floor(timeLeft / 60);

	const seconds = timeLeft % 60;

	const formattedTime =
		String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

	const question = questions[currentQuestion];
	return (
		<>
			<Navbar />

			<div className="assessment-page">
				<div className="assessment-card">
					<h1>📝 Online Assessment</h1>

					{/* Timer */}

					<div className="timer">⏳ Time Left : {formattedTime}</div>

					{/* Progress */}

					<div className="progress-box">
						<div
							className="progress-fill"
							style={{
								width: `${progress}%`,
							}}
						></div>
					</div>

					<p className="progress-text">
						Answered {answeredQuestions} of {questions.length} Questions
					</p>

					{/* Current Question */}

					<div className="question">
						<h3>
							Question {currentQuestion + 1} / {questions.length}
						</h3>

						<h2>{question.question}</h2>

						<div className="options">
							{question.options.map((option, index) => (
								<label key={index}>
									<input
										type="radio"
										name={`question-${currentQuestion}`}
										value={option}
										checked={answers[currentQuestion] === option}
										onChange={() => handleChange(option)}
									/>

									{option}
								</label>
							))}
						</div>
					</div>

					{/* Navigation Buttons */}

					<div className="navigation-buttons">
						<button
							className="nav-btn"
							onClick={previousQuestion}
							disabled={currentQuestion === 0}
						>
							⬅ Previous
						</button>

						{currentQuestion < questions.length - 1 ?
							<button className="nav-btn" onClick={nextQuestion}>
								Next ➜
							</button>
						:	<button
								className="submit-btn"
								onClick={() => submitAssessment(false)}
							>
								Submit Assessment
							</button>
						}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}