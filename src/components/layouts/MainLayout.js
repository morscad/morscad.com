import React, { useContext, useEffect, useState } from "react"
import "../../styles.scss"
import "./MainLayout.scss"
import useImageStaticQuery from "../../helpers/useImageQuery"
import Img from "gatsby-image"
import MainContext from "../../context/MainContext"
import { navigate } from "gatsby"

const MainLayout = ({ children }) => {
  const [state, setState] = useContext(MainContext)
  const [topMenuClass, setTopMenuClass] = useState("menuHidden")
  const [logoClass, setLogoClass] = useState("logoHidden")
  const morscadLogo = useImageStaticQuery("morscad-logo.png")

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
      <nav className={`topMenu ${topMenuClass}`}>
        <div
          className={"menuItem"}
          onClick={() => {
            navigate("/portfolio")
          }}
        >
          Portfolio
        </div>
        <div
          className={"menuItem"}
          onClick={() => {
            navigate("/about")
          }}
        >
          About
        </div>
        <div
          className={"menuItem"}
          onClick={() => {
            navigate("/contact")
          }}
        >
          contact
        </div>
      </nav>
      <div className={`menuLogoContainer ${logoClass}`}>
        <div
          className={"menuLogo"}
          onClick={() => {
            setState({ ...state, currentSection: 'home'});
            setTimeout(() => {
              navigate("/")
            }, 500)
          }}
        >
          <Img
            fluid={morscadLogo.childImageSharp.fluid}
            alt="Website of Omar faleh"
          />
        </div>
      </div>
      <main className={"pageContant"}>{children}</main>
    </>
  )
}
export default MainLayout
