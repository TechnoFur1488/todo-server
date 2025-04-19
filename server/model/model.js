import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Task = sequelize.define("task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false }
})

User.hasMany(Task)
Task.belongsTo(User)

export { User, Task }