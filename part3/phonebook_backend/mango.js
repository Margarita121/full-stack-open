const mongoose = require('mongoose')

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]

const url = `mongodb+srv://margaritad1212:${password}@cluster0.z49ui.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: inputName,
  number: inputNumber,
})

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else {
  person.save().then(() => {
    console.log(`added ${inputName} number ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
}
