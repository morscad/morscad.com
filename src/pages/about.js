import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import AboutComponent from "../components/about/AboutComponent"
import { graphql } from "gatsby"

const About = ({ data }) => {
  const pageTitle = "about";
  const [state, setState] = useContext(MainContext);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setState({ ...state, currentSection: 'about'});
      setInit(true);
    }
  }, [init]);
  return (
    <MainLayout location={"about"}>
      <h1>About</h1>
      <AboutComponent pageTitle={pageTitle} data={data} />
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
