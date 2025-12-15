import Page from '../models/Page.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

// Récupérer toutes les pages (admin)
export const getAllPages = asyncHandler(async (req, res) => {
  const pages = await Page.find({ isActive: true })
    .select('-content')
    .sort({ updatedAt: -1 });
  
  sendSuccess(res, 'Pages récupérées avec succès', pages);
});

// Récupérer une page par slug (public)
export const getPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  
  const page = await Page.findOne({ 
    slug, 
    isActive: true 
  });
  
  if (!page) {
    return sendNotFound(res, 'Page non trouvée');
  }
  
  sendSuccess(res, 'Page récupérée avec succès', page);
});

// Récupérer une page par ID (admin)
export const getPageById = asyncHandler(async (req, res) => {
  const page = await Page.findById(req.params.id);
  
  if (!page) {
    return sendNotFound(res, 'Page non trouvée');
  }
  
  sendSuccess(res, 'Page récupérée avec succès', page);
});

// Créer une nouvelle page (admin)
export const createPage = asyncHandler(async (req, res) => {
  const { slug, title, content, metaDescription, metaKeywords } = req.body;
  
  // Vérifier si la page existe déjà
  const existingPage = await Page.findOne({ slug });
  if (existingPage) {
    return sendError(res, 'Une page avec ce slug existe déjà', 400);
  }
  
  const page = new Page({
    slug,
    title,
    content: content || '',
    metaDescription,
    metaKeywords,
    modifiedBy: req.user._id
  });
  
  await page.save();
  
  sendCreated(res, 'Page créée avec succès', page);
});

// Mettre à jour une page (admin)
export const updatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { title, content, metaDescription, metaKeywords, isActive } = req.body;
  
  const page = await Page.findOneAndUpdate(
    { slug },
    {
      title,
      content,
      metaDescription,
      metaKeywords,
      isActive: isActive !== undefined ? isActive : true,
      modifiedBy: req.user._id
    },
    { new: true, runValidators: true }
  );
  
  if (!page) {
    return sendNotFound(res, 'Page non trouvée');
  }
  
  sendSuccess(res, 'Page mise à jour avec succès', page);
});

// Supprimer une page (admin)
export const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findByIdAndDelete(req.params.id);
  
  if (!page) {
    return sendNotFound(res, 'Page non trouvée');
  }
  
  sendSuccess(res, 'Page supprimée avec succès');
});

// Dupliquer une page (admin)
export const duplicatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { newSlug, newTitle } = req.body;
  
  const originalPage = await Page.findOne({ slug });
  if (!originalPage) {
    return sendNotFound(res, 'Page originale non trouvée');
  }
  
  // Vérifier si la nouvelle page existe déjà
  const existingPage = await Page.findOne({ slug: newSlug });
  if (existingPage) {
    return sendError(res, 'Une page avec ce slug existe déjà', 400);
  }
  
  const newPage = new Page({
    slug: newSlug,
    title: newTitle || originalPage.title,
    content: originalPage.content,
    metaDescription: originalPage.metaDescription,
    metaKeywords: originalPage.metaKeywords,
    modifiedBy: req.user._id
  });
  
  await newPage.save();
  
  sendCreated(res, 'Page dupliquée avec succès', newPage);
});













