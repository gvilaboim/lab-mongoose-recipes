const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe.create({
      title: "Cozido",
      level: "UltraPro Chef",
      ingredients: [ "pasta" , "tomatoes"],
      cuisine : "anything",
      dishType : "main_course",
      duration : 15,
      creator : "Gonçalo & Yinong"
      }).then(newRecipe => {
          console.log(newRecipe.title)   

  })


}).then(() => {

   return Recipe.insertMany( data );

  }).then((response) => {

    response.forEach(element => {
      console.log(element.title)
  })

  
  }).then(() => {



   
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  .then((res) => {

    console.log(res)
   })

  }).then(() => {
   return Recipe.deleteOne( { "title" :"Carrot Cake" } );
  }).then((res) =>{
    console.log(res)
  }).then(() => {
     mongoose.connection.close();
  }).then(() => {
    console.log("Database Shutdown!")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
