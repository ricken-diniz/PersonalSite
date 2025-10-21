import EducationBlock from './subContents/EducationBlock'
import '../../assets/css/content.css'

function Education(){
    return (
        <div className="content">
            <h2 id="education">Education</h2>
            <EducationBlock href='ifrn_diploma.pdf' formation="Internet Computer Technician" institue="Federal Institute of Rio Grande do Norte" year_begin="2021" />
            <EducationBlock href='ufcg_history.pdf' formation="Computer Science" institue="Federal University of Campina Grande" year_begin="2025" />
            <EducationBlock href='advanced_english_diploma.pdf' formation="Advanced I English Course" institue="Federal Institute of Rio Grande do Norte" year_begin="2023" />
        </div>
    )
}

export default Education