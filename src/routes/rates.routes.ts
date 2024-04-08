
import {Router} from 'express'
import RatesControllers from "../controllers/rates.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router()

router.post('/rates', authMiddleware, RatesControllers.createRate)
router.get('/rates', authMiddleware, RatesControllers.getAllRates)
router.get('/rates/:id', authMiddleware, RatesControllers.getOneRate)
router.put('/rates', authMiddleware, RatesControllers.updateRate)
router.delete('/rates', authMiddleware, RatesControllers.deleteRate)

export default router