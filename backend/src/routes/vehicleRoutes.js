import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/authMiddleware.js';
import { createVehicle, listVehicles, searchVehicles, updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle } from '../controllers/vehicleController.js';
const router = Router(); router.use(authenticate); router.get('/search', searchVehicles); router.get('/', listVehicles); router.post('/', requireAdmin, createVehicle); router.put('/:id', requireAdmin, updateVehicle); router.delete('/:id', requireAdmin, deleteVehicle); router.post('/:id/purchase', purchaseVehicle); router.post('/:id/restock', requireAdmin, restockVehicle); export default router;
