import { useStaticQuery, graphql } from "gatsby" // to query for image data

const useImageStaticQuery = (path) => {
  const { allFile } = useStaticQuery(graphql`
    query loadAllImagesList {
      allFile {
        edges {
          node {
            id
            relativePath
            publicURL
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
            lg: childImageSharp {
              fluid(quality: 100, maxWidth: 1170) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
        }
      }
    }
  `)

    const resultingFile = allFile.edges.find((file) => {
      return file.node.relativePath === path
    }) || { node: null }
    return resultingFile.node
}

export default useImageStaticQuery;
