import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import { navigate} from "gatsby"

import './HomepageNav.scss';
import useImageStaticQuery from "../../helpers/useImageQuery"

const HomepageNav = () => {
  const logo = useImageStaticQuery(process.env.REACT_APP_SITE === "omarfaleh.com" ? 'omarfaleh-logo.png' : 'morscad-logo.png');
  const [init, setInit] = useState(false);
  const [buttonState, setButtonState] = useState('initButton');
  const [containerState, setContainerState] = useState('initContainer');

  const animateOut = (destination) => {
    setContainerState('animateContainerOut');
    setTimeout(() => {
      animateOutComplete(destination);
    }, 500)
  }

  const animateOutComplete = (destination) => {
    navigate(destination);
  }

  useEffect(() => {
    if (!init) {
      setContainerState('animateContainerIn');
      setTimeout(() => {
        setButtonState('animateButtonIn');
      }, 500)
      setInit(true)
    }
  }, [init]);

  return (<>
    <div className={'mainNavOuterContainer'}>
      <div className={`mainNavInnerContainer ${containerState}`}>

        <div className={'mainNavBoxLogo'}>
            <Img fluid={logo.childImageSharp.fluid} alt="Website of Omar faleh" />
        </div>

        <div className={`mainNavBoxFourth active ${buttonState}`} onClick={() => {
          animateOut('/portfolio')
        }}>Portfolio</div>
        <div className={'mainNavBoxFourth inactive'}>&nbsp;</div>
        <div className={'mainNavBoxFourth inactive'}>&nbsp;</div>
        <div className={`mainNavBoxFourth active ${buttonState}`} onClick={() => {
          animateOut('/about')
        }}>About</div>

        <div className={'mainNavBoxThird inactive'}>&nbsp;</div>
        <div className={'mainNavBoxThird inactive'}>
          <div className={'siteLogo'}>
            <Img fluid={logo.childImageSharp.fluid} alt="Website of Omar faleh" />
          </div>
        </div>
        <div className={'mainNavBoxThird inactive'}>&nbsp;</div>

        <div className={'mainNavBoxFourth inactive'}>&nbsp;</div>
        <div className={'mainNavBoxFourth inactive'}>&nbsp;</div>
        <div className={`mainNavBoxFourth active ${buttonState}`}>Contact</div>
        <div className={'mainNavBoxFourth inactive'}>&nbsp;</div>
      </div>
    </div>
  </>);
}
export default HomepageNav;
