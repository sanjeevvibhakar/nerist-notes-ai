import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const QuestionDetail = ({ questionId, onBack }) => {
    const [question, setQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestionDetails();
    }, [questionId]);

    const fetchQuestionDetails = async () => {
        try {
            // Since our list endpoint returns everything, we might check if we need a specific detail endpoint.
            // Current lists might not need re-fetch if passed as prop, but good practice to fetch fresh data.
            // However, our backend didn't imply a specific detail retrieve API yet (generic ListCreate), 
            // but usually DRF RetrieveAPIView is needed for /questions/id/.
            // Wait, I only added QuestionListCreateView. I need a Retrieve view or filter the list.
            // For now, let's assuming I should add a Retrieve view, or I can just filter client side if I passed data.
            // But let's check `core/urls.py` again.
            // I only added `path('questions/', ...)` and `path('questions/<int:question_id>/answer/', ...)`.
            // I am MISSING a `path('questions/<int:pk>/', ...)` for retrieving a single question detail!

            // I will implement the fetch assuming I will fix the backend in a moment.
            const response = await axios.get(`questions/${questionId}/`);
            setQuestion(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching question details:", error);
            setLoading(false);
        }
    };

    const handlePostAnswer = async (e) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;

        try {
            // Need auth token handling here ideally, assuming global interceptor or auth header is set
            // For now just basic post
            await axios.post(`questions/${questionId}/answer/`, { body: newAnswer });
            setNewAnswer('');
            fetchQuestionDetails(); // Refresh
        } catch (error) {
            alert('Failed to post answer. Make sure you are logged in.');
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!question) return <div>Question not found</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 mb-4">← Back to Questions</button>

            <h1 className="text-3xl font-bold text-gray-800">{question.title}</h1>
            <div className="text-sm text-gray-500 mt-1 mb-6">Asked by {question.user} on {new Date(question.created_at).toLocaleDateString()}</div>

            <div className="prose max-w-none text-gray-700 mb-8 border-b pb-6">
                <p className="whitespace-pre-wrap">{question.body}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">{question.answers.length} Answers</h3>

            <div className="space-y-6 mb-8">
                {question.answers.map((ans) => (
                    <div key={ans.id} className={`p-4 rounded-lg border ${ans.is_verified ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                        <p className="whitespace-pre-wrap text-gray-800">{ans.body}</p>
                        <div className="mt-2 text-xs text-gray-500 flex justify-between">
                            <span>Answered by {ans.user}</span>
                            <span>{new Date(ans.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handlePostAnswer} className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                <textarea
                    className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="4"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Type your solution here..."
                />
                <button
                    type="submit"
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Post Answer
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;
