import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventScreen from './screens/EventScreen'
import UpdateScreen from './screens/UpdateScreen'
import SearchEvent from './components/event/SearchEvent'
import HomeScreen from './screens/HomeScreen';
import NoPage from './screens/NoPage';

function App() {
  

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route index element={<EventScreen/>} />
            <Route path="EventScreen" element={<EventScreen />} />
            <Route path="UpdateScreen" element={<UpdateScreen />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
