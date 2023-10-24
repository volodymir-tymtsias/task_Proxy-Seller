import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const UsersTable = ({ users }) => {
  const [order, setOrder] = useState(null);

  const getClassNamesSort = () => {
    return classNames(
      'fas',
      {
        'fa-sort': order === null,
        'fa-sort-up': order === 'asc',
        'fa-sort-down': order === 'desc',
      },
    );
  };

  const onChangeOrder = () => {
    setOrder(currentOrder => {
      switch (currentOrder) {
        case 'asc':
          return 'desc';
      
        case null:
          return 'asc';
      
        default:
          return null;
      }
    })
  };

  const sortUsers = useMemo(() => {
    switch (order) {
      case 'asc':
        return [...users].sort((user1, user2) => user1.username.localeCompare(user2.username));

      case 'desc':
        return [...users].sort((user1, user2) => user2.username.localeCompare(user1.username));
    
      default:
        return users;
    }
  }, [order, users])

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          
          <th>
            <span 
              className="is-flex is-flex-wrap-nowrap is-clickable"
              onClick={onChangeOrder} 
              aria-label='button'
            >
              Username
              <span className="icon" >
                <i className={getClassNamesSort()} />
              </span>
            </span>
          </th>

          <th>E-mail</th>
          <th>Links to Posts</th>
          <th>Links to Albums</th>
        </tr>
      </thead>

      <tbody>
        {sortUsers.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <a href={`mailto: ${user.email}`} className="is-link">
                {user.email}
              </a>
            </td>
            <td>
              <Link to={`${user.id}/posts`}>
                {`${user.username} Posts`}
              </Link>
            </td>
            <td>
              <Link to={`${user.id}/albums`}>
                {`${user.username} Albums`}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
