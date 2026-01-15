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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-yellow-600">⚠️ Pending Approvals ({pendingMaterials.length})</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : pendingMaterials.length === 0 ? (
                        <p className="text-gray-500">No pending materials.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Subject</th>
                                        <th className="p-3">Type</th>
                                        <th className="p-3">Uploaded By</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingMaterials.map((m) => (
                                        <tr key={m.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{m.title}</td>
                                            <td className="p-3">{m.subject_offering} (ID)</td>
                                            {/* Ideally subject_offering should be expanded in serializer or fetched separately */}
                                            <td className="p-3 capitalize">{m.material_type}</td>
                                            <td className="p-3">{m.uploaded_by || "Anonymous"}</td>
                                            <td className="p-3 text-sm text-gray-500">{new Date(m.uploaded_at).toLocaleDateString()}</td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <a href={m.file} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                                                        View
                                                    </a>
                                                    <button
                                                        onClick={() => handleVerify(m.id)}
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                                    >
                                                        Approve
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
