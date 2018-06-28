import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-1">Latest Posts</h1>
          </div>
          {posts
            .map(({ node: post }) => (
              <article
                className="message is-dark"
                key={post.id}
              >
                <div className="message-header">
                    <p>
                      <Link className="" to={post.fields.slug}>
                          {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                      <small>{post.frontmatter.date}</small>
                    </p>
                    <p className="has-text-right">
                      <Link className="button is-small is-primary" to={post.fields.slug}>
                        Read More
                      </Link>
                    </p>
                </div>
                <div className="message-body">
                    <p>
                      {post.frontmatter.description}
                    </p>
                </div>
              </article>
            ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, published: {eq: true} }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
