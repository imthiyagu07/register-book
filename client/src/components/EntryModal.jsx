import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';

const EntryModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        opening: 0,
        receipts: 0,
        issue: 0,
        waste: 0,
        outside: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                date: new Date(initialData.date).toISOString().split('T')[0]
            });
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                opening: 0,
                receipts: 0,
                issue: 0,
                waste: 0,
                outside: 0,
            });
        }
    }, [initialData, isOpen]);

    const calculateTotals = (data) => {
        const opening = Number(data.opening) || 0;
        const receipts = Number(data.receipts) || 0;
        const issue = Number(data.issue) || 0;
        const waste = Number(data.waste) || 0;
        const outside = Number(data.outside) || 0;

        const total = opening + receipts;
        const closing = total - issue - waste - outside;

        return { ...data, total, closing };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'date' ? value : Number(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(calculateTotals(formData));
    };

    if (!isOpen) return null;

    const currentStats = calculateTotals(formData);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {initialData ? 'Edit Entry' : 'New Register Entry'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Date Section */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Income Section */}
                        <div className="space-y-4 rounded-xl bg-emerald-50/50 p-4 border border-emerald-100">
                            <h3 className="font-medium text-emerald-800 text-sm uppercase tracking-wide">Inflow</h3>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Opening Stock</label>
                                <input
                                    type="number"
                                    name="opening"
                                    min="0"
                                    value={formData.opening}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Receipts</label>
                                <input
                                    type="number"
                                    name="receipts"
                                    min="0"
                                    value={formData.receipts}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="pt-2 border-t border-emerald-200 flex justify-between items-center">
                                <span className="text-sm font-medium text-emerald-900">Total</span>
                                <span className="text-lg font-bold text-emerald-700">{currentStats.total}</span>
                            </div>
                        </div>

                        {/* Outflow Section */}
                        <div className="space-y-4 rounded-xl bg-red-50/50 p-4 border border-red-100">
                            <h3 className="font-medium text-red-800 text-sm uppercase tracking-wide">Outflow</h3>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">Issue</label>
                                <input
                                    type="number"
                                    name="issue"
                                    min="0"
                                    value={formData.issue}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Waste</label>
                                    <input
                                        type="number"
                                        name="waste"
                                        min="0"
                                        value={formData.waste}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-600 mb-1">Outside</label>
                                    <input
                                        type="number"
                                        name="outside"
                                        min="0"
                                        value={formData.outside}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Projected Closing</span>
                            <span className="text-2xl font-bold text-indigo-600">{currentStats.closing.toLocaleString()}</span>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-95"
                        >
                            <FiSave size={18} />
                            <span>Save Entry</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EntryModal;
