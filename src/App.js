import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import useThemeSwitch from "./hooks/use-theme-switch";

function App() {
  const theme = useThemeSwitch();

  return (
    <div id="theme-switch" data-theme={theme}>
      <div id="calculator-body">
        <Header />
        <main></main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
