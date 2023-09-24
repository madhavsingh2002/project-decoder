const mongoose = require('mongoose')
const connectToMongodb = async()=>{
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/project-decode-2');
    res && console.log('connect to database..')
}
// export this function
module.exports = connectToMongodb;