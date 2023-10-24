import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbums, getPosts, getUser } from '../api/api';
import { Loader } from '../components/Loader';

export const ListPage = ({ type }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [items, setItems] = useState(null);
  const [user, setUser] = useState(null);
  const getFunction = type === 'posts' ? getPosts : getAlbums;

  const backHandler = () => navigate(-1);
  
  useEffect(() => {
    setIsErrorLoading(false);
    setIsLoading(true);
    Promise.all([getUser(userId), getFunction(userId)])
      .then(([loadedUser, loadedPosts]) => {
        setUser(loadedUser);
        setItems(loadedPosts);
      })
      .catch(() => setIsErrorLoading(true))
      .finally(() => setIsLoading(false));
  }, [userId, getFunction]);
  
  return (
    <>
      <button
        className="button is-light mb-4"
        type="button"
        onClick={backHandler}
      >
        <span className="icon" >
          <i className="fa-solid fa-angle-left" />
        </span>
        <span>Back</span>
      </button>
      <div className="box">
        {user && (
          <h1 className="title">{`${user.username}'s ${type}:`}</h1>
        )}
        
        {isLoading && <Loader />}

        {isErrorLoading && (
          <p className="has-text-danger">
            Something went wrong
          </p>
        )}

        {items && items.map(item => (
          <article
            className="message is-small"
            key={item.id}
          >
            <div className="message-header">
              {item.title}
            </div>
            {item.body && (
              <div className="message-body">
                {item.body}
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
};
