import '../../../assets/css/block.css'
import type { JSX } from 'react'

function ExperienceBlock({title,company,year_begin,description,habilities,href=''}: {title: string | JSX.Element, company: string, year_begin: string, description: string, habilities: string, href?: string}) {
    if(href!==''){
        title = <a href={href} style={{textDecoration: 'underline'}}>{title}</a>
    }
    return (
        <>
            <div className='block'>
                <h5>{title} - {company} <p><i>{year_begin}</i></p></h5>
                <pre>{description}</pre>
                <pre className='habilities'>{habilities}</pre>
            </div>
        </>
    )
}

export default ExperienceBlock
