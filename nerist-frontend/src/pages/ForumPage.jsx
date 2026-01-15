import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import QuestionList from '../components/Forum/QuestionList';
import QuestionDetail from '../components/Forum/QuestionDetail';

const ForumPage = () => {
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Student Forum</h1>
                    {!selectedQuestionId && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">
                            Ask a Question
                        </button>
                    )}
                </div>

                {selectedQuestionId ? (
                    <QuestionDetail
                        questionId={selectedQuestionId}
                        onBack={() => setSelectedQuestionId(null)}
                    />
                ) : (
                    <QuestionList onSelectQuestion={setSelectedQuestionId} />
                )}
            </div>
        </div>
    );
};

export default ForumPage;
