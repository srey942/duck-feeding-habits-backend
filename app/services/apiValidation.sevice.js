var contentful = require("contentful");

var client = contentful.createClient({
  space: environment.contentful.spaceId,
  accessToken: environment.contentful.token,
});

let validateAPI = function (formValues) {
  console.log("service method for api call ", this.formValues);
};

validateAPI.getSchema = async function () {
  try {
    const entries = await client.getEntries();
    let schema = {};
    for (let item of entries.items) {
      let field = item.fields;
      // schema[field.fieldName] =
      //   field.fieldType.toUpperCase() === "text".toUpperCase() ||
      //   field.fieldType.toUpperCase() === "time".toUpperCase()
      //     ? "string"
      //     : field.fieldType;
      schema[field.fieldName] = "string";
    }
    console.log("Return schema", schema);
    global.duckFoodHabitsSchema = schema;
    global.contentEntries = entries.item;
  } catch (error) {
    console.log(`Could not connect to contentful API: ${error}`);
    result(error, false);
  }
};

validateAPI.validateForm = async function (formValues, result) {
  if (!global.duckFoodHabitsSchema) {
    validateAPI.getSchema();
  }

  try {
    return client.getEntries().then(function (entries) {
      invalid = false;
      for (let item of entries.items) {
        // console.log(
        //   "values from controller ",
        //   formValues[item.fields.fieldName]
        // );

        for (let val of item.fields.validator) {
          //console.log("asd",val);
          switch (val) {
            case "required":
              //  console.log("required");
              if (formValues[item.fields.fieldName] == undefined) {
                console.log("required case");
                return false;
              }
              break;
            case "string":
              //  console.log("string");
              if (!formValues[item.fields.fieldName].match("[A-Za-z]+")) {
                console.log("string case");
                return false;
              }
              break;
            case "number":
              // console.log("number");
              if (!formValues[item.fields.fieldName].match("[0-9]+")) {
                console.log("number case");
                return false;
              }
              break;
          }
        }
      }
      return true;
    });
  } catch (error) {
    console.log(`Could not connect to contentful API: ${error}`);
    result(error, false);
  }
};
module.exports = validateAPI;
