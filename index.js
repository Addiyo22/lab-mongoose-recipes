const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const newRecipe = {
  title : "Chicken Tandoori",
  level : "Amateur Chef",
  ingredients : ['chicken', 'garam masala'],
  cuisine : "Indian",
  dishType : 'snack',
  image : "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 30,
  creator:  "aditya"
}

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
    return Recipe.create(newRecipe)
  })
  .then (recipe => {
    console.log(`Recipe created: ${recipe.title}`)
  })
  .then (() => {
    return Recipe.insertMany(data)
  })
  .then (() => {
    return Recipe.findOneAndUpdate(
      {title : 'Rigatoni alla Genovese'},
      {duration : 100}
  )})
  .then (() => {
    return Recipe.deleteOne(
      {title: "Carrot Cake"}
    )
  })
  .then (() => {
    return mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
