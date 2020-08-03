/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressPost {
        edges {
          node {
            wordpress_id
            slug
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/PortfolioProject.js`)
  result.data.allWordpressPost.edges.forEach(edge => {
    console.log("Creating Portfolio Page >> ", edge.node.slug);
    createPage({
      // will be the url for the page
      path: `/portfolio/project/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.wordpress_id,
      },
    })
  })
}
