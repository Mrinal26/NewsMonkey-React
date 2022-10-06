import Navbar from './components/Navbar'
import React, { Component } from 'react'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={100} />
        <Routes>
          <Route exact path="/" element={<News  key="general" pagesize={6} country="in" category="general" />}/>
          <Route exact path="/Business" element={<News  key="Business" pagesize={6} country="in" category="Business" />}/>
          <Route exact path="/Entertainment" element={<News  key="Entertainment" pagesize={6} country="in" category="Entertainment" />}/>
          <Route exact path="/general" element={ <News  pagesize={6} key="general" country="in" category="general" />}/>
          <Route exact path="/Health" element= {<News  pagesize={6} key="Health" country="in" category="Health" />}/>
          <Route exact path="/Science" element={ <News  pagesize={6} key="Science" country="in" category="Science" />}/>
          <Route exact path="/Sports" element={<News  pagesize={6} key="Sports" country="in" category="Sports" />}/>
          <Route exact path="/Technology" element={<News  pagesize={6} key="Technology" country="in" category="Technology" />}/>
        </Routes>
        </Router>
      </div>
      
    )
  }
}

export default App
