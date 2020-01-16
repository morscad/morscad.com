import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const pageTitle = "home"
  const [{ title, content, wordpress_id }] = data.allWordpressPage.nodes.filter(
    node => node.slug === pageTitle
  )
  const [{ localFile }] = data.allWordpressWpMedia.nodes.filter(
    node => node.post === wordpress_id
  )
  return (
    <Layout section={pageTitle}>
      <SEO
        title={`${data.allWordpressSiteMetadata.nodes[0].name} | ${title}`}
        description={data.allWordpressSiteMetadata.nodes[0].description}
      />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <Img fluid={localFile.childImageSharp.fluid} />
    </Layout>
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
