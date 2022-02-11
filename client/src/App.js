import Home from './components/home/Home';
// import About from './components/about/About';
import Error from './components/error/Error';
import Header from './components/header/Header';
import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import AddArticle from './components/addArticle/AddArticle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from "react";
import { Context } from './context/Context';
import SingleArticle from './components/article/SingleArticle';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/add-article" element={user ? <AddArticle /> : <Signup />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={user ? <Home /> : <Signup />} />
          <Route path="/article/:articleId" element={<SingleArticle />} />
          <Route path="*" element={<Error />} />

        </Routes>
      </div>
    </Router >
  );
}

export default App;
