/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { LOGGED_USER_FAV_GENRE } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const userFavGenreQueryResult = useQuery(LOGGED_USER_FAV_GENRE, {});
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [genreToSearch, setGenreToSearch] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("library-user-token");
    if (loggedUserToken) {
      setToken(loggedUserToken);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

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
      <Notify errorMessage={errorMessage} />
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
