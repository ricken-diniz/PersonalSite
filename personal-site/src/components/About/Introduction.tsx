
import LinkedButtons from './LinkedButtons'
import '../../assets/css/about.css'

function Introduction() {
    return (
        <>
            <div className="introduction">
                <div id="intro-text">
                    <h2>Itroduction</h2>
                    <pre>
                        Hey All!<br />
                        I'm Ricken Diniz, a computer scientist in formation, specializing in software engineering, web development, machine learning, agent-based systems and computer vision. <br />                    
                    </pre>
                </div>
                <div id='buttons'>
                    <ul>
                        <li><LinkedButtons href="#about" content="About"/></li>
                        <li><LinkedButtons href="#education" content="Education"/></li>
                        <li><LinkedButtons href="#experience" content="Experience"/></li>
                        <li><LinkedButtons href="#projects" content="Projects"/></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Introduction
