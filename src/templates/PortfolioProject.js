import React, { useContext, useEffect, useState } from "react"

import "./PortfolioProject.scss"
import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import useProjectsStaticQuery from "../helpers/useProjectsStaticQuery"

import { has } from "lodash"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import moment from "moment"
import GatsbyImage from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLink
} from "@fortawesome/free-solid-svg-icons"

import arrowNext from "../assets/svg/arrow_next.svg"
import arrowPrev from "../assets/svg/arrow_prev.svg"

const PortfolioProject = data => {
  const {
    pageContext: { id },
  } = data
  const [state, setState] = useContext(MainContext)
  const [init, setInit] = useState(false)
  const { posts, categories, media } = useProjectsStaticQuery()
  const project = posts.filter(post => post.wordpress_id === id)[0]
  const projectMedia = media.filter(md => md.post === id).reverse()

  const carouselContent = []
  if (!!project.video && project.video !== "") {
    carouselContent.push(
      <div className={"videoIframeContainer"}>
        <iframe
          title={"Vimeo Video"}
          src={`https://player.vimeo.com/video/${project.video
            .split("/")
            .slice(-1)
            .pop()}`}
          className={"videoIframe"}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  projectMedia.forEach(img => {
    carouselContent.push(
      <div key={"project_media"}>
        <GatsbyImage fluid={img.localFile.childImageSharp.fluid} />
      </div>
    )
  })

  useEffect(() => {
    if (!init) {
      if (!has(state, "posts") || state.posts.length === 0) {
        categories.forEach(category => {
          category.selected = true
          category.highlight = false
        })
        setState({
          ...state,
          currentSection: "portfolio",
          posts: posts,
          media: media,
          categories: categories.filter(
            cat => cat.name !== "Portfolio" && cat.name !== "Uncategorized"
          ),
        })
      }
      setInit(true)
    }
  }, [init])

  return (
    <MainLayout location={"portfolio"}>
      <div className={"projectTitleContainer"}>
        <span className={"projectTitle"}>{project.title}</span>{" "}
        <span className={"projectYear"}>({moment(project.date).year()})</span>
      </div>
      <div className={"carouselContainer"}>
        <Carousel
          className={"slidesCarousel"}
          autoPlay={false}
          showThumbs={false}
          showIndicators={true}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>

              <div
                onClick={onClickHandler}
                title={label}
                className={`slideArrows ${hasPrev ? "" : "disabled"}`}
              >
                <img src={arrowPrev} alt={"previous project image"} />
              </div>

          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
              <div
                onClick={onClickHandler}
                title={label}
                className={`slideArrows ${hasNext ? "" : "disabled"}`}
              >
                <img src={arrowNext} alt={"next project image"} />
              </div>
          }
        >
          {carouselContent.map(con => (
            <>{con}</>
          ))}
        </Carousel>
      </div>
      <div className={"projectInfoContainer"}>
        <div className={"projectBody"}>
          <div dangerouslySetInnerHTML={{ __html: project.excerpt }} />
          <div className={"projectInfo"}>
            <span className={"categoriesTitle"}>CATEGORIES:</span> &nbsp;
            {project.categories &&
              project.categories.map((cat, index) => (
                <>
                  <span>{cat.name.toUpperCase()}</span>
                  {index < project.categories.length - 1 ? " | " : ""}
                </>
              ))}
          </div>
        </div>

        <div className={"projectMeta"}>
          {project.url && (
            <div>
              <span className={"metaTitle"}> </span>
              <span>
                <a
                  href={`${project.url}`}
                  target={"_blank"}
                  rel="noreferrer noopener"
                >
                 View Site <FontAwesomeIcon icon={faLink} className={"linkSymbol"} /> (External link)
                </a>
              </span>
            </div>
          )}

          {project.agency && (
            <div>
              <span className={"metaTitle"}>Agency: </span>
              {project.agency.split("|").length > 1 && (
                <span>
                  <a
                    href={`${project.agency.split("|")[1]}`}
                    target={"_blank"}
                    rel="noreferrer noopener"
                  >
                    {project.agency.split("|")[0]}
                  </a>
                </span>
              )}
              {project.agency.split("|").length === 1 && (
                <span>{project.agency.split("|")[0]}</span>
              )}
            </div>
          )}
          {project.client && (
            <div>
              <span className={"metaTitle"}>Client: </span>
              {project.client.split("|").length > 1 && (
                <span>
                  <a
                    href={`${project.client.split("|")[1]}`}
                    target={"_blank"}
                    rel="noreferrer noopener"
                  >
                    {project.client.split("|")[0]}
                  </a>
                </span>
              )}
              {project.client.split("|").length === 1 && (
                <span>{project.client.split("|")[0]}</span>
              )}
            </div>
          )}
          {project.tech && (
            <div>
              <span className={"metaTitle"}>Tech: </span>{project.tech}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default PortfolioProject
