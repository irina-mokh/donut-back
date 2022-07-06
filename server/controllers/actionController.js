import { Action, Category } from '../db/models.js';

class ActionController {
  async getAll (req, res) {
    const { columnId } = req.body;
    let actions;
    if (!columnId) {
      actions = await Action.findAll();
    } else {
      actions = await Action.findAll({where: {columnId}});

    }

    return res.json(actions);
  }

  async getById () {
    
  }

  async create (req, res) {
    const { sum, from, to } = req.body;
    const action = await Action.create( { sum, from, to} );

    const catFrom = await Category.findByPk(from);
    const catTo = await Category.findByPk(to);
    
    if (catFrom.type === "income") {
      catFrom.total = catFrom.total + sum;
    } else {
      catFrom.total = catFrom.total - sum
    };

    catTo.total = catFrom.total + sum;
    
    await catFrom.save();
    await catTo.save();
    return res.json(action);
  }

  async edit () {
    
  }

  async delete () {
    
  }
}

export const actionController = new ActionController();