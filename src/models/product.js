const db = require('../db.js');

const Product = {
  fetch({ id }) {
    return db.select('*')
      .from('product')
      .where({ id })
      .then(rows => rows[0]);
  },

  fetchAll() {
    return db.select('*')
      .from('product');
  },

  create({ name, price, description, imageUrl } = {}) {
    if (!name || !price) {
      throw new Error('Missing properties');
    }

    return db
      .into('product')
      .insert({ name, price, description, imageUrl })
      .then(newId => this.fetch({ id: newId }));
  },

  update({ id, name, price, description, imageUrl } = {}) {
    if (!id) {
      throw new Error('Missing id');
    }
    return db
      .from('product')
      .update({ name, price, description, imageUrl })
      .where({ id })
      .then(() => this.fetch({ id }));
  },

  delete({ id } = {}) {
    if (!id) {
      throw new Error('Missing id');
    }
    return db
      .from('product')
      .where({ id })
      .delete();
  },
};

module.exports = Product;
