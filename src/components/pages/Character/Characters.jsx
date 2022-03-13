import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCharacterList, getCharacterListFilter } from "actions/character";
import Loading from "components/Loading/Loading";
import Cards from "components/Cards/Cards";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import fuck from "images/fuck2.png";

import Pagination from "@mui/material/Pagination";

import styles from "./Characters.scss";
import { Button } from "@mui/material";
import classNames from "classnames";

const Characters = ({
  characters,
  getCharacterList,
  getCharacterListFilter,
  loading,
  pages,
  total,
  notFound
}) => {
  const [page, setPage] = useState(pages);
  const [filter, setFilter] = useState({
    status: "",
    gender: "",
    name: ""
  });

  const [genderFilter] = useState([
    "",
    "female",
    "male",
    "genderless",
    "unknown"
  ]);

  const [statusFilter] = useState(["", "alive", "dead", "unknown"]);

  const handlePage = (event) => {
    setPage(event.target.value);
    getCharacterListFilter(filter, event.target.value);
  };

  const handleGender = (event) => {
    setFilter((oldValue) => ({
      ...oldValue,
      gender: event.target.value
    }));
  };

  const handleName = (event) => {
    setFilter((oldValue) => ({
      ...oldValue,
      name: event.target.value
    }));
  };

  const handleStatus = (event) => {
    setFilter((oldValue) => ({
      ...oldValue,
      status: event.target.value
    }));
  };

  useLayoutEffect(() => {
    getCharacterList();
  }, []);

  useEffect(() => {
    setPage(pages);
  }, [pages]);

  const handleChange = (e) => {
    getCharacterListFilter(filter, Number(e.target.textContent));
  };

  const showTotalEl = (total) => {
    return Array.from(Array(total)).map((_, i) => (
      <MenuItem key={i + 1} value={i + 1}>
        {i + 1}
      </MenuItem>
    ));
  };

  const showGenderEl = (gender) => {
    return gender.map((el, idx) => (
      <MenuItem key={idx} value={el}>
        {el}
      </MenuItem>
    ));
  };

  const searchCharacter = () => {
    getCharacterListFilter(filter, 1);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.CharactersFilter}>
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
          onChange={handleName}
          value={filter.name}
          label='Name'
          variant='outlined'
        />
        <FormControl fullWidth>
          <InputLabel id='gender'>Gender</InputLabel>
          <Select
            labelId='gender'
            id='gender'
            value={filter.gender}
            label='Gender'
            onChange={handleGender}
          >
            {showGenderEl(genderFilter)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='status'>Status</InputLabel>
          <Select
            labelId='status'
            id='status'
            value={filter.status}
            label='Status'
            onChange={handleStatus}
          >
            {showGenderEl(statusFilter)}
          </Select>
        </FormControl>
        {notFound && (
          <div className={styles.CharactersSubmitSecond}>
            <Button onClick={searchCharacter} variant='contained' size='large'>
              Search
            </Button>
          </div>
        )}
      </div>
      <div className={styles.CharactersSearch}>
        {!notFound && (
          <Button onClick={searchCharacter} variant='contained' size='large'>
            Search
          </Button>
        )}
      </div>
      <div className={classNames({ [`${styles.Characters}`]: !notFound })}>
        {notFound ? (
          <div className={styles.CharactersImage}>
            <h3 className={styles.CharactersText}>Try again...</h3>
            <img src={fuck} />
          </div>
        ) : (
          characters && characters.map((el) => <Cards key={el.id} item={el} />)
        )}
      </div>
      {!notFound && (
        <div className={styles.CharactersPagination}>
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
  characters: state.character.characters,
  loading: state.character.loading,
  pages: state.character.pages,
  total: state.character.total,
  notFound: state.character.notFound
});

Characters.propTypes = {
  characters: PropTypes.array,
  getCharacterList: PropTypes.func,
  getCharacterListFilter: PropTypes.func,
  loading: PropTypes.bool,
  pages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.number,
  notFound: PropTypes.bool
};

export default connect(mapStateToProps, {
  getCharacterList,
  getCharacterListFilter
})(Characters);
