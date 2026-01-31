import React, { useState } from 'react';
import axios from '../../api/axios';

const ChatInterface = ({ noteId, noteTitle, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: `Hi! Ask me anything about "${noteTitle}".` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(`chat/${noteId}/`, { query: userMsg.text });
            const botMsg = { role: 'assistant', text: response.data.answer };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = { role: 'assistant', text: "Sorry, I encountered an error checking the document." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 w-96 glass-dark rounded-2xl shadow-2xl border border-white/10 flex flex-col h-[600px] overflow-hidden transform transition-all duration-300 ease-in-out z-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <div>
                        <h3 className="font-bold text-sm">Gemini AI Assistant</h3>
                        <p className="text-[10px] text-blue-100 opacity-90 truncate max-w-[200px]">{noteTitle}</p>
                    </div>
                </div>
                <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-black/50 scrollbar-hide">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm backdrop-blur-md ${msg.role === 'user'
                            ? 'bg-blue-600/90 text-white rounded-br-sm border border-blue-500/30'
                            : 'bg-gray-800/80 text-gray-100 rounded-bl-sm border border-white/10'
                            }`}>
                            {msg.text.split('\n').map((line, i) => (
                                <p key={i} className={`mb-1 last:mb-0 leading-relaxed ${line.startsWith('-') ? 'ml-2' : ''}`}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-gray-800/50 p-3 rounded-2xl rounded-bl-sm border border-white/5 flex gap-2 items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-gray-900/90 border-t border-white/10 flex gap-2 items-center">
                <input
                    type="text"
                    className="flex-1 bg-gray-800/50 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500 transition-all"
                    placeholder="Ask about this note..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                    <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
