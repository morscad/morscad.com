import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import { graphql } from "gatsby"
import FiltersHeader from "../components/portfolio/FiltersHeader"
import PortfolioGrid from "../components/portfolio/PortfolioGrid"
import useProjectsStaticQuery from "../helpers/useProjectsStaticQuery"

const Portfolio = ({ data }) => {

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
      <h1>Portfolio</h1>
      <FiltersHeader />
      <PortfolioGrid />
    </MainLayout>
  )
}

export default Portfolio

