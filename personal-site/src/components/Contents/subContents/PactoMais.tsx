import '../../../assets/css/block.css'
import revai_trip from '../../../assets/revai_trip.jpeg'
import type { JSX } from 'react'

function PactoMais({title,company,year_begin,habilities,href=''}: {title: string | JSX.Element, company: string, year_begin: string, habilities: string, href?: string}) {
    if(href!==''){
        title = <a href={href} style={{textDecoration: 'underline'}}>{title}</a>
    }
    return (
        <>
            <div className='block'>
                <h5>{title} - {company} <p><i>{year_begin}</i></p></h5>
                <figure className='float-img right'>
                    <img  style={{borderRadius: '15px'}} src={revai_trip} alt="Revai Trip" />
                </figure>
                <pre>Research and Development Project, working with computer vision to improve image recognition, classification and extraction tasks, meeting the demands of PactoMais company.</pre>
                <pre className='habilities'>{habilities}</pre>
            </div>
        </>
    )
}

export default PactoMais
