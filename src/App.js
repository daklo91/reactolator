import Footer from "./components/Layout/Footer";
import useThemeSwitch from "./hooks/use-theme-switch";

function App() {
  const theme = useThemeSwitch();

  return (
    <div id="theme-switch" data-theme={theme}>
      <main></main>
      <Footer />
    </div>
  );
}

export default App;
