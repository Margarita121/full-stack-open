/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { gql, useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { LOGGED_USER_FAV_GENRE, BOOK_ADDED } from "./queries";

const Notify = ({ errorMessage, notifMessage }) => {
  if (errorMessage){
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  }
  if (notifMessage){
    return <div style={{ color: "green" }}>{notifMessage}</div>;
  }
  return null
};

const App = () => {
  const userFavGenreQueryResult = useQuery(LOGGED_USER_FAV_GENRE, {});
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [genreToSearch, setGenreToSearch] = useState(null);
  const client = useApolloClient();
  
  const notify = (errorMessage = null, notifMessage = null) => {
    if (errorMessage) {
    setErrorMessage(errorMessage);
    setNotifMessage(null); 
    setTimeout(() => setErrorMessage(null), 5000);
  } else if (notifMessage) {
    setNotifMessage(notifMessage);
    setErrorMessage(null);
    setTimeout(() => setNotifMessage(null), 5000);
  }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(data)
      notify(null,`New book added ${addedBook.title}`)
      const newBookRef = client.cache.writeFragment({
              data: addedBook,
              fragment: gql`
                fragment NewBook on Book {
                  id
                  title
                  published
                  genres
                }
              `,
            });
      client.cache.modify({
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
    }
  })

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("library-user-token");
    if (loggedUserToken) {
      setToken(loggedUserToken);
    }
  }, []);

  

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  if (userFavGenreQueryResult.loading) {
    return <div>loading...</div>;
  }

  const loggedUserFavGenre = userFavGenreQueryResult.data.me.favoriteGenre;
  // const loggedUserFavGenre = null

  const onClickRecommend = () => {
    setGenreToSearch(loggedUserFavGenre);
    setPage("books");
  };

  const onClickBooks = () => {
    setGenreToSearch(null);
    setPage("books");
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} notifMessage={notifMessage}/>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={onClickBooks}>books</button>
        <button onClick={onClickRecommend}>recommend</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} token={token} setError={notify} />
      <Books
        show={page === "books"}
        genreToSearch={genreToSearch}
        setGenreToSearch={setGenreToSearch}
      />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
