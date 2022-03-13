import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLocations, getLocationsFilter } from "actions/location";
import Loading from "components/Loading/Loading";

import styles from "./Locations.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField
} from "@mui/material";
import classNames from "classnames";
import fuck from "images/fuck2.png";
import { useNavigate } from "react-router-dom";

const Locations = ({
  getLocations,
  getLocationsFilter,
  loading,
  notFound,
  locations,
  pages,
  total
}) => {
  const history = useNavigate();
  useEffect(() => {
    getLocations();
  }, []);

  const [page, setPage] = useState(pages);
  const [filter, setFilter] = useState({
    name: "",
    type: "",
    dimension: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFilter((oldValue) => ({
      ...oldValue,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    getLocationsFilter(filter, Number(e.target.textContent));
  };

  const handlePage = (event) => {
    setPage(event.target.value);
    getLocationsFilter(filter, event.target.value);
  };

  useEffect(() => {
    setPage(pages);
  }, [pages]);

  const showTotalEl = (total) => {
    return Array.from(Array(total)).map((_, i) => (
      <MenuItem key={i + 1} value={i + 1}>
        {i + 1}
      </MenuItem>
    ));
  };

  const searchLocations = () => {
    getLocationsFilter(filter, 1);
  };

  const redirectToLocation = (id) => {
    history(`/location/${id}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.LocationsFilter}>
        {!notFound && (
          <FormControl fullWidth>
            <InputLabel id='page'>Page</InputLabel>
            <Select
              labelId='page'
              id='page'
              value={page}
              label='Page'
              onChange={handlePage}
            >
              {showTotalEl(total)}
            </Select>
          </FormControl>
        )}
        <TextField
          onChange={handleInputs}
          name='name'
          value={filter.name}
          label='Name'
          variant='outlined'
        />
        <TextField
          onChange={handleInputs}
          name='type'
          value={filter.type}
          label='Type'
          variant='outlined'
        />
        <TextField
          onChange={handleInputs}
          name='dimension'
          value={filter.dimension}
          label='Dimension'
          variant='outlined'
        />
        {notFound && (
          <div className={styles.LocationsSubmit}>
            <Button onClick={searchLocations} variant='contained' size='large'>
              Search
            </Button>
          </div>
        )}
      </div>
      <div className={styles.LocationsSearch}>
        {!notFound && (
          <Button onClick={searchLocations} variant='contained' size='large'>
            Search
          </Button>
        )}
      </div>
      <div className={classNames({ [`${styles.Locations}`]: !notFound })}>
        {notFound ? (
          <div className={styles.LocationsImage}>
            <h3 className={styles.LocationsText}>Try again...</h3>
            <img src={fuck} />
          </div>
        ) : (
          locations &&
          locations.map((el) => (
            <Button
              className={styles.LocationsItem}
              key={el.id}
              onClick={() => redirectToLocation(el.id)}
            >
              {el.name}
            </Button>
          ))
        )}
      </div>

      {!notFound && (
        <div className={styles.LocationsPagination}>
          <Stack spacing={2}>
            <Pagination
              onChange={handleChange}
              count={total}
              color='primary'
              defaultPage={pages || 1}
              showFirstButton={false}
              showLastButton={false}
              boundaryCount={2}
              hideNextButton
              hidePrevButton
            />
          </Stack>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  locations: state.location.locations,
  notFound: state.location.notFound,
  pages: state.location.pages,
  loading: state.location.loading,
  total: state.location.total
});

Locations.propTypes = {
  locations: PropTypes.array,
  getLocations: PropTypes.func,
  getLocationsFilter: PropTypes.func,
  loading: PropTypes.bool,
  pages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.number,
  notFound: PropTypes.bool
};

export default connect(mapStateToProps, { getLocations, getLocationsFilter })(
  Locations
);
