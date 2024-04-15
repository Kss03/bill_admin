
import db from '../db/db'
import dbError from '../Errors/db.errors'

class CategoryController {
  async createCategory(req: any, res: any) {
    try {
      const {name} = req.body
      const {rows} = await db.query(`INSERT INTO product_category (name) VALUES ($1) RETURNING *`, [name])
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getAllCategories(req: any, res: any) {
    try {
      const {rows} = await db.query(`SELECT * FROM product_category`)
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getOneCategory(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query(`SELECT * FROM product_category WHERE id = $1`, [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async updateCategory(req: any, res: any) {
    try {
      const {id, name} = req.body
      const {rows} = await db.query(`UPDATE product_category SET name = $1 WHERE id = $2 RETURNING *`, [name, id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async deleteCategory(req: any, res: any) {
    try {
      const {id} = req.query
      const {rows} = await db.query('DELETE FROM product_category WHERE id = $1 RETURNING *', [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
}

export default new CategoryController()