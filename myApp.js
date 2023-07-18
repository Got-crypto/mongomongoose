require('dotenv').config();
const mongoose = require('mongoose')

const mongoUri = process.env.DATABASE_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(mongoUri, options)

const {Schema, model} = mongoose

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = model('Person', personSchema)

const handleCallbacks = (err, result, done) => {
  if(err) return console.error(err)

  done(null, result)
}

const createAndSavePerson = (done) => {
  const personDoc = new Person({name: "Deyvon Bennet", age: 26, favoriteFoods: ["Mozarrela", "Nsima", "Soda"]})

  personDoc.save((err, data) => handleCallbacks(err, data, done))

  
};

const manyPeople = [
  {
    name: 'Andrew Bogut',
    age: 55,
    favoriteFoods: ['Cereal', 'Meat', 'Banana']
  },
  {
    name: 'Evan Sharpnel',
    age: 32,
    favoriteFoods: ['Lasagna', 'Apple', 'Rice']
  },
  {
    name: 'Zoe Johnson',
    age: 28,
    favoriteFoods: ['Sandwich', 'Green Vegetables', 'Eggs']
  },
  {
    name: 'Matthew McClaren',
    age: 34,
    favoriteFoods: ['Toast', 'Mushrooms', 'Mangoes']
  },
  {
    name: 'Charlie Hamilton',
    age: 30,
    favoriteFoods: ['Spaghetti', 'Bacon', 'Lemons']
  },
]

const createManyPeople = (arrayOfPeople = manyPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => handleCallbacks(err, people, done))
};

const findPeopleByName = (personName, done) => {
  const personQuery = {name: personName}
  
  Person.find(personQuery, (err, results) => handleCallbacks(err, results, done))
};

const findOneByFood = (food, done) => {
  const personQuery = {
    favoriteFoods: food
  }
  
  Person.findOne(personQuery, (err, result) => handleCallbacks(err, result, done))
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, result) => handleCallbacks(err, result, done))
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) return console.error(err)

    person?.favoriteFoods?.push(foodToAdd)

    person.save((error, data) => handleCallbacks(error, data, done))
  })

};

const findAndUpdate = (personName, done) => {
  const personQuery = {
    name: personName
  }
  const ageToSet = 20;

  const ageQuery = {
    age: ageToSet
  }

  Person.findOneAndUpdate(personQuery, ageQuery, {new: true},(err, data) => handleCallbacks(err, data, done))
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => handleCallbacks(err, data, done))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const removeQuery = {
    name: nameToRemove
  }

  Person.remove(removeQuery, (err, response) => handleCallbacks(err, response, done))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const findQuery = {
    favoriteFoods: foodToSearch
  }

  Person.find(findQuery)
    .sort({name: 1})
    .limit(2)
    .select({name: 1, favoriteFoods: 1, age: 0})
    .exec((err, data) => handleCallbacks(err, data, done))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
