import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getLocationSingle } from "actions/location";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading/Loading";

import styles from "./Location.scss";
import { Button } from "@mui/material";

const Location = ({
  loading,
  location,
  notFound,
  getLocationSingle,
  characters
}) => {
  const history = useNavigate();
  const { locationId } = useParams();

  useLayoutEffect(() => {
    getLocationSingle(locationId);
  }, []);

  useEffect(() => {
    if (notFound) {
      history("/location");
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.Location}>
        <div className={styles.LocationData}>
          <h2>{location?.name}</h2>
        </div>
        <div className={styles.LocationDetails}>
          <strong>Dimension:</strong>
          <div>{location?.dimension}</div>
          <strong>Created:</strong>
          <div>{`${new Date(location?.created).toLocaleDateString()} ${new Date(
            location?.created
          ).toLocaleTimeString()}`}</div>
          <strong>Type:</strong>
          <div>{location?.type}</div>
        </div>
      </div>
      <div className={styles.LocationCharacters}>
        <strong>Characters:</strong>
        <div>
          {characters?.map((el) => {
            const { id, name } = el.data;
            return (
              <Button
                variant='outlined'
                size='small'
                onClick={() => history(`/character/${id}`)}
                key={id}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.location.loading,
  location: state.location.location,
  notFound: state.location.notFound,
  characters: state.location.characters
});

Location.propTypes = {
  location: PropTypes.object,
  characters: PropTypes.array,
  getLocationSingle: PropTypes.func,
  loading: PropTypes.bool,
  notFound: PropTypes.bool
};

export default connect(mapStateToProps, { getLocationSingle })(Location);
