import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

//merge together notifciation and error, separate them only by style?

const Notification = ({ message }) => {
  if (message == null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const Error = ({ message }) => {
  if (message == null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingPerson = persons.find((p) => p.name === personObject.name);
    // if person is already added there is option to update number
    if (existingPerson) {
      console.log(`There is existing person ${existingPerson.name}`);
      console.log(`updated number ${personObject.number}`);
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = {
          ...existingPerson,
          number: personObject.number,
        };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setNotification(`Updated '${personObject.name}'`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setError(
              `Information of '${personObject.name}' has already been removed from server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification(`Added '${personObject.name}'`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService.deleteById(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
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
      <Notification message={notification} />
      <Error message={error} />
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
      <Persons contactsToShow={contactsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
