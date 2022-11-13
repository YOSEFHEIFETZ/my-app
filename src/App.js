import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componets/login'
import Home from './componets/home'
import Info from './componets/Info';
import Todos from './componets/todos';
import Posts from './componets/posts'
import Post from './componets/post'
import Comments from './componets/comments';
import Albums from './componets/albums'
import Album from './componets/album'
import Error from './componets/error'
function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="info" element={<Info />} />
            <Route path='albums' element={<Albums />} />
            <Route path='albums/album/:albumId' element={<Album />} />
            <Route path='todos' element={<Todos />} />
            <Route path='posts' element={<Posts />} >
              <Route path='post/:postId' element={<Post />} >
                <Route path='comments' element={<Comments />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
