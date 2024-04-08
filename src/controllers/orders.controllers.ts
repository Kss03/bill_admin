
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
      let {rate_id, discount, table_number, people_number, opened, comment, order_cost, time_cost, product_cost, status} = req.body
      if (!status) status = 'open'
      if (!discount) discount = 0
      if (!people_number) people_number = 1
      if (!order_cost) order_cost = 0
      if (!time_cost) time_cost = 0
      if (!product_cost) product_cost = 0
      typeof product_cost
      const {rows} = await db.query(`INSERT INTO orders (
                    status, 
                    rate_id, 
                    discount, 
                    table_number, 
                    people_number, 
                    opened, 
                    comment, 
                    order_cost,
                    time_cost,
                    product_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`, [
                      status,
                      rate_id,
                      discount,
                      table_number,
                      people_number,
                      opened,
                      comment,
                      order_cost,
                      time_cost,
                      product_cost
      ])
      res.json(rows)
    } catch(e: any) {
      res.json(e)
    }
  }

  async addProductToOrder(req: any, res: any) {
    try{
      const {order_id, product_id, number} = req.body
      // SQL function in "model" file
      const {rows} = await db.query(`
        SELECT update_or_insert_ordered_products($1, $2, $3);
      `, [order_id, product_id, number]);
      res.json(rows)
    } catch (e) {
      console.log(e)
      res.json(e)
    }
  }

  async getOrderedProducts(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query(`
        SELECT
            ordered_products.order_id,
            ordered_products.product_id,
            ordered_products.number,
            product.name,
            product.barcode,
            product.price
        FROM ordered_products, product WHERE ordered_products.order_id = $1 AND ordered_products.product_id = product.id;
      `, [id])
      res.json(rows)
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }

  async getAllOrders(req: any, res: any) {
    try {
      if (req.query.status) {
        const {rows} = await db.query('SELECT * FROM orders WHERE status = $1', [req.query.status])
        res.json(rows)
        return
      }
      const {rows} = await db.query('SELECT * FROM orders')
      res.json(rows)
      return
    } catch (e: any) {
      res.json(new dbError(e.code, e.detail))
    }
  }
  async getOneOrder(req: any, res: any) {
    try {
      const {id} = req.params
      const {rows} = await db.query(`
        SELECT 
            orders.id, 
            orders.status, 
            orders.opened, 
            orders.closed, 
            orders.duration, 
            orders.rate_id, 
            orders.discount, 
            orders.table_number, 
            orders.people_number, 
            orders.order_cost, 
            orders.product_cost,
            orders.time_cost,
            orders.comment, 
            orders.pay_method,
            rates.name AS rate_name, 
            rates.price AS rate_price
        FROM orders, rates WHERE orders.id = $1 AND orders.rate_id = rates.id;
      `, [id])
      res.json(rows[0])
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
      let {id,
        closed,
        duration,
        rate_id,
        discount,
        table_number,
        people_number,
        order_cost,
        time_cost,
        product_cost,
        pay_method} = req.body
      const {rows} = await db.query(`
        UPDATE orders SET status = 'closed',
            closed = $1, 
            duration = $2, 
            rate_id = $3, 
            discount = $4, 
            table_number = $5,
            people_number = $6,
            order_cost = $7,
            time_cost = $8,
            product_cost = $9,
            pay_method = $10 WHERE id = $11 RETURNING *`, [
              closed,
              duration,
              rate_id,
              discount,
              table_number,
              people_number,
              order_cost,
              time_cost,
              product_cost,
              pay_method,
              id])
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