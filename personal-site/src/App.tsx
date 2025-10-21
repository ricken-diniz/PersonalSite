import './assets/css/App.css'

import MobileNavbar from './components/Navbar/MobileNavbar'
import Introduction from './components/About/Introduction'
import BackgroundImage from './components/Background/BackgroundImage'
import Content from './components/Contents/Content'
import Education from './components/Contents/Education'
import Experience from './components/Contents/Experience'
import { useEffect, useState } from 'react';
import Projects from './components/Projects/Projects'


function App() {
  const [texto, setTexto] = useState("");
  
  useEffect(() => {
    fetch("/about.txt")
      .then((res) => res.text())
      .then((conteudo) => setTexto(conteudo));
  }, []);

  return (
    <>   
      <div className='container'><MobileNavbar /></div>
      <div className='container'><Introduction /></div>
      <div className='container'><BackgroundImage /></div>
      <div className='container'><Content title='about' content={texto} /></div>
      <div className='container'><Education /></div>
      <div className='container'><Experience /></div>
      <div className='container'><Projects /></div>
    </>
  )
}

export default App
