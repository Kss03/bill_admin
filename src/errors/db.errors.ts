
class dbError extends Error {
  private status: number;
  constructor(status: number, message: string) {
    super() //вызов родительского конструктора
    // and assign recieved value
    this.status = status
    this.message = message
  }

  static error(status: number, message: string): Error {
    return new dbError(status, message)
  }
}

export default dbError