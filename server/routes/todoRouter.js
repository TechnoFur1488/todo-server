import { Router } from "express"
import todoController from "../controllers/todoController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", authMiddleware, todoController.getAll)
router.get("/:id", authMiddleware, todoController.getOne)
router.post("/", authMiddleware, todoController.create)
router.put("/:id", authMiddleware, todoController.update)
router.delete("/:id", authMiddleware, todoController.remove)

export default router