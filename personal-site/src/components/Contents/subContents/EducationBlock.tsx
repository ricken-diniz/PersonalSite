import type { JSX } from 'react'
import '../../../assets/css/block.css'

function EducationBlock({formation,institue,year_begin,href=''}: {formation: string | JSX.Element, institue: string, year_begin: string, href?: string}) {
    if(href!=''){
        formation = <a href={href} style={{textDecoration: 'underline'}}>{formation}</a>
    }
    
    return (
        <>
            <div className="block">
                <h5>{formation} <p><i>{year_begin}</i></p></h5>
                <pre>{institue}</pre>
            </div>
        </>
    )
}

export default EducationBlock