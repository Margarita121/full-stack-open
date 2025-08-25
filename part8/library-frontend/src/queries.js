import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
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
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_BOOK_GENRES = gql`
  query {
    allBooks {
      genres
      id
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genreToSearch: String) {
    allBooks(genre: $genreToSearch) {
      title
      published
      author {
        name
        id
      }
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const LOGGED_USER_FAV_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
  bookAdded {
    id
    title
    published
    genres
    }
  }
`
