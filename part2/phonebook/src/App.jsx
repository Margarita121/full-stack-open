import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
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

  const handleInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange} />{" "}
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberChange} />{" "}
        </div>
        <div>
          <button type="submit">add</button>{" "}
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
