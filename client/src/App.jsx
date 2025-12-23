import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiBookOpen, FiActivity } from 'react-icons/fi';
import RegisterTable from './components/RegisterTable';
import EntryModal from './components/EntryModal';

// Configure Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

function App() {
    const [entries, setEntries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEntries = async () => {
        try {
            const response = await api.get('/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleAddEntry = () => {
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    const handleDeleteEntry = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await api.delete(`/entries/${id}`);
                fetchEntries();
            } catch (error) {
                console.error('Error deleting entry:', error);
                alert('Failed to delete entry');
            }
        }
    };

    const handleSaveEntry = async (entryData) => {
        try {
            if (editingEntry) {
                await api.put(`/entries/${editingEntry._id}`, entryData);
            } else {
                await api.post('/entries', entryData);
            }
            setIsModalOpen(false);
            fetchEntries();
        } catch (error) {
            console.error('Error saving entry:', error);
            alert('Failed to save entry. Please check the console for details.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-indigo-200 shadow-lg">
                                <FiBookOpen size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Register Book</h1>
                                <p className="text-xs text-slate-500 font-medium">Matchbox Production Co.</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                <FiActivity className="mr-1.5 h-3 w-3" />
                                Live System
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                {/* Actions Bar */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Daily Production Log</h2>
                        <p className="text-slate-500 mt-1">Manage and track your daily production metrics and flow.</p>
                    </div>
                    <button
                        onClick={handleAddEntry}
                        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95"
                    >
                        <FiPlus className="-ml-0.5 mr-2 h-5 w-5" />
                        New Entry
                    </button>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                            <p className="text-sm text-slate-500 font-medium">Loading entries...</p>
                        </div>
                    </div>
                ) : (
                    <RegisterTable
                        entries={entries}
                        onEdit={handleEditEntry}
                        onDelete={handleDeleteEntry}
                    />
                )}
            </main>

            {/* Modals */}
            <EntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEntry}
                initialData={editingEntry}
            />
        </div>
    );
}

export default App;