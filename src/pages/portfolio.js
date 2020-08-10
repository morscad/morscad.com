import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import useProjectsStaticQuery from "../helpers/useProjectsStaticQuery"
import PortfolioContainer from "../components/portfolio/PortfolioContainer"
import SEO from "../components/system/SEO"

const Portfolio = () => {

  const [state, setState] = useContext(MainContext)
  const [init, setInit] = useState(false)
  const {posts, categories, media} = useProjectsStaticQuery()
  useEffect(() => {
    if (!init) {
      categories.forEach((category) => { category.selected = true; category.highlight = false;})
      setState({ ...state,
                  currentSection: "portfolio",
                  posts: posts,
                  media: media,
                  categories: categories.filter(cat => cat.name !== "Portfolio" && cat.name !== "Uncategorized") })
      setInit(true)
    }
  }, [init])


  return (
    <MainLayout location={"portfolio"}>
      <SEO />
      <PortfolioContainer pageTitle={"portfolio"} />
    </MainLayout>
  )
}

export default Portfolio

