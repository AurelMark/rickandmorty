import React from "react";
import ExternalLink from "components/ExternalLink/ExternalLink";

import styles from "./About.scss";

const About = () => {
  return (
    <div className={styles.About}>
      <h2>What is this?</h2>
      <p>
        The Rick and Morty API is a REST(ish) and GraphQL API based on the
        television show{" "}
        <ExternalLink link='https://www.adultswim.com/videos/rick-and-morty'>
          Rick and Morty
        </ExternalLink>
        . You will have access to about hundreds of characters, images,
        locations and episodes. The Rick and Morty API is filled with canonical
        information as seen on the TV show.
      </p>
      <h2>Who are you?</h2>
      <p>
        We are{" "}
        <ExternalLink link='https://axelfuhrmann.com/'>
          Axel Fuhrmann
        </ExternalLink>
        , a guy who likes to develop things and{" "}
        <ExternalLink link='https://talitatraveler.com/'>Talita</ExternalLink>,
        the {`"Rick and Morty data scientist"`} and hardcore fan.
      </p>
      <h2>Why did you build this?</h2>
      <p>
        Because we were really interested in the idea of writing an open source
        project and also because Rick and Morty is our favorite show at that
        moment, so why not?
      </p>
      <h2>Copyright?</h2>
      <p>
        Rick and Morty is created by Justin Roiland and Dan Harmon for{" "}
        <ExternalLink link='https://www.adultswim.com/'>
          Adult Swim
        </ExternalLink>
        . The data and images are used without claim of ownership and belong to
        their respective owners.
      </p>
      <p>This API is open source and uses a BSD license.</p>
      <h2>React Project</h2>
      <p>
        Created by{" "}
        <ExternalLink link='https://github.com/AurelMark' bold={true}>
          Aurel Mark
        </ExternalLink>{" "}
        just for fun on React Framwwork
      </p>
    </div>
  );
};

export default About;
