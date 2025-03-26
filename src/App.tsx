import './App.css';
import { Editor } from './components/Editor';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header/>
      <Editor/>
      <Footer/>
    </div>
  );
}

export default App;
