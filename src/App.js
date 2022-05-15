import './App.css';
import Header from "./Components/Header/Header"
import LabelBottomNavigation from "./Components/Navbar/MainNav"
import {  Routes, Route } from "react-router-dom"
import Container from "./Container"
import Trending from "./Pages/Trending"
import Movies from "./Pages/Movies"
import Series from "./Pages/Series"
import Search from "./Pages/Search"
import NotFound from "./Pages/NotFound"
import CharacterData from "./Pages/Character/CharacterData"

function App() {

  return (
      <div className="app">
        <Container >
          <Header />
          <Routes>
            <Route path="/" element={<Trending /> }  />
            <Route path="/Trending" element={<Trending /> }  />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Series" element={<Series />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/CharacterData" element={<CharacterData />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LabelBottomNavigation />
        </Container>
      </div>
  );
}

export default App;
