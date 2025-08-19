/* eslint-disable react/prop-types */
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
    },

    update: (cache, { data: { addBook } }) => {
      // cache.updateQuery doens't work if the new book contains mutliple genres
      // instead using writeFragment allows to write book into cache as a normalized entity
      const newBookRef = cache.writeFragment({
        data: addBook,
        fragment: gql`
          fragment NewBook on Book {
            id
            title
            published
            genres
            author {
              id
              name
              born
              bookCount
            }
          }
        `,
      });

      cache.modify({
        fields: {
          allBooks(existingBookRefs = []) {
            if (
              existingBookRefs.some((ref) => ref.__ref === newBookRef.__ref)
            ) {
              return existingBookRefs;
            }
            return [...existingBookRefs, newBookRef];
          },
        },
      });

      const newAuthorRef = cache.writeFragment({
        data: addBook.author,
        fragment: gql`
          fragment NewAuthor on Author {
            id
            name
            born
            bookCount
          }
        `,
      });

      cache.modify({
        fields: {
          allAuthors(existingAuthorRefs = []) {
            if (
              existingAuthorRefs.some((ref) => ref.__ref === newAuthorRef.__ref)
            ) {
              return existingAuthorRefs;
            }
            return [...existingAuthorRefs, newAuthorRef];
          },
        },
      });
    },
  });
  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, published: Number(published), author, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
