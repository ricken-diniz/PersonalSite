import { FaAngleRight } from "react-icons/fa"; 
import '../../assets/css/about.css'

interface ButtonProps {
    content: string;
    href?: string; 
    onclick?: () => void;
}

function ProjectsButton({ content, href='', onclick=() => {} }: ButtonProps) {
    return (
        <h6 className="linked-button">
            <a onClick={onclick} href={href}>
                <FaAngleRight /> {content}
            </a>
        </h6>
    );
}

export default ProjectsButton;
