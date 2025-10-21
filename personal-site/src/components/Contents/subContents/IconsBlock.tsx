import {
    SiFlask,
    SiDjango,
    SiDocker,
    SiTypescript,
    SiCplusplus,
    SiPytorch,
    SiMysql,
    SiLaravel,
    SiApache,
    SiOpenai,
} from "react-icons/si";
import '../../../assets/css/block.css'

function IconsBlock() {
    const size_icons: number = 30;

    return (
        <>
            <div className="block" id="icons-block">
                <SiFlask className='icon' title="Flask" size={size_icons} color="#d1d1e0" />
                <SiDjango className='icon' title="Django" size={size_icons} color="#d1d1e0" />
                <SiDocker className='icon' title="Docker" size={size_icons} color="#d1d1e0" />
                <SiTypescript className='icon' title="TypeScript" size={size_icons} color="#d1d1e0" />
                <SiCplusplus className='icon' title="C++" size={size_icons} color="#d1d1e0" />
                <SiPytorch className='icon' title="PyTorch" size={size_icons} color="#d1d1e0" />
                <SiMysql className='icon' title="MySQL" size={size_icons} color="#d1d1e0" />
                <SiLaravel className='icon' title="Laravel" size={size_icons} color="#d1d1e0" />
                <SiApache className='icon' title="Apache" size={size_icons} color="#d1d1e0" />
                <SiOpenai className='icon' title="OpenAI" size={size_icons} color="#d1d1e0" />
            </div>
        </>
    )
}

export default IconsBlock