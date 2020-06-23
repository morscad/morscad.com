import React from "react"
import "./AboutComponent.scss"
import EdgeBox from "../common/EdgeBox"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

const AboutComponent = ({ pageTitle, data }) => {
  const [{ title, content, wordpress_id }] = data.allWordpressPage.nodes.filter(
    node => node.slug === pageTitle
  )
  const [{ localFile }] = data.allWordpressWpMedia.nodes.filter(
    node =>
      node.post === wordpress_id && node.source_url.indexOf("vertical") > -1
  )

  return (
    <EdgeBox>
      <div className={"about"}>
        <aside>
          <Img
            fluid={localFile.childImageSharp.fluid}
            alt="Website of Omar faleh"
          />
          <div className={"social"}>
            <div className={"pretext"}>Stalk me:</div>
            <div className={"socialIcon"}>
              <a
                href={"https://www.instagram.com/morscad.creative.tech/"}
                target={"_blank"}
                referrerPolicy={"no-referrer"}
                rel={"noopener noreferrer"}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className={"socialIcon"}>
              <a
                href={"https://www.linkedin.com/in/omarfaleh/"}
                target={"_blank"}
                referrerPolicy={"no-referrer"}
                rel={"noopener noreferrer"}
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <div className={"socialIcon"}>
              <a
                href={"https://twitter.com/morscad"}
                target={"_blank"}
                referrerPolicy={"no-referrer"}
                rel={"noopener noreferrer"}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </aside>
        <section>
          <h1 className={"title"}>{title}</h1>
          <article
            className={"content"}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </EdgeBox>
  )
}
export default AboutComponent
