const mongoose= require('mongoose')
const url=`mongodb+srv://souhadmoussa86:Q5htD2Nk4pJ7EmFn@cluster0.xpatxqt.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)
main().catch((err) => console.log(err));
async function main() {
await mongoose.connect(url);
console.log("s")

}

const Schema = mongoose.Schema;
const moviesSchema = new Schema({
title:{
type: String ,
required:true

},
year :{
type: Number ,
required:true

},
rating :{
type: Number ,
required:true


}

});
module.exports = mongoose.model('Movie',moviesSchema)