let config = require("../../database.config");
// mongoose.connection.db.collection("formData").insertOne(formValues);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
console.log("schmea",global.duckFoodHabitsSchema);
var Test = mongoose.model("formData", new Schema(global.duckFoodHabitsSchema));


// Test.create(formValues);
const duckFeedHabitsService = {
  dbStore: async function (formValues) {
    try { 
      const store=new Test(formValues);
      await store.save(function (err,data){
        if(!err){
          console.log("asdasdsadasd",data);
        }
        console.log("asdasfqweqwe",err);
      });
    } catch (error) {
      console.log("error", error);
    }
  },
  dbGet: async function () {
    //const Form = mongoose.model("formData", Schema({..}));

    // var Test = mongoose.model("duckFeedHabits", new Schema(), "formData");
    return Test.find({}, function (err, docs) {
      if (!err) {
        console.log("data fom mongo", docs);
        return docs;
      } else {
        console.log("db call all", err);
        return err;
      }
    });

    // await mongoose.connection.db.collection("").find({});
  },
};

module.exports = duckFeedHabitsService;
