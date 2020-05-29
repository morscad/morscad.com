import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import { navigate} from "gatsby"

import { gsap, Power3, TimelineMax } from "gsap";

import './HomepageNav.scss';
import useImageStaticQuery from "../../helpers/useImageQuery"

const HomepageNav = () => {
  const omarLogo = useImageStaticQuery('omarfaleh-logo.png');
  const morscadLogo = useImageStaticQuery('morscad-logo.png');
  const [init, setInit] = useState(false);

  const animateOut = () => {
    gsap.to(".mainNavInnerContainer", .5, {scale: 0.6, opacity: 0,  ease: Power3.easeOut, onComplete: animateOutComplete });
  }

  const animateOutComplete = () => {
    navigate("/about")
  }

  useEffect(() => {
    if (!init) {

      gsap.set(".active", {scale: 0, opacity: 0 });
      gsap.from(".mainNavInnerContainer", .5, {scale: 0.6, opacity: 0,  ease: Power3.easeIn });
      gsap.to(".active", .5, {scale: 1, opacity: 1, delay: .2,  ease: Power3.easeIn });
      setInit(true)
    }
  }, [init]);

  return (<>
    <div className={'mainNavOuterContainer'}>
      <div className={'mainNavInnerContainer'}>
        <div className={'mainNavBoxFourth active'}>Portfolio</div>
        <div className={'mainNavBoxFourth inactive'}></div>
        <div className={'mainNavBoxFourth inactive'}></div>
        <div className={'mainNavBoxFourth active'} onClick={animateOut}>About</div>

        <div className={'mainNavBoxThird inactive'}></div>
        <div className={'mainNavBoxThird inactive'}>
          <div className={'siteLogo'}>
            <Img fluid={morscadLogo.childImageSharp.fluid} alt="A corgi smiling happily" />
          </div>
        </div>
        <div className={'mainNavBoxThird inactive'}></div>

        <div className={'mainNavBoxFourth inactive'}></div>
        <div className={'mainNavBoxFourth inactive'}></div>
        <div className={'mainNavBoxFourth active'}>Contact</div>
        <div className={'mainNavBoxFourth inactive'}></div>
      </div>
    </div>
  </>);
}
export default HomepageNav;
