import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark
  // console.log("nodes >> ", nodes)
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      {/* <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p> */}
      {/* <StaticImage
        placeholder="blurred"
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      /> */}
      <div className="posts">
        {nodes.map(post => {
          const { category, title, url, image } = post.frontmatter
          const img = getImage(image)
          return (
            <div className="post" key={post.id}>
              <GatsbyImage image={img} alt={title} />
              <Link to={`/${category}/${url}`}>{title}</Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                formats: [AUTO, AVIF, WEBP]
                placeholder: BLURRED
              )
            }
          }
        }
        id
      }
    }
  }
`
