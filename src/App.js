import {BrowserRouter} from 'react-router-dom';
import Footer from "./Footer";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import AppRouter from "./UI/AppRouter";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth') === "true" && localStorage.getItem('playerId')){
      setIsAuth(true);
      setPlayerId(+localStorage.getItem('playerId'));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      playerId,
      setPlayerId,
      isLoading,
    }}>
      <BrowserRouter>
        <AppRouter />
        <Footer />
      </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
