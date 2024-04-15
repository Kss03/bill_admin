
import {Router} from 'express'
import categoryControllers from "../controllers/category.controllers";
import authMiddleware from "../middleware/auth.middleware";
const router = Router()

router.post('/category', authMiddleware, categoryControllers.createCategory)
router.get('/category', authMiddleware, categoryControllers.getAllCategories)
router.get('/category/:id', authMiddleware, categoryControllers.getOneCategory)
router.put('/category', authMiddleware, categoryControllers.updateCategory)
router.delete('/category', authMiddleware, categoryControllers.deleteCategory)

export default router