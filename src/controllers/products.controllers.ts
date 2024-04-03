
import db from '../db/db'
import dbError from "../errors/db.errors";

class ProductsController {
  async createProduct(req: any, res: any) {
    try {
      const {name, category_id, quantity, price} = req.body
      console.log(name, category_id, quantity, price)
      const {rows} = await db.query(`INSERT INTO product (name, category_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`, [name, category_id, quantity, price])
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getAllProducts(req: any, res: any) {
    try {
      const {rows} = await db.query(`SELECT * FROM product`)
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getOneProduct(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query(`SELECT * FROM product WHERE id = $1`, [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async updateProduct(req: any, res: any) {
    try {
      const {id, name, category_id, quantity, price} = req.body
      const {rows} = await db.query(`UPDATE product 
                SET name = $1, category_id = $2, quantity = $3, price = $4
               WHERE id = $5 RETURNING *`, [name, category_id, quantity, price, id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async deleteProduct(req: any, res: any) {
    try {
      const {id} = req.query
      const {rows} = await db.query('DELETE FROM product WHERE id = $1 RETURNING *', [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
}

export default new ProductsController()