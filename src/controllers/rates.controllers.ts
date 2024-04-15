
import db from '../db/db'
import dbError from '../errors/db.errors'

class RatesController {
  async createRate(req: any, res: any) {
    try {
      const {name, price} = req.body
      const {rows} = await db.query(`INSERT INTO rates (name, price) VALUES ($1, $2) RETURNING *`, [name, price])
      res.status(200).json(rows)
    } catch (e: any) {
      res.status(400).json(e.detail)
    }
  }
  async getAllRates(req: any, res: any) {
    try {
      const {rows} = await db.query(`SELECT * FROM rates`)
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getOneRate(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query(`SELECT * FROM rates WHERE id = $1`, [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async updateRate(req: any, res: any) {
    try {
      const {id, name, price} = req.body
      const {rows} = await db.query(`UPDATE rates SET name = $1, price = $2 WHERE id = $3 RETURNING *`, [name, price, id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async deleteRate(req: any, res: any) {
    try {
      const {id} = req.query
      const {rows} = await db.query('DELETE FROM rates WHERE id = $1 RETURNING *', [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
}

export default new RatesController()