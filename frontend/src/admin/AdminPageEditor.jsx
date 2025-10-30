import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { API_URLS, getAuthHeaders } from '../config/api';

const AdminPageEditor = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [pageData, setPageData] = useState({
    title: '',
    content: '',
    metaDescription: '',
    metaKeywords: '',
    isActive: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Pages prédéfinies
  const predefinedPages = [
    { slug: 'accueil', title: 'Page d\'accueil' },
    { slug: 'services', title: 'Nos services' },
    { slug: 'about', title: 'À propos' },
    { slug: 'contact', title: 'Contact' },
    { slug: 'references', title: 'Nos références' }
  ];

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      loadPageData(selectedPage);
    }
  }, [selectedPage]);

  const loadPages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URLS.PAGES, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setPages(data.data || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error);
    }
  };

  const loadPageData = async (slug) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URLS.PAGES}/${slug}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setPageData({
          title: data.data?.title || '',
          content: data.data?.content || '',
          metaDescription: data.data?.metaDescription || '',
          metaKeywords: data.data?.metaKeywords || '',
          isActive: data.data?.isActive !== false
        });
      } else {
        // Page n'existe pas encore, initialiser avec des valeurs par défaut
        setPageData({
          title: predefinedPages.find(p => p.slug === slug)?.title || '',
          content: '',
          metaDescription: '',
          metaKeywords: '',
          isActive: true
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    
    setIsSaving(true);
    setMessage('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URLS.PAGES}/${selectedPage}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(pageData)
      });
      
      if (response.ok) {
        setMessage('Page sauvegardée avec succès !');
        setTimeout(() => setMessage(''), 3000);
        loadPages(); // Recharger la liste des pages
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.message || 'Erreur de sauvegarde'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Erreur de connexion au serveur');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Ouvrir un nouvel onglet avec la page publique
    window.open(`http://localhost:5173/${selectedPage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Éditeur de pages</h1>
              <p className="mt-2 text-gray-600">Modifiez le contenu de votre site directement depuis cette interface</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Retour au tableau de bord
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Sélection des pages */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pages du site</h3>
              
              <div className="space-y-2">
                {predefinedPages.map((page) => (
                  <button
                    key={page.slug}
                    onClick={() => setSelectedPage(page.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPage === page.slug
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>

              {pages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pages personnalisées</h4>
                  <div className="space-y-1">
                    {pages
                      .filter(page => !predefinedPages.find(p => p.slug === page.slug))
                      .map((page) => (
                        <button
                          key={page._id}
                          onClick={() => setSelectedPage(page.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                            selectedPage === page.slug
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page.title}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content - Éditeur */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <div className="bg-white rounded-lg shadow">
                {/* Header de l'éditeur */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Édition de la page: {predefinedPages.find(p => p.slug === selectedPage)?.title || selectedPage}
                    </h2>
                    <div className="flex space-x-3">
                      <button
                        onClick={handlePreview}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Aperçu
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>
                  
                  {message && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      message.includes('succès') 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {message}
                    </div>
                  )}
                </div>

                {/* Formulaire d'édition */}
                <div className="p-6 space-y-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : (
                    <>
                      {/* Titre de la page */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre de la page
                        </label>
                        <input
                          type="text"
                          value={pageData.title}
                          onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Titre de la page"
                        />
                      </div>

                      {/* Éditeur de contenu */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu de la page
                        </label>
                        <div className="border border-gray-300 rounded-lg">
                          <MDEditor
                            value={pageData.content}
                            onChange={(val) => setPageData({ ...pageData, content: val || '' })}
                            height={400}
                          />
                        </div>
                      </div>

                      {/* SEO */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Description
                          </label>
                          <textarea
                            value={pageData.metaDescription}
                            onChange={(e) => setPageData({ ...pageData, metaDescription: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows="3"
                            placeholder="Description pour les moteurs de recherche"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Keywords
                          </label>
                          <input
                            type="text"
                            value={pageData.metaKeywords}
                            onChange={(e) => setPageData({ ...pageData, metaKeywords: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Mots-clés séparés par des virgules"
                          />
                        </div>
                      </div>

                      {/* Statut */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={pageData.isActive}
                          onChange={(e) => setPageData({ ...pageData, isActive: e.target.checked })}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                          Page active (visible sur le site)
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Sélectionnez une page</h3>
                  <p className="mt-1 text-sm text-gray-500">Choisissez une page dans la sidebar pour commencer l'édition.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageEditor;


