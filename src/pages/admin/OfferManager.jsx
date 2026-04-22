import { useEffect, useState } from 'react';
import { getOffers, createOffer, deleteOffer } from '../../services/api';

export default function OfferManager() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newOffer, setNewOffer] = useState({ title: '', description: '', image: '' });

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const data = await getOffers();
            setOffers(data);
        } catch (error) {
            console.error('Failed to fetch offers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddOffer = async (e) => {
        e.preventDefault();
        if (!newOffer.title.trim()) return;
        try {
            await createOffer(newOffer);
            setNewOffer({ title: '', description: '', image: '' });
            fetchOffers();
        } catch (error) {
            alert('Failed to add offer');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this offer?')) return;
        try {
            await deleteOffer(id);
            fetchOffers();
        } catch (error) {
            alert('Failed to delete offer');
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Campaign Command</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Execute and monitor global promotional events</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <form onSubmit={handleAddOffer} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-28">
                        <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight italic">Initialize Protocol</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Campaign Title</label>
                                <input required type="text" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner" placeholder="e.g. Summer Surge" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Deployment Summary</label>
                                <textarea value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner" rows="3" placeholder="Brief campaign overview..."></textarea>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Visual Asset (URL)</label>
                                <input type="text" value={newOffer.image} onChange={e => setNewOffer({...newOffer, image: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner" placeholder="https://..." />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
                                Deploy Campaign
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {offers.map((offer) => (
                            <div key={offer.id} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                                    {offer.image ? (
                                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="text-6xl group-hover:scale-110 transition-transform duration-700">🎁</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{offer.title}</h3>
                                        <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-1">Status: Active</div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium line-clamp-2">{offer.description}</p>
                                    <button onClick={() => handleDelete(offer.id)} className="w-full py-3 rounded-xl border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                        Terminate Protocol
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
