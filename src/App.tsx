import "./App.css";
import "vazirmatn/Vazirmatn-font-face.css";
// import { Header, Footer } from "./components";
import { Home } from "./layouts/Home";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Vazirmatn", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Header /> */}
        <Home />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
