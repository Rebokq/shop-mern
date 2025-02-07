const Category = require('../models/category')
const Sub = require('../models/sub')

const slugify = require('slugify')

exports.create = async (req, res) => {
    try {

        const { name } = req.body
        const category = await new Category({ name, slug: slugify(name) }).save()
        res.json(category)

    } catch (err) {

        res.status(400).send('Create category failed')
    }

}

exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec())
}

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec()
    res.json(category)
}

exports.update = async (req, res) => {
    const { name } = req.body
    try {
        updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true })
        res.json(updated)

    } catch (err) {
        res.status(400).send('Caregory Update failed')
    }
}

exports.remove = async (req, res) => {

    try {

        const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
        res.json(deleted)

    } catch (err) {
        res.status(400).send('Delete category failed')

    }
}

exports.getSubs = async (req, res) => {
    try {
      const subs = await Sub.find({ parent: req.params._id }).exec();
      res.json(subs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des sous-catégories.' });
    }
  };
  
