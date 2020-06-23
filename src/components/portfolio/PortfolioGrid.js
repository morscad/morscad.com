import React, { useContext, useEffect, useState } from "react"
import moment from "moment"
import { isEqual, intersectionBy } from "lodash"

import "./PortfolioGrid.scss"
import GatsbyImage from "gatsby-image"
import MainContext from "../../context/MainContext"

const PortfolioGrid = ({ posts }) => {
  const [state, setState] = useContext(MainContext)
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const p = posts.filter(project => {
      return (
        intersectionBy(
          project.categories,
          state.categories.filter(cat => cat.selected),
          "id"
        ).length > 0
      )
    })
    if (!isEqual(p, projects)) {
      setProjects(p)
    }
  }, [state, posts])
  return (
    <>
      {projects.length === 0 && (
        <div className={"emptyContainer"}>There are no posts that match the current search criteria</div>
      )}
      {projects.length > 0 && (
        <div className={"gridContainer"}>
          {projects.map(post => {
            return (
              <div
                className={"portfolioItem"}
                onMouseEnter={() => {
                  setState({ ...state, hoveredProject: post })
                }}
                onMouseLeave={() => {
                  setState({ ...state, hoveredProject: null })
                }}
              >
                <div className={"itemImage"}>
                  <GatsbyImage
                    fluid={post.featured_media.localFile.childImageSharp.fluid}
                  />
                </div>
                <div className={"itemCover"}>
                  <div>{post.title}</div>
                  <div>{moment(post.date).year()}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
export default PortfolioGrid
