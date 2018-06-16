describe('product model', () => {
  let Product, db;
  beforeEach(() => {
    jest.mock('../db.js', () => {
      const knex = require('knex');
      const mock = {};
      Object.keys(knex({ client: 'mysql' })).forEach(prop => {
        mock[prop] = jest.fn().mockReturnThis();
      });
      mock.then = jest.fn();
      return mock;
    });
    db = require('../db.js');
    Product = require('./product.js');
  });
  describe('fetch', () => {
    beforeEach(() => {
      db.where.mockReturnValueOnce(Promise.resolve(['some product']));
    });
    it('should fetch a single product', () => {
      expect.assertions(3);
      return Product.fetch({ id: 1 })
        .then(p => {
          expect(db.select).toHaveBeenCalledWith('*');
          expect(db.where).toHaveBeenCalledWith({ id: 1 });
          expect(p).toEqual('some product');
        });
    });
  });
  describe('fetchAll', () => {
    beforeEach(() => {
      db.from.mockReturnValueOnce(Promise.resolve(['prod1', 'prod2']));
    });
    it('should fetch all products', () => {
      expect.assertions(2);
      return Product.fetchAll()
        .then(p => {
          expect(p).toEqual(['prod1', 'prod2']);
          expect(db.select).toHaveBeenCalledWith('*');
        });
    });
  });
  describe('create', () => {
    describe('when input is valid', () => {
      let createdProd, input;
      beforeEach(() => {
        createdProd = { id: 2, name: 'prod', price: 1.2 };
        input = {
          name: 'prod',
          price: 1.2,
          description: 'some desc',
          imageUrl: 'some url',
        };
        db.insert.mockReturnValueOnce(Promise.resolve(1));
        jest.spyOn(Product, 'fetch').mockReturnValueOnce(Promise.resolve(createdProd));
      });
      it('should create a new product', () => {
        expect.assertions(2);
        return Product.create(input)
          .then(p => {
            expect(p).toBe(createdProd);
            expect(db.insert).toHaveBeenCalledWith(input);
          });
      });
    });
    describe('when input is invalid', () => {
      it('should throw an error when the name is missing', () => {
        expect.assertions(1);
        return expect(() => Product.create({ price: 1.2 })).toThrow('Missing properties');
      });
      it('should throw an error when the price is missing', () => {
        expect.assertions(1);
        return expect(() => Product.create({ name: 'name' })).toThrow('Missing properties');
      });
      it('should throw an error when both price and name are missing', () => {
        expect.assertions(1);
        return expect(() => Product.create()).toThrow('Missing properties');
      });
    });
  });
  describe('update', () => {
    describe('when input is valid', () => {
      let updatedProd, input;
      beforeEach(() => {
        updatedProd = { id: 3, name: 'prod', price: 1.2 };
        input = {
          name: 'prod',
          price: 1.2,
          description: 'some desc',
          imageUrl: 'some url',
        };
        db.where.mockReturnValueOnce(Promise.resolve());
        jest.spyOn(Product, 'fetch').mockReturnValueOnce(Promise.resolve(updatedProd));
      });
      it('should update the product', () => {
        expect.assertions(3);
        return Product.update({ id: 3, ...input })
          .then(p => {
            expect(p).toBe(updatedProd);
            expect(db.update).toHaveBeenCalledWith(input);
            expect(Product.fetch).toHaveBeenCalledWith({ id: 3 });
          });
      });
    });
    describe('when input is invalid', () => {
      it('should throw an error', () => {
        expect.assertions(1);
        return expect(Product.update).toThrow();
      });
    });
  });
  describe('delete', () => {
    describe('when input is valid', () => {
      let updatedProd, input;
      beforeEach(() => {
        input = { id: 4 };
        db.delete.mockReturnValueOnce(Promise.resolve());
      });
      it('should delete the product', () => {
        expect.assertions(3);
        return Product.delete({ id: 3, ...input })
          .then(p => {
            expect(p).toBe(undefined);
            expect(db.where).toHaveBeenCalledWith(input);
            expect(db.delete).toHaveBeenCalledTimes(1);
          });
      });
    });
    describe('when input is invalid', () => {
      it('should throw an error', () => {
        expect.assertions(1);
        return expect(Product.delete).toThrow('Missing id');
      });
    });
  });
});
