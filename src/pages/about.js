import React, { useContext, useEffect, useState } from "react"

import Img from "gatsby-image"
import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"

const About = ({ data }) => {
  const pageTitle = "about";
  const [state, setState] = useContext(MainContext);
  const [init, setInit] = useState(false);

  const [{ title, content, wordpress_id }] = data.allWordpressPage.nodes.filter(
    node => node.slug === pageTitle
  )
  const [{ localFile }] = data.allWordpressWpMedia.nodes.filter(
    node => node.post === wordpress_id
  )

  useEffect(() => {
    if (!init) {
      setState({ ...state, currentSection: 'about'});
      setInit(true);
    }
  }, [init]);
  return (
    <MainLayout location={"about"}>

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
