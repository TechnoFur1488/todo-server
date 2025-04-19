import { Task } from "../model/model.js"

class TodoController {

    async getAll(req, res) {
        const userId = req.user.id
        const tasks = await Task.findAll({ where: { userId } })
        return res.json(tasks)
    }

    async getOne(req, res) {
        const { id } = req.params
        const userId = req.user.id
        if (!id) {
            return res.status(404).json({ message: "Запись не найдена" })
        }
        try {
            const task = await Task.findOne({ where: { id, userId } })
            res.json(task)
        } catch (e) {
            res.status(500).json({ message: "Ошибка сервера" })
        }
    }

    async create(req, res) {
        const { name, title } = req.body
        const userId = req.user.id
        if (!name || !title) {
            return res.status(400).json({ message: "Некорректные данные" })
        }
        try {
            const createTodo = await Task.create({ name, title, userId })
            return res.json(createTodo)
        } catch (e) {
            if (e.name === "SequelizeValidationError") {
                return res.status(400).json({ message: "Слишком большой заголовок" })
            }
            return res.status(500).json({ message: "Ошибка сервера" });
        }

    }

    async update(req, res) {
        const { id } = req.params;
        const { name, title } = req.body;
        const userId = req.user.id
        if (!id) {
            return res.status(400).json({ message: "не найден" })
        }
        try {
            const task = await Task.update({ name, title }, { where: { id, userId } })
            if (task) {
                return res.json({ message: "Задача обновлена" })
            } else {
                return res.status(401).json({ message: "Запись не найдена" })
            }
        } catch (e) {
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }

    async remove(req, res) {
        const { id } = req.params
        const userId = req.user.id
        if (!id) {
            return res.status(400).json({ message: "Некорректные данные" })
        }
        try {
            const task = await Task.destroy({ where: { id, userId } })
            if (task) {
                return res.json({ message: "Задача удалена" })
            } else {
                return res.status(404).json({ message: "Запись не найдена" })
            }
        } catch (e) {
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }


}

export default new TodoController()
