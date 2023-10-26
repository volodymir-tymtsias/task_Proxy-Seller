import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Loader } from '../components/Loader';
import { getUsers } from '../api/api';
import { UsersTable } from '../components/UsersTable';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query')?.trim().toLowerCase();
  const [query, setQuery] = useState(appliedQuery || '');
  
  const visibleUsers = useMemo(() => (appliedQuery && users) 
   ? users.filter(
      user => user.username.toLowerCase().includes(appliedQuery)
    )
   : users, [appliedQuery, users]);

   const setQuerySearchParams = (value) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { query: value || null },
      ),
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ApplyQuery = useCallback(debounce(setQuerySearchParams, 500), []);

  const handleQueryChange = ({ target }) => {
    setQuery(target.value);
    ApplyQuery(target.value);
  }

  useEffect(() => {
    setIsErrorLoading(false);
    setIsLoading(true);
    getUsers()
      .then(loadedUsers => {
        setUsers(loadedUsers);
      })
      .catch(() => setIsErrorLoading(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">Users:</h1>

      <div className="box">
        <div className="field">
          <label htmlFor="search-query" className="label">
            Search usernames
          </label>

          <div className="control">
            <input
              type="search"
              id="search-query"
              className="input"
              placeholder="Enter a search query"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
        </div>
      </div>
      
      <div className="box table-container">
        {isLoading && <Loader />}

        {isErrorLoading && (
          <p className="has-text-danger">
            Something went wrong
          </p>
        )}

        { users && !users.length && !isLoading && !isErrorLoading && (
          <p>
            There are no users on the server
          </p>
        )}

        { users && !visibleUsers.length && !isLoading && !isErrorLoading && (
          <p>
            No users found with the specified username
          </p>
        )}
        
        {users
          && !!visibleUsers.length
          && <UsersTable users={visibleUsers}/>}
      </div>
    </>
  );
};
