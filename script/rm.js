const rm = require('rimraf')
const path = require('path')


rm(path.resolve(__dirname,'../dist/'), err => {
  if (err) throw err
})