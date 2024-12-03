import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faTrophy,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // Fetching user data from Redux store
  const userName = useSelector((state) => state?.mernQuize?.userName || "User");
  const allAttempts = useSelector((state) => state?.mernQuize?.userAttempts || []);

  const [averageScore, setAverageScore] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);

  useEffect(() => {
    if (allAttempts.length > 0) {
      setTotalQuizzes(allAttempts.length);

      // Calculate average score
      const totalScore = allAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
      setAverageScore(Math.round(totalScore / allAttempts.length));
    }
  }, [allAttempts]);

  return (
    <div className="dashboard-container w-10/12 mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-center text-sky-700">User Dashboard</h1>
      <p className="text-lg text-center italic">Welcome back, {userName}!</p>

      <div className="grid grid-cols-3 gap-8 mt-8">
        {/* Card 1: Total Quizzes Attempted */}
        <div className="p-6 bg-blue-100 rounded-lg text-center">
          <FontAwesomeIcon icon={faChartLine} size="3x" className="text-blue-500" />
          <h2 className="text-2xl font-semibold mt-4">Total Quizzes</h2>
          <p className="text-xl">{totalQuizzes}</p>
        </div>

        {/* Card 2: Average Score */}
        <div className="p-6 bg-green-100 rounded-lg text-center">
          <FontAwesomeIcon icon={faTrophy} size="3x" className="text-green-500" />
          <h2 className="text-2xl font-semibold mt-4">Average Score</h2>
          <p className="text-xl">{averageScore} / 100</p>
        </div>

        {/* Card 3: Time Spent */}
        <div className="p-6 bg-yellow-100 rounded-lg text-center">
          <FontAwesomeIcon icon={faClock} size="3x" className="text-yellow-500" />
          <h2 className="text-2xl font-semibold mt-4">Total Time Spent</h2>
          <p className="text-xl">
            {allAttempts.reduce((sum, attempt) => sum + (attempt.timeSpent || 0), 0)} mins
          </p>
        </div>
      </div>

      {/* Section: Quiz Attempts History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          <FontAwesomeIcon icon={faHistory} /> Quiz History
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Quiz Date</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {allAttempts.length > 0 ? (
              allAttempts.map((attempt, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{attempt.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{attempt.score}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      attempt.status === "Pass" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={attempt.status === "Pass" ? faCheckCircle : faTimesCircle}
                    />{" "}
                    {attempt.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{attempt.difficulty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No quiz attempts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
