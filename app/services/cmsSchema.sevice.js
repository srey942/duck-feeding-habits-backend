const contentful = require('contentful');
const { spaceId } = require('../../config');
const { token } = require('../../config');

const client = contentful.createClient({
  space: spaceId,
  accessToken: token,
});
class CMSSchema {
  init = async () => {
    const entries = await client.getEntries(
      Object.assign({
        content_type: 'formFields',
      }),
    );
    let schema = {};
    for (let item of entries.items) {
      let field = item.fields;

      schema[field.fieldName] = 'string';
    }
    console.log('Return schema', schema);
    this.duckFoodHabitsSchema = schema;
    this.contentEntries = entries;
  };

  getSchema = () => {
    return this.duckFoodHabitsSchema;
  };

  getEntries = () => {
    return this.contentEntries;
  };

  validateForm = (formValues) => {
    for (let item of this.contentEntries.items) {
      for (let val of item.fields.validator) {
        switch (val) {
          case 'required':
            if (formValues[item.fields.fieldName] == undefined) {
              console.log('required case');
              return false;
            }
            break;
          case 'string':
            if (!formValues[item.fields.fieldName].match('[A-Za-z]+')) {
              console.log('string case');
              return false;
            }
            break;
          case 'number':
            if (!formValues[item.fields.fieldName].match('[0-9]+')) {
              console.log('number case');
              return false;
            }
            break;
        }
      }
    }
    return true;
  };
}

module.exports = CMSSchema;
