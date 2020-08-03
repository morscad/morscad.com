import { useStaticQuery, graphql } from "gatsby" // to query for image data

const useProjectsStaticQuery = () => {
  const data = useStaticQuery(graphql`
    query AllPosts {
    allWordpressPost {
        nodes {
          wordpress_id
          slug
          title
          date
          content
          excerpt
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
  `)
  const {
    allWordpressPost: { nodes: posts },
    allWordpressWpMedia: { nodes: media },
    allWordpressCategory: { nodes: categories },
  } = data

  return { posts: posts, media: media, categories: categories }
}

export default useProjectsStaticQuery
