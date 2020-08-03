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
const MainLayout = ({ children }) => {
  const [state, ] = useContext(MainContext)
  const [topMenuClass, setTopMenuClass] = useState("menuHidden")
  const [logoClass, setLogoClass] = useState("logoHidden")
  const morscadLogo = useImageStaticQuery("morscad-logo.png")
  const morscadLogoertical = useImageStaticQuery("morscad-logo-vertical.png")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDrawer = open => {
    setMobileMenuOpen(open)
  }

  useEffect(() => {
    if (!!state && !!state.currentSection) {
      if (state.currentSection === "home") {
        setTopMenuClass("menuHidden")
        setLogoClass("logoHidden")
      } else {
        setTopMenuClass("menuVisible")
        setLogoClass("logoVisible")
      }
    }
  }, [state])
  return (
    <>
      <div className={`topMenuMobile ${topMenuClass}`}>
        <div onClick={()=>{toggleDrawer(true)}}>
          <FontAwesomeIcon icon={faBars} className={`mobileMenuIcon`} />
        </div>
        <div className={`mobileMenuLogo`}>
          <Img
            fluid={morscadLogoertical.childImageSharp.fluid}
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
          <Link to={"/contact"}>contact</Link>
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

      <main className={"pageContent"}>{children}</main>

      <Drawer open={mobileMenuOpen} onClose={() => {toggleDrawer(false)}}>
        <div className={"menuLogo"}>
          <Link to={"/"}>
            <Img
              fluid={morscadLogo.childImageSharp.fluid}
              alt="Website of Omar faleh"
            />
          </Link>
        </div>

        <div className={"mobileMenuDrawer"}>
          <div className={"menuItem"}>
            <Link to={"/portfolio"}>Portfolio</Link>
          </div>
          <div className={"menuItem"}>
            <Link to={"/about"}>About</Link>
          </div>
          <div className={"menuItem"}>
            <Link to={"/contact"}>contact</Link>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default MainLayout
