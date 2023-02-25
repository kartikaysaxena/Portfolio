import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import About from './components/Header/About/About';
import Skills from './components/Header/Skills/Skills';
import Work from './components/Header/Work/Work';
import Contact from './components/Header/Contact/Contact';
function App() {
  return (
    <div className="App">
      <Header/>
      <About/>
      <Skills/>
      <Work/>
      <Contact/>
    </div>
  );
}

export default App;
