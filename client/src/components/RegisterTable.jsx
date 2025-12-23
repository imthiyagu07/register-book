import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const RegisterTable = ({ entries, onEdit, onDelete }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Opening</th>
                            <th className="px-6 py-4 text-right">Receipts</th>
                            <th className="px-6 py-4 text-right font-bold text-slate-700">Total</th>
                            <th className="px-6 py-4 text-right text-orange-600">Issue</th>
                            <th className="px-6 py-4 text-right text-red-600">Waste</th>
                            <th className="px-6 py-4 text-right text-blue-600">Outside</th>
                            <th className="px-6 py-4 text-right font-bold text-indigo-700">Closing</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <p>No entries found.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            entries.map((entry) => (
                                <tr
                                    key={entry._id}
                                    className="group transition-colors hover:bg-slate-50/80"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                                        {format(new Date(entry.date), 'dd MMM yyyy')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono">
                                        {entry.opening.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-emerald-600">
                                        +{entry.receipts.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono font-bold text-slate-800 bg-slate-50/50">
                                        {entry.total.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-orange-600">
                                        -{entry.issue.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-red-600">
                                        -{entry.waste.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono text-blue-600">
                                        -{entry.outside.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-mono font-bold text-indigo-700 bg-indigo-50/30">
                                        {entry.closing.toLocaleString()}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex justify-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => onEdit(entry)}
                                                className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                title="Edit"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(entry._id)}
                                                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisterTable;
