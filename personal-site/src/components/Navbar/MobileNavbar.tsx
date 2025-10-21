import '../../assets/css/navbar.css'

function MobileNavbar(){
    return (
        <>
            <div className='navbar' style={{ overflowX: 'hidden' }}>
                <h1>
                    <a href="/">Ricken Diniz</a>
                </h1>
                
                <ul className="social-media-list">
                    <li><a href="https://github.com/ricken-diniz" target="_blank"><i className="fab fa-github"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/ricken-diniz/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                    <li><a href="mailto:dinizrickenn@gmail.com"><i className="fas fa-envelope"></i></a></li>
                </ul>
            </div>
        </>
    )
}

export default MobileNavbar