import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import MainLayout from "../components/layouts/MainLayout"
import HomepageNav from "../components/home/HomepageNav"
import MainContext from "../context/MainContext"


const IndexPage = ({ data }) => {
  const pageTitle = "home";
  const [state, setState] = useContext(MainContext);
  const [init, setInit] = useState(false);

  console.log(data);
  const [{ title, content, wordpress_id }] = data.allWordpressPage.nodes.filter(
    node => node.slug === pageTitle
  )
  /*const [{ localFile }] = data.allWordpressWpMedia.nodes.filter(
    node => node.post === wordpress_id
  )*/
  useEffect(() => {
    if (!init) {
      setState({ ...state, currentSection: 'home'});
      setInit(true);
    }
  }, [init]);
  return (
      <MainLayout>
        <HomepageNav />
        {/*<h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <Img fluid={localFile.childImageSharp.fluid} />*/}
      </MainLayout>
  )
}

export default IndexPage
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

      }
    }
  }
`
