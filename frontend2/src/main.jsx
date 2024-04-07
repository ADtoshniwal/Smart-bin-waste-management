import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
// import Contact from './components/Contact/Contact.jsx'

// import Github from './components/Github/Github.jsx'
import Marketplace from './components/Marketplace/Marketplace.jsx'
import Status from './components/Status/Status.jsx'
import Leaderboard from './components/Leaderboard/Leaderboard.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Community from './components/Community/Community.jsx'
// import Marketplace from './components/Marketplace/Marketplace.jsx'
// const router = createBrowserRouter([
//   {
//     path: '/' ,
//     element: <Layout /> ,
//     children : [
//       {
//         path : "",
//         element : <Home />
//       },
//       {
//         path : "about" ,
//         element : <About />
//       },
//       {
//         path : "contact" ,
//         element : <Contact />
//       }
//     ]
//   }
// ])

// ************************** METHOD 2 (MORE READABE AND EASYYYYY)*****************************

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />} />
      <Route path = 'marketplace' element={<Marketplace /> } /> 
      <Route path='/status' element={<Status />} />
      <Route path='/Leaderboard' element={<Leaderboard />} />
      <Route path='/Marketplace />' element={<Marketplace />} />
      <Route path='/Community' element={<Community />} />
      <Route path='about' element={<About />} /> 
      <Route path='dashboard' element={<Dashboard />} />
      
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
