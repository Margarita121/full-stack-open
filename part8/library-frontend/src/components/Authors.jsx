/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BirthyearForm from "./BirthyearForm";

const Authors = (props) => {
  const allAuthorsQueryResult = useQuery(ALL_AUTHORS, {});

  if (!props.show) {
    return null;
  }

  if (allAuthorsQueryResult.loading) {
    return <div>loading...</div>;
  }
  const authors = allAuthorsQueryResult.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm
        setError={props.notify}
        authors={authors}
        token={props.token}
      />
    </div>
  );
};

export default Authors;
