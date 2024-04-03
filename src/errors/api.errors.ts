class ApiError extends Error {
  status: number
  message: string
	constructor(status: number, message: string) {
		super(); //вызов родительского конструктора
		// and assign recieved value
		this.status = status;
		this.message = message;
	}

	static badRequest(message: string) {
		//here we return the new object ApiError at first parameter is the status-code
		//second parameter is message
		return new ApiError(400, message);
	}

	static internal(message: string) {
		return new ApiError(500, message);
	}

	static forbitten(message: string) {
		return new ApiError(403, message);
		// 403 - no access(нет доступа)
	}
}

export default ApiError;
