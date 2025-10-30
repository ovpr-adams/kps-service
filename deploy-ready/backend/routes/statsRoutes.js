import express from 'express';
import { getAllStats, createStat, updateStat, deleteStat } from '../controllers/statsController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllStats);
router.post('/', authenticateAdmin, createStat);
router.put('/:id', authenticateAdmin, updateStat);
router.delete('/:id', authenticateAdmin, deleteStat);

export default router;


