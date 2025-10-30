import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Edit, Eye } from 'lucide-react';
import { API_URLS, getAuthHeaders } from '../config/api';

const AdminAboutEditor = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URLS.ABOUT_SECTIONS, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setSections(data.data || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des sections About:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      
      // Sauvegarder chaque section
      for (const section of sections) {
        if (section._id) {
          // Mise à jour
          await fetch(`${API_URLS.ABOUT_SECTIONS}/${section._id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(section)
          });
        } else {
          // Création
          await fetch(API_URLS.ABOUT_SECTIONS, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(section)
          });
        }
      }

      setMessage('Sections About sauvegardées avec succès !');
      setTimeout(() => setMessage(''), 3000);
      loadSections(); // Recharger les données
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const addSection = () => {
    const newSection = {
      sectionId: `section-${Date.now()}`,
      title: '',
      icon: 'Award',
      content: '',
      stats: '',
      image: '',
      order: sections.length + 1,
      isActive: true
    };
    setSections([...sections, newSection]);
    setEditingIndex(sections.length);
  };

  const removeSection = async (index) => {
    const section = sections[index];
    
    if (section._id) {
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`${API_URLS.ABOUT_SECTIONS}/${section._id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
    
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      // Mettre à jour l'ordre
      newSections.forEach((section, i) => {
        section.order = i + 1;
      });
      setSections(newSections);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Éditeur About</h1>
                <p className="text-sm text-gray-500">Modifier les sections de la page À propos</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('succès') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Actions */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Sections À propos</h2>
            <button
              onClick={addSection}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une section
            </button>
          </div>

          {/* Liste des sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">
                        {section.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{section.title || 'Nouvelle section'}</h3>
                      <p className="text-sm text-gray-500">ID: {section.sectionId} • Ordre: {section.order}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeSection(index)}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {editingIndex === index && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID de section
                        </label>
                        <input
                          type="text"
                          value={section.sectionId}
                          onChange={(e) => updateSection(index, 'sectionId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Titre
                        </label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icône
                        </label>
                        <input
                          type="text"
                          value={section.icon}
                          onChange={(e) => updateSection(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Statistiques
                        </label>
                        <input
                          type="text"
                          value={section.stats}
                          onChange={(e) => updateSection(index, 'stats', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contenu
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image (URL)
                      </label>
                      <input
                        type="url"
                        value={section.image}
                        onChange={(e) => updateSection(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`active-${index}`}
                          checked={section.isActive}
                          onChange={(e) => updateSection(index, 'isActive', e.target.checked)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`active-${index}`} className="ml-2 text-sm text-gray-700">
                          Actif
                        </label>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === sections.length - 1}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucune section configurée</p>
              <button
                onClick={addSection}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter la première section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAboutEditor;
