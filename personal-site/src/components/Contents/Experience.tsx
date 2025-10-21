import ExperienceBlock from './subContents/ExperienceBlock'
import IconsBlock from './subContents/IconsBlock'
import PactoMais from './subContents/PactoMais'
import DedeVeiculos from './subContents/DedeVeiculos'
import '../../assets/css/content.css'

function Experience(){
    return (
        <div className="content" style={{ overflowX: 'hidden' }}>
            <h2 id="experience">Experience</h2>
            <IconsBlock />
            <ExperienceBlock title="Interação TV" company="IFRN" year_begin="2022" href='/iptv_declaration.pdf' description="Extension Project, working with backend development using Django, JS graphic elements with ChartJS framework, data handling with Markup Languages for Meta API queries and RSS consults and control over database." habilities="Django, REST APIs, SQL Query, JS frameworks, MarkupLanguages."/>
            <ExperienceBlock title="Future Connected Systems" company="VIRTUS@UFCG" year_begin="2025" description="Research Project, working with Machine Learning concepts, where the team seeks to propose a XAI solution (eXplanaible Artificial Intelligence), based on Gradient Descent, in order to protect against data poisoning attacks in federated trains of image processing models." habilities="Keras TensorFlow, PyTorch, Federated Learning and Poisoning, GradCAM, Computer Vision, Convolutional Networks." href='/virtus-declaration.pdf'/>
            <PactoMais title="PactoMais" company="REVAI@UFCG" year_begin="2025" href='https://www.pactomais.com.br/' habilities="TensorFlow, C++, OpenCV, Data Analytics, Agile SCRUM Method, Computer Vision, Convolutional Networks."/>
            <DedeVeiculos title="Car Salesman" company="Dedé Veículos" year_begin="2025" habilities="Task Agility, Oratory, Teamwork, Communication for sales, Lead Management." href='https://www.instagram.com/dedeveiculoscaico/'/>
        </div>
    )
}

export default Experience