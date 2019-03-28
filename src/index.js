module.exports = {
  default: { ...require('./default') }, 
  extend: { ...require('./extend') }, 
  ...require('./creator'), 
  ...require('./hooks'), 
  ...require('./parser') 
}