import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const QuestionList = ({ onSelectQuestion }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            // Assuming you might want to filter by subject later, but fetching all for now
            const response = await axios.get('questions/');
            setQuestions(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-4">Loading questions...</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Community Q&A</h2>
            {questions.length === 0 ? (
                <p className="text-gray-500">No questions yet. Be the first to ask!</p>
            ) : (
                questions.map((q) => (
                    <div
                        key={q.id}
                        className="border p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition bg-white"
                        onClick={() => onSelectQuestion(q.id)}
                    >
                        <h3 className="text-lg font-semibold text-blue-600">{q.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{q.body}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                            <span>{q.user} • {new Date(q.created_at).toLocaleDateString()}</span>
                            <span>{q.answer_count} answers</span>
                        </div>
                        {q.tags && <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs mt-2">{q.tags}</span>}
                    </div>
                ))
            )}
        </div>
    );
};

export default QuestionList;
