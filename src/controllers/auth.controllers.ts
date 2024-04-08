
import uuid from 'uuid'
import ApiError from '../errors/api.errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult} from 'express-validator'
import db from "../db/db";

const generateJwt = (login: string, role: string) => {
	const payload = {
		login: login,
		role: role,
	};
	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

class AuthController {
	async registration(req: any, res: any, next: any) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(new ApiError(400, "Register Error"));
			}

			const { login, password } = req.body;
			const role: string = "ADMIN";
			const hashPassword = bcrypt.hashSync(password, 7);
			const {rows} = await db.query(`INSERT INTO users (login, password, role) VALUES ($1, $2, (SELECT id FROM role WHERE $3 = name)) RETURNING *`, [login, hashPassword, role]);

			const token = generateJwt(login, role);
			return res.status(200).json({ token });
		} catch (e: any) {
			next(ApiError.badRequest(e.message));
		}
	}

	async login(req: any, res: any, next: any) {
		try {
			const { login, password } = req.body;
			const { rows } = await db.query(
				`SELECT login, password, name AS role_name FROM users, role
				WHERE login = $1 AND users.role = role.id;`,
				[login]
			);
			if (rows.length === 0) {
				res.status(400).json({message: "User with this name does not exist"});
				return
			}
			const user = rows[0];
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				res.status(400).json({message: "wrong password"});
				return
			}
			if (user.role_name != "ADMIN") {
				res.status(400).json({message: "no access rights"});
				return
			}
			const token = generateJwt(user.login, user.role_name);
			res.status(200).json({token, message: "success"})
			return
		} catch (e: any) {
			console.log(e)
			res.json(ApiError.badRequest(e))
			return
		}
	}

	async check(req: any, res: any, next: any) {
		//если middleware проверил и норм, то просто обновляем токен у пользователя
		const token = generateJwt(req.user.login, req.user.role);
		return res.json({ token });
	}
}

export default new AuthController()
