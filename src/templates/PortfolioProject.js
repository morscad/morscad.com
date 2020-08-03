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
      <div className={"projectTitle"}>
        {project.title} ({moment(project.date).year()})
      </div>
      <div>
        <Carousel
          className={"slidesCarousel"}
          autoPlay={false}
          showThumbs={false}
          showIndicators={true}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <div
                onClick={onClickHandler}
                title={label}
                className={"slideArrows"}
              >
                <img src={arrowPrev} alt={"previous project image"} />
              </div>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <div
                onClick={onClickHandler}
                title={label}
                className={"slideArrows"}
              >
                <img src={arrowNext} alt={"next project image"} />
              </div>
            )
          }
        >
          {carouselContent.map(con => (
            <>{con}</>
          ))}
        </Carousel>
      </div>
      <div>
        <div
          className={"projectBody"}
          dangerouslySetInnerHTML={{ __html: project.excerpt }}
        />
        <div className={"projectInfo"}>
          <div>
            {" "}
            Categories:{" "}
            {project.categories.map(cat => (
              <span>{cat.name}</span>
            ))}{" "}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PortfolioProject
