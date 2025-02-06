const Persons = ({ contactsToShow }) => {
  return (
    <div>
      {contactsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
