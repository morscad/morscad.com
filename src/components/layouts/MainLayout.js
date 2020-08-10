import React, { useContext, useEffect, useState } from "react"
import Drawer from "@material-ui/core/Drawer"

import { Link } from "gatsby"

import "../../styles.scss"
import "./MainLayout.scss"
import useImageStaticQuery from "../../helpers/useImageQuery"
import Img from "gatsby-image"
import MainContext from "../../context/MainContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const MainLayout = ({ location, children }) => {
  const [state, ] = useContext(MainContext)
  const [topMenuClass, setTopMenuClass] = useState("menuHidden")
  const [mobileMenuClass, setMobileMenuClass] = useState("mobileMenuHidden")
  const [logoClass, setLogoClass] = useState("logoHidden")
  const [containerClass, setContainerClass] = useState("logoHidden")
  const morscadLogo = useImageStaticQuery("morscad-logo.png")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  console.log(location);
  const toggleDrawer = open => {
    setMobileMenuOpen(open)
  }

  useEffect(() => {
    if (!!state && !!state.currentSection) {
      if (state.currentSection === "home") {
        setTopMenuClass("menuHidden")
        setMobileMenuClass("mobileMenuHidden")
        setLogoClass("logoHidden")
        setContainerClass("homepageContent")
      } else {
        setTopMenuClass("menuVisible")
        setMobileMenuClass("mobileMenuVisible")
        setLogoClass("logoVisible")
        setContainerClass("pageContent")
      }
    }
  }, [state])
  return (
    <>
      <div className={`topMenuMobile ${mobileMenuClass}`}>
        <div className={`mobileMenuHamburger`}
             role={"button"}
             tabIndex={"0"}
             onKeyPress={(e) => {
               const code = e.keyCode || e.charCode
               if (code === 13) {
                 toggleDrawer(true)
               }
             }}
             onClick={()=>{toggleDrawer(true)}}>
          <div><FontAwesomeIcon icon={faBars} className={`mobileMenuIcon`} /></div>
          <div><h1>{!!location ? location.toUpperCase() : ""}</h1></div>
        </div>
        <div className={`mobileMenuLogo`}>
          <Img
            fluid={morscadLogo.childImageSharp.fluid}
            alt="Website of Omar faleh"
          />
        </div>
      </div>
      <nav className={`topMenu ${topMenuClass}`}>
        <div className={"menuItem"}>
          <Link to={"/portfolio"}>Portfolio</Link>
        </div>
        <div className={"menuItem"}>
          <Link to={"/about"}>About</Link>
        </div>
        <div className={"menuItem"}>
          <Link to={"/contact"}>Contact</Link>
        </div>
      </nav>
      <div className={`menuLogoContainer ${logoClass}`}>
        <div className={"menuLogo"}>
          <Link to={"/"}>
            <Img
              fluid={morscadLogo.childImageSharp.fluid}
              alt="Website of Omar faleh"
            />
          </Link>
        </div>
      </div>

      <main className={containerClass}>{children}</main>

      <Drawer open={mobileMenuOpen} onClose={() => {toggleDrawer(false)}}>
        <div className={"menuLogo"}>
          <Link to={"/"}>
            <Img
              fluid={morscadLogo.childImageSharp.fluid}
              alt="Website of Omar faleh"
            />
          </Link>
        </div>

        <nav className={"mobileMenuDrawer"}>
          <div className={"menuItem"}>
            <Link to={"/portfolio"}>Portfolio</Link>
          </div>
          <div className={"menuItem"}>
            <Link to={"/about"}>About</Link>
          </div>
          <div className={"menuItem"}>
            <Link to={"/contact"}>Contact</Link>
          </div>
        </nav>
      </Drawer>
    </>
  )
}
export default MainLayout
