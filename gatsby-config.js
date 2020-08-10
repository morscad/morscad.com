module.exports = {
  siteMetadata: {
    title: `OMAR FALEH  - Front-end / Full-stack Developer`,
    description: `Morscad.com is the professional practice and portfolio page of of Omar Faleh, a senior interactive developer: Web (React / Angular / NodeJS), Mobile applications (React Native), interactive installations, Javascript, HTML5.`,
    author: `Omar Faleh`,
    url: "https://www.morscad.com", // No trailing slash allowed!
    image: "/static/c3e2631bef5ef7a4a00f686086720761/omar_faleh.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@morscad",
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: "api.morscad.com",
        protocol: "https",
        hostingWPCOM: false,
        useACF: false,
        acfOptionPageIds: [],
        auth: {
          htaccess_user: "",
          htaccess_pass: "",
          htaccess_sendImmediately: false,
          wpcom_app_clientSecret: "",
          wpcom_app_clientId: "",
          wpcom_user: "",
          wpcom_pass: "",

          // If you use "JWT Authentication for WP REST API" (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
          // or (https://github.com/jonathan-dejong/simple-jwt-authentication) requires jwt_base_path, path can be found in WordPress wp-api.
          // plugin, you can specify user and password to obtain access token and use authenticated requests against WordPress REST API.
          jwt_user: process.env.JWT_USER,
          jwt_pass: process.env.JWT_PASSWORD,
          jwt_base_path: "/jwt-auth/v1/token", // Default - can skip if you are using https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
        },
        cookies: {},
        verboseOutput: false,
        perPage: 100,
        searchAndReplaceContentUrls: {
        },
        concurrentRequests: 10,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
        ],
        // Blacklisted routes using glob patterns
        excludedRoutes: [],
        keepMediaSizes: true
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.morscad.com',
        sitemap: 'https://www.morscad.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    }
  ],
}
