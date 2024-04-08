

export const getOrderCost = (opened: number, closed:number, discount:number, rate_price:number): number => {
  const out = Math.ceil((closed - opened) / (3600 * 1000)) * rate_price * ((100 - discount) / 100)
  return out
}