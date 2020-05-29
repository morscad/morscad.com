import React from "react"

import Img from "gatsby-image"
import MainLayout from "../components/layouts/MainLayout"

const About = ({ data }) => {
  const pageTitle = "about"
  const [{ title, content, wordpress_id }] = data.allWordpressPage.nodes.filter(
    node => node.slug === pageTitle
  )
  const [{ localFile }] = data.allWordpressWpMedia.nodes.filter(
    node => node.post === wordpress_id
  )

  return (
    <MainLayout section={pageTitle}>

    </MainLayout>
  )
}

export default About
export const pageData = graphql`
  {
    allWordpressPage {
      nodes {
        content
        title
        wordpress_id
        slug
      }
    }
    allWordpressSiteMetadata {
      nodes {
        description
        name
        home
      }
    }
    allWordpressWpMedia {
      nodes {
        media_type
        source_url
        post
        mime_type
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
  }
`
