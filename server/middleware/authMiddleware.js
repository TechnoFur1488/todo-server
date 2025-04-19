import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    if (req === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: "Пользователь не авторизован" })
    }
}

export default authMiddleware