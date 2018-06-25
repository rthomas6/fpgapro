module.exports = {
  siteMetadata: {
    title: 'FPGA Pro',
    description: 'A site about building FPGA designs, and how to be better at it.',
    siteUrl: 'https://www.fpgapro.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: '>',
              aliases: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-121301765-1",
      },
    },
    {
      resolve: 'gatsby-plugin-feed'
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
