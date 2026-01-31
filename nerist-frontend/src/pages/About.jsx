import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),theme(colors.white))] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-widest">Built by a Maverick</h2>
                        <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-6xl">Sanjeev Vibhakar</p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            B.Tech Student specializing in **AI & Data Science**.
                            Passionate about developing intelligent applications and refined web experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Developer Profile */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 relative z-10">
                <div className="glass rounded-3xl p-1 max-w-4xl mx-auto shadow-2xl overflow-hidden active:scale-[0.99] transition-transform">
                    <div className="bg-white rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src="https://github.com/sanjeevvibhakar.png"
                                alt="Sanjeev Vibhakar"
                                className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">AI / ML</span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">Web 3.0</span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">Full Stack</span>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-4 font-mono leading-none">@sanjeevvibhakar</h3>
                            <p className="text-gray-600 leading-relaxed mb-8 font-medium italic">
                                "Creating clean, scalable solutions across front-end, back-end, and AI models. I'm on a mission to organize academic resources and make learning accessible to everyone."
                            </p>

                            <div className="flex justify-center md:justify-start gap-4">
                                <a
                                    href="https://github.com/sanjeevvibhakar"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub
                                </a>
                                <a
                                    href="#"
                                    className="bg-white text-gray-900 border border-gray-100 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-md active:scale-95"
                                >
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">The Vision for NERIST Portal</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                            Academic materials should never be hard to find. As a student at NERIST, I saw the struggle of hunting through Telegram channels and Google Drives for the right PDF.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            This portal is built to be a centralized, open-access, and community-driven library. By integrating AI chat with documents, we're not just storing knowledge—we're making it interactive.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass p-8 rounded-3xl text-center">
                            <div className="text-4xl font-black text-blue-600 mb-2">400+</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Subjects</div>
                        </div>
                        <div className="glass p-8 rounded-3xl text-center">
                            <div className="text-4xl font-black text-indigo-600 mb-2">100%</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Open Source</div>
                        </div>
                        <div className="glass p-8 rounded-3xl text-center">
                            <div className="text-4xl font-black text-purple-600 mb-2">AI</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Driven Search</div>
                        </div>
                        <div className="glass p-8 rounded-3xl text-center">
                            <div className="text-4xl font-black text-pink-600 mb-2">❤</div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Community Built</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
