
import {Router} from 'express'
import categoryControllers from "../controllers/category.controllers";
const router = Router()

router.post('/category', categoryControllers.createCategory)
router.get('/category', categoryControllers.getAllCategories)
router.get('/category/:id', categoryControllers.getOneCategory)
router.put('/category', categoryControllers.updateCategory)
router.delete('/category', categoryControllers.deleteCategory)

export default router