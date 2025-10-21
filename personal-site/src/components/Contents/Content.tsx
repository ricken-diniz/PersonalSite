import '../../assets/css/content.css'

interface ContentProps {
    title: string
    content: string
}

function Content({ title, content }: ContentProps){
    return (
        <div className='content'>
            <h2 id={title}>{title}</h2>
            <pre className='content-pre'>{content}</pre>
        </div>
    )

}

export default Content