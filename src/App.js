import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ViewPost from './pages/ViewPost'
import { Link } from 'react-router-dom'


const App = () => {
  
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  const posts = [
      {'id':'1', 
      'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
      'description': descr,
      'created_at': '2024-02-20 10:00:00.000000+00'},
      {'id':'2', 
      'title': 'Love Lock in Paris 🔒',
      'description':descr,
      'created_at': '2024-02-19 15:30:00.000000+00'},
      {'id':'3', 
      'title': 'Wear Pink on Fridays 🎀',
      'description':descr,
      'created_at': '2024-02-18 09:15:00.000000+00'},
      {'id':'4', 
      'title': 'Adopt a Dog 🐶',
      'description':descr,
      'created_at': '2024-02-17 14:45:00.000000+00'},
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/post/:id",
      element: <ViewPost />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>ChorusChat by George Jaffin z23651892</h1>
        <Link to="/"><button className="headerBtn"> Explore Posts   </button></Link>
        <Link to="/new"><button className="headerBtn"> Upload a Post  </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
