const Persons = ({ contactsToShow, deletePerson }) => {
  return (
    <div>
      {contactsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};
export default Persons;
