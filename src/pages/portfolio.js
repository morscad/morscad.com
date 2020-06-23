import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import { graphql } from "gatsby"
import FiltersHeader from "../components/portfolio/FiltersHeader"
import PortfolioGrid from "../components/portfolio/PortfolioGrid"

const Portfolio = ({ data }) => {
  const {
    allWordpressPost: { nodes: posts },
    allWordpressWpMedia: { nodes: media },
    allWordpressCategory: { nodes: categories },
  } = data

  const [state, setState] = useContext(MainContext)
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (!init) {
      console.log(posts)
      console.log(media)
      console.log(categories)
      categories.forEach((category) => { category.selected = true; category.highlight = false;})
      setState({ ...state, currentSection: "portfolio", categories: categories.filter(cat => cat.name !== "Portfolio" && cat.name !== "Uncategorized") })
      setInit(true)
    }
  }, [init])


  return (
    <MainLayout location={"portfolio"}>
      <FiltersHeader />
      <PortfolioGrid posts={posts} />
    </MainLayout>
  )
}

export default Portfolio
export const pageData = graphql`
  {
    allWordpressPost {
      nodes {
        wordpress_id
        slug
        title
        date
        categories {
          id
          name
        }
        featured_media {
          id
          media_type
          localFile {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
        }
        tags {
          id
          name
        }
        agency
        video
        url
      }
    }
    allWordpressWpMedia {
      nodes {
        post
        source_url
        localFile {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
    }
    allWordpressCategory {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`
