import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/leaderboard");
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        }

        fetchLeaderboard();
    }, []);

    return (
        <div className="w-full my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Top 10 Performing Organizations/Societies</h2>
            <div className="flex flex-col">
                {leaderboardData.map((item, index) => (
                    <div key={index} className=" w-auto h-15 mb-4 flex items-center  ">
                        <div className="bg-white w-2/3 rounded-lg shadow-md p-2 md:p-3 mx-2 md:mx-auto transition-transform duration-300 transform-gpu hover:scale-105">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold">{index + 1}.</div>
                                <div className="ml-4 flex-grow">{item.org_name}</div>
                                <div className="text-gray-600">Score: {item.score}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
