import { sequelize } from './index.js';
import { DataTypes } from "sequelize";

export const User = 
  sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {type: DataTypes.STRING},
})

export const Action = sequelize.define('action', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sum: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export const Category = sequelize.define('category', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['income', 'asset', 'expense']],
    },
  },
  start: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  name: { type: DataTypes.STRING, allowNull: false},
}, { 
  timestamps: false,
})

User.hasMany(Category);
Category.belongsTo(User);

Action.belongsTo(Category, {foreignKey: 'to'});
Action.belongsTo(Category, {foreignKey: 'from'});

