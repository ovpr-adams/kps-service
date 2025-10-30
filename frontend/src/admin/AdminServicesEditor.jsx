import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Trash2, Edit, ArrowLeft } from 'lucide-react';
import { API_URLS, getAuthHeaders } from '../config/api';

const emptyService = {
  title: '',
  slug: '',
  category: 'autre',
  description: '',
  shortDescription: '',
  features: [],
  pricing: { startingPrice: 0, unit: 'sur-devis' },
  image: '',
  isActive: true,
  order: 0
};

const AdminServicesEditor = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [draft, setDraft] = useState(emptyService);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URLS.SERVICES, { headers: getAuthHeaders() });
      const data = await res.json();
      if (res.ok) setServices(data.data || []);
    } catch (e) {
      console.error('Erreur chargement services:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const startCreate = () => {
    setSelectedIndex(-1);
    setDraft({ ...emptyService });
  };

  const startEdit = (index) => {
    setSelectedIndex(index);
    const s = services[index];
    setDraft({
      title: s.title || '',
      slug: s.slug || '',
      category: s.category || 'autre',
      description: s.description || '',
      shortDescription: s.shortDescription || '',
      features: Array.isArray(s.features) ? s.features : [],
      pricing: s.pricing || { startingPrice: 0, unit: 'sur-devis' },
      image: s.image || '',
      isActive: s.isActive !== false,
      order: s.order || 0,
      _id: s._id
    });
  };

  const save = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const method = draft._id ? 'PUT' : 'POST';
      const url = draft._id ? `${API_URLS.SERVICES}/${draft._id}` : API_URLS.SERVICES;
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(draft)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de sauvegarde');
      setMessage('Service sauvegardé');
      await loadServices();
      setDraft(emptyService);
      setSelectedIndex(-1);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (index) => {
    const s = services[index];
    if (!s?._id) return;
    if (!window.confirm('Supprimer ce service ?')) return;
    try {
      const res = await fetch(`${API_URLS.SERVICES}/${s._id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Suppression impossible');
      await loadServices();
      if (selectedIndex === index) {
        setDraft(emptyService);
        setSelectedIndex(-1);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/admin/dashboard')} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </button>
        <div className="text-sm text-gray-600">{message}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Services</h2>
            <button onClick={startCreate} className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm">
              <Plus className="w-4 h-4 mr-2" /> Nouveau
            </button>
          </div>
          {isLoading ? (
            <div className="text-sm text-gray-500">Chargement…</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {services.map((s, idx) => (
                <li key={s._id || idx} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.slug} • {s.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(idx)} className="p-2 rounded hover:bg-gray-50"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => remove(idx)} className="p-2 rounded hover:bg-gray-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">{draft._id ? 'Modifier le service' : 'Nouveau service'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Catégorie</label>
              <select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })} className="w-full border rounded px-3 py-2">
                <option value="nettoyage-industriel">Nettoyage industriel</option>
                <option value="lavage-vitres">Lavage de vitres</option>
                <option value="entretien-bureaux">Entretien bureaux</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ordre</label>
              <input type="number" value={draft.order} onChange={e => setDraft({ ...draft, order: Number(e.target.value) })} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} className="w-full border rounded px-3 py-2" rows={4} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Résumé</label>
              <input value={draft.shortDescription} onChange={e => setDraft({ ...draft, shortDescription: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Caractéristiques (séparées par \",\")</label>
              <input value={draft.features.join(', ')} onChange={e => setDraft({ ...draft, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prix de départ</label>
              <input type="number" value={draft.pricing?.startingPrice || 0} onChange={e => setDraft({ ...draft, pricing: { ...(draft.pricing || {}), startingPrice: Number(e.target.value) } })} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Unité</label>
              <select value={draft.pricing?.unit || 'sur-devis'} onChange={e => setDraft({ ...draft, pricing: { ...(draft.pricing || {}), unit: e.target.value } })} className="w-full border rounded px-3 py-2">
                <option value="heure">heure</option>
                <option value="jour">jour</option>
                <option value="m²">m²</option>
                <option value="projet">projet</option>
                <option value="sur-devis">sur-devis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image (URL)</label>
              <input value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex items-center gap-2">
              <input id="active" type="checkbox" checked={draft.isActive} onChange={e => setDraft({ ...draft, isActive: e.target.checked })} />
              <label htmlFor="active" className="text-sm">Actif</label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button disabled={isSaving} onClick={save} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">
              <Save className="w-4 h-4 mr-2" /> Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminServicesEditor;


