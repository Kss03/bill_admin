
import {Router} from 'express'
import RatesControllers from "../controllers/rates.controllers";
const router = Router()

router.post('/rates', RatesControllers.createRate)
router.get('/rates', RatesControllers.getAllRates)
router.get('/rates/:id', RatesControllers.getOneRate)
router.put('/rates', RatesControllers.updateRate)
router.delete('/rates', RatesControllers.deleteRate)

export default router