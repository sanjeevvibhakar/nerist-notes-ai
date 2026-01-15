import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const [pendingMaterials, setPendingMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingMaterials();
    }, []);

    const fetchPendingMaterials = async () => {
        try {
            const response = await axios.get('admin/pending-materials/');
            setPendingMaterials(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pending materials:", error);
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        try {
            await axios.post(`admin/verify-material/${id}/`);
            alert("Material verified!");
            // Remove from list
            setPendingMaterials(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error("Verification failed:", error);
            alert("Verification failed.");
        }
    };

    const handleReseed = async () => {
        if (!window.confirm("CRITICAL: This will delete everything (including Q&A and Materials) and re-seed from CSV. Continue?")) return;

        setLoading(true);
        try {
            const res = await axios.post('admin/manual-seed/');
            alert(res.data.message);
            console.log("Seeding Logs:", res.data.logs);
            window.location.reload(); // Refresh to see clean data
        } catch (error) {
            console.error("Seeding failed:", error);
            alert("Seeding failed. Check console for logs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Terminal</h1>
                    <button
                        onClick={handleReseed}
                        className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
                    >
                        🚨 Fix Database Redundancies (Re-seed)
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-yellow-50 p-6 border-b border-yellow-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-yellow-800">⚠️ Pending Approvals ({pendingMaterials.length})</h2>
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-bold uppercase">Awaiting Action</span>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Processing...</div>
                    ) : pendingMaterials.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 font-medium">No pending materials to review.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 italic text-sm text-gray-500">
                                        <th className="p-4 font-semibold">Title</th>
                                        <th className="p-4 font-semibold">Subject & Sem</th>
                                        <th className="p-4 font-semibold">Type</th>
                                        <th className="p-4 font-semibold">Uploader</th>
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingMaterials.map((m) => (
                                        <tr key={m.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition">
                                            <td className="p-4">
                                                <p className="font-bold text-gray-800">{m.title}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">ID: {m.id}</p>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-medium text-gray-700">{m.subject_name}</p>
                                                <p className="text-xs text-gray-400">Semester {m.semester_num}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight text-gray-600">
                                                    {m.material_type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 font-medium">{m.uploaded_by || "Anonymous student"}</td>
                                            <td className="p-4 text-xs text-gray-400">{new Date(m.uploaded_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <a href={m.file} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase underline">
                                                        View
                                                    </a>
                                                    <button
                                                        onClick={() => handleVerify(m.id)}
                                                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm shadow-green-100"
                                                    >
                                                        APPROVE
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
