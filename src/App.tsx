import "./App.css";
import "vazirmatn/Vazirmatn-font-face.css";
// import { Header, Footer } from "./components";
import { Home } from "./layouts/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSocket } from "./network/socket/useSocket";

const theme = createTheme({
  typography: {
    fontFamily: ["Vazirmatn", "sans-serif"].join(","),
  },
});

function App() {
  const resetKey = useSocket();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Header /> */}
        <Home shouldRefetchSchedule={resetKey} />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
