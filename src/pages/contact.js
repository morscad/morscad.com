import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import MainContext from "../context/MainContext"
import { graphql } from "gatsby"
import ContactPage from "../components/contact/ContactPage"
import SEO from "../components/system/SEO"

const About = () => {
  const [state, setState] = useContext(MainContext);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setState({ ...state, currentSection: 'contact'});
      setInit(true);
    }
  }, [init]);
  return (
    <MainLayout location={"contact"}>
      <SEO />
      <ContactPage pageTitle={"contact"} />
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
