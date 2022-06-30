import { useState, useEffect } from 'react'
import './App.css';
import Header from "./Components/Header/Header"
import LabelBottomNavigation from "./Components/Navbar/MainNav"
import { Routes, Route, useNavigate } from "react-router-dom"
import Container from "./Container"
import Trending from "./Pages/Trending"
import Movies from "./Pages/Movies"
import Series from "./Pages/Series"
import Search from "./Pages/Search"
import NotFound from "./Pages/NotFound"
import SignUp from "./Pages/Form/SignUp/SignUp"
import SignIn from "./Pages/Form/SignIn/SignIn"
import CharacterData from "./Pages/Character/CharacterData"
import jwtDecode from 'jwt-decode'
import ProtectedRoute from "./Components/ProtectedRoute"
function App() {

  const [loginData, setLoginData] = useState(null)
  let navigate = useNavigate()

  function setUserData() {
    let token = localStorage.getItem("cinemaClubToken")
    let decoded = jwtDecode(token)
    setLoginData(decoded)
  }

  function logoutFunction() {
    navigate("signin")
    localStorage.removeItem('cinemaClubToken');
    setLoginData(null)
  }

  useEffect(() => {
    if (localStorage.getItem("cinemaClubToken")) {
      setUserData()
    }
  }, [])


  return (
    <div className="app">
      <Container >
        <Header logoutFunction={logoutFunction} loginData={loginData}/>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/Trending" element={<Trending />} />
            <Route path="/" element={<Trending />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Series" element={<Series />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/CharacterData" element={<CharacterData />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn setUserDataFunction={setUserData} />} />
        </Routes>
        {loginData && <LabelBottomNavigation />}
      </Container>
    </div>
  );
}

export default App;
