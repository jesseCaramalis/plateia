import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from 'scenes/homePage';
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); //manages state with redux store hook
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //defines MUI theme with useMemo hook
  const isAuth = Boolean(useSelector((state) => state.token)); //conditional rendering depending on whether user is logged in
  return (
    <div className="app">
        <BrowserRouter> {/*provides router-dom routing to all components*/}
          <ThemeProvider theme={theme}> {/*provides MUI theme*/}
            <CssBaseline /> {/*provides a MUI basic CSS reset*/}
            <Routes> {/*routes to root, home and profile depending on user auth token state*/}
              <Route path="/" element={<LoginPage />} /> 
              <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/"/>} />
              <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/>} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  )
}

export default App;
