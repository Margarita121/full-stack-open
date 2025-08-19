import { gql } from "@apollo/client";

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
      title
      published
      genres
      author {
        name
        born
        bookCount
        id
      }
      id
    }
  }
`;

export const ALL_BOOK_GENRES = gql`
  query {
    allBooks {
      genres
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
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
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
