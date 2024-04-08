
import db from '../db/db'
import dbError from "../errors/db.errors";

class ProductsController {
  async createProduct(req: any, res: any) {
    try {
      let {name, category_id, quantity, price, barcode} = req.body
      if (!quantity) quantity = 0
      const {rows} = await db.query(`INSERT INTO product (name, category_id, quantity, price, barcode) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, category_id, quantity, price, barcode])
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getAllProducts(req: any, res: any) {
    try {
      const {rows} = await db.query(`SELECT product.id AS id, product.name AS name, barcode, category_id, quantity, price, product_category.name AS category_name FROM product, product_category WHERE product.category_id = product_category.id`)
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
      res.status(200).json(rows[0])
    } catch (e: any) {
      res.status(400).json(new dbError(e.code, e.detail))
    }
  }
}

export default new ProductsController()