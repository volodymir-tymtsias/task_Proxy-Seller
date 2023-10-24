import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ListPage } from './pages/ListPage';

export const App = () => {
  return (
    <div className="app">
      <main className="section">
          <div className="container">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path=":userId/posts" element={<ListPage type='posts' />} />
                <Route path=":userId/albums" element={<ListPage type='albums' />} />
              </Route>
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
    </div>
  );
};
