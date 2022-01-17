import { createContext, useReducer } from "react";
import { appReducer, initState } from "./reducers/appreducer"
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./styles/app.scss"

export const Appcontext = createContext();

function App() {

  const [state, dispatch] = useReducer(appReducer, initState)

  return (
    <Appcontext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Appcontext.Provider>
  );
}

export default App;
