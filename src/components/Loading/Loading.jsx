import React, { useLayoutEffect } from "react";

import PropTypes from "prop-types";

import styles from "./Loading.scss";
import loading1 from "images/picklerick.gif";
import loading2 from "images/loading2.gif";
import loading3 from "images/morty.gif";

import { numLoading } from "actions/system";
import { connect } from "react-redux";

const Loading = ({ numLoading, num }) => {
  const dontRepeatNum = () => {
    const nums = Math.floor(Math.random() * 3 + 1);
    if (nums != num) {
      numLoading(nums);
    } else {
      dontRepeatNum();
    }
  };

  useLayoutEffect(() => {
    dontRepeatNum();
  }, []);

  const loadingRandom = () => {
    switch (num) {
      case 1:
        return loading1;
      case 2:
        return loading2;
      case 3:
        return loading3;
      default:
        return loading2;
    }
  };

  return (
    <div className={styles.Loading}>
      <img src={loadingRandom()} />
      <h3 className={styles.LoadingTitle}>Loading...</h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  num: state.system.num
});

Loading.propTypes = {
  num: PropTypes.number,
  numLoading: PropTypes.func
};

export default connect(mapStateToProps, { numLoading })(Loading);
