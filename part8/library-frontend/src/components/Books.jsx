/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOK_GENRES, ALL_BOOKS_BY_GENRE } from "../queries";

const CustomMenu = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    display: inline;
    margin: 0.25em;
  }
  padding: 0.5em 0em;
`;

const Books = ({ show, genreToSearch, setGenreToSearch }) => {
  const allBooksQueryResult = useQuery(ALL_BOOKS, {});
  const allBookGenresQueryResult = useQuery(ALL_BOOK_GENRES, {});
  const booksByGenreQueryResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genreToSearch },
    skip: !genreToSearch,
  });

  if (!show) {
    return null;
  }

  if (allBooksQueryResult.loading) {
    return <div>loading...</div>;
  }

  if (booksByGenreQueryResult.loading) {
    return <div>loading...</div>;
  }

  let books = allBooksQueryResult.data.allBooks;

  const allBookGenres = allBookGenresQueryResult.data.allBooks;
  const allGenres = allBookGenres.flatMap((book) => book.genres);
  const uniqueGenres = [...new Set(allGenres)];

  if (genreToSearch) {
    books = booksByGenreQueryResult.data.allBooks;
  } else {
    books = allBooksQueryResult.data.allBooks;
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {genreToSearch && (
          <>
            in genre <strong>{genreToSearch}</strong>
          </>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomMenu>
        <ul>
          {uniqueGenres.map((genre) => (
            <li key={genre}>
              <button onClick={() => setGenreToSearch(genre)}>{genre}</button>
            </li>
          ))}
          <li>
            <button onClick={() => setGenreToSearch(null)}>all genres</button>
          </li>
        </ul>
      </CustomMenu>
    </div>
  );
};

export default Books;
