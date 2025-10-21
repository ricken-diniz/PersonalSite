import background from '../../assets/ricken.jpg'
import '../../assets/css/background.css'

function BackgroundImage() {
  return (
    <>
        <img id='mobile-image' src={background} style={{ width: '100%', height: 'auto', overflowX: 'hidden' }} alt="" />
    </>
  )
}

export default BackgroundImage