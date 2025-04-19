import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../model/model.js"

const generate = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: "24h"})
}
class UserContoller {
    async registration(req, res) {
        const {email, password, name} = req.body
        if(!email || !password || !name) {
            return res.status(400).json({message: "Некорректные данные"})
        }
        const candidat = await User.findOne({where: {email}})
        if (candidat) {
            return res.status(400).json({message: "Пользователь с таким email уже существует"})
        } 
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword})
        const token = generate(user.id, user.name, user.email)
        return res.json({token})
    }
    
    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(400).json({message: "Пользователь не найден"})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({message: "Неверный пароль"})
        }
        const token = generate(user.id, user.name, user.email)
        return res.json({token})
    }
}

export default new UserContoller()