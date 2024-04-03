
import db from '../db/db'
import dbError from "../errors/db.errors";
import {query} from "express";

class OrdersController {

  // ПОПРАВИТЬ !!!!!!!!!!!!!!
  orderOpen: string
  orderClosed: string
  constructor() {
    this.orderOpen = 'open'
    this.orderClosed = 'closed'
  }

  async createOrder(req: any, res: any) {
    try {
      let {rate_id, discount, table_number, people_number, opened} = req.body
      if (!discount) discount = 0
      if (!people_number) people_number = 1
      const {rows} = await db.query('INSERT INTO orders (status, opened, rate_id, discount, table_number, people_number) VALUES ($1, $6, $2, $3, $4, $5) returning *', ['open', rate_id, discount, table_number, people_number, opened])
      res.json(rows)
    } catch(e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getAllOrders(req: any, res: any) {
    try {
      const {rows} = await db.query('SELECT * FROM orders')
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getOneOrder(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query('SELECT * FROM orders WHERE id = $1', [id])
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async updateOrder(req: any, res: any) {
    try {
      let {rate_id, discount, table_number, people_number, id} = req.body
      if (!discount) discount = 0
      if (!people_number) people_number = 1
      const {rows} = await db.query('UPDATE orders SET rate_id = $1, discount = $2, table_number = $3, people_number = $4 WHERE id = $5 RETURNING *', [rate_id, discount, table_number, people_number, id])
      res.json(rows)
    } catch(e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async closeOrder(req: any, res: any) {
    try {
      let {id, closed, duration, rate_id, discount, table_number, people_number, order_cost} = req.body
      const {rows} = await db.query(`
        UPDATE orders SET status = 'closed',
            closed = $1, 
            duration = $2, 
            rate_id = $3, 
            discount = $4, 
            table_number = $5,
            people_number = $6,
            order_cost = $7 WHERE id = $8 RETURNING *`, [closed, duration, rate_id, discount, table_number, people_number, order_cost, id])
      res.json(rows[0])
    } catch (e: any) {
      console.log(e)
      res.json(new dbError(e.code, e.detail))
    }
  }
  async deleteOrder(req: any, res: any) {
    try {
      const {id} = req.query
      const {rows} = await db.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id])
      res.json(rows[0])
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
}

export default new OrdersController()