import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Loader } from '../components/Loader';
import { getUsers } from '../api/api';
import { UsersTable } from '../components/UsersTable';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  
  const visibleUsers = useMemo(() => appliedQuery 
   ? users.filter(
      user => user.username.toLowerCase().includes(appliedQuery.trim().toLowerCase())
    )
   : users, [appliedQuery, users]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ApplyQuery = useCallback(debounce(setAppliedQuery, 500), []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    ApplyQuery(event.target.value);
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
              type="text"
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
