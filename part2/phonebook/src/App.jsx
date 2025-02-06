import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (newName && newNumber) {
      persons.some((person) => person.name === personObject.name)
        ? alert(`${personObject.name} name is already added to phonebook`)
        : setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert("Enter both name and number");
    }
  };

  const contactsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  const handleInputFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleInputFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleInputNameChange}
        numberValue={newNumber}
        numberOnChange={handleInputNumberChange}
      />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} />
    </div>
  );
};

export default App;
