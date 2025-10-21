import '../../../assets/css/block.css'
import car_jorney from '../../../assets/car_jorney.jpeg'
import car_project from '../../../assets/car_project.jpeg'
import type { JSX } from 'react'

function DedeVeiculos({title,company,year_begin,habilities,href=''}: {title: string | JSX.Element, company: string, year_begin: string, habilities: string, href?: string}) {
    if(href!==''){
        title = <a href={href} style={{textDecoration: 'underline'}}>{title}</a>
    }
    return (
        <>
            <div className='block'>
                <h5>{title} - {company} <p><i>{year_begin}</i></p></h5>
                <figure className='float-img right'>
                    <img  style={{borderRadius: '15px'}} src={car_jorney} alt="Car Journey" />
                </figure>
                <pre>A vocation job, where I learn to speak with customers, developing my skills of communication, task agility, solving unexpected problems, marketing, managing leads, etc. Futhermore, I worked 8 hours for day, but I studied every night to build a software projects for my portfolio, in order to get job opportunities in my field. With this, I managed to do a inventory management system for my business.</pre>
                <figure className='float-img left'>
                    <img  style={{borderRadius: '15px', marginTop: '4px'}} src={car_project} alt="Car Project" />
                </figure>
                <pre className='habilities'>{habilities}</pre>
            </div>
        </>
    )
}

export default DedeVeiculos
