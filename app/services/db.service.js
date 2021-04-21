let config = require('../../database.config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('schmea', cmsSchema.getSchema());
const FormData = mongoose.model('formData', new Schema(cmsSchema.getSchema()));

const duckFeedHabitsService = {
  dbStore: async function (formValues) {
    const store = new FormData(formValues);
    const data = await store.save();
  },
  dbGet: async function () {
    return await FormData.find({}, { _id: 0, __v: 0 });
  },
};

module.exports = duckFeedHabitsService;
