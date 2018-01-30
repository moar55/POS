const Validator = use('Validator')

module.exports = {
  validateItems : async function (items, response) {
    const rules = {
      price: 'required',
      color: 'required|string',
      size: 'required|integer|range:16,38'
    }
    for (let item of items) {
      let validation =  await Validator.validate(item, rules)
      if (validation.fails()){
        return  new Promise(function(resolve, reject) {
          resolve({status: "error", type: "validation", validation_error: validation.messages()})
        });
      }
    }
  },
  paramsToJSON: (params) => {
    
  }
}
