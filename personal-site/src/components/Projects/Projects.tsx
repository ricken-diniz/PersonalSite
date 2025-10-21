import '../../assets/css/projects.css'
import { FaChevronDown } from 'react-icons/fa';
import type { JSX } from 'react'
import FirstProjectsBlock from './blocks/FirstProjectsBlock.tsx';

function Projects() {
	const block: JSX.Element = <FirstProjectsBlock />

	return (
		<>
			<div className='content'>
				<h2 id='projects'>Projects</h2>
				<div className='projects' style={{overflowX: 'hidden'}}>
					<h2>Achievements at my <span id='project-selector'>first  <FaChevronDown className="select-arrow-icon" size='0.8em'/></span> term at UFCG</h2>
					{block}
				</div>
			</div>
		</>
	)
}

export default Projects