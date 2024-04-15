
import jwt from "jsonwebtoken";
import ApiError from "../errors/api.errors";

export default function (req: any, res: any, next: any) {
	if (req.method === "OPTIONS") {
		next();
	}
	
	try {
		if (!req.headers.authorization) {
			return res.status(400).json({ message: "User Not Authorized!" });
		}
		const token = req.headers.authorization.split(" ")[1]; // Bearer asdasdasdasd
		if (!token) {
			return res.status(400).json({ message: "User Not Authorized!!" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = decoded;
		next();
	} catch (e: any) {
		console.log(e);
		res.status(400).json(e.message);
	}
};
