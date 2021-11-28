const subjects =require('./_data/subjectData');
const Subjects = require('./models/Subjects');


const DefaultData = async() => {
    try{
        await Subjects.deleteMany({})
        await Subjects.insertMany(subjects)
        console.log("subjects sucessfully sent");
    }

    catch (error){
        console.log(error);
    }
}
module.exports=DefaultData;