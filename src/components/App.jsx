import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "components/Layout/Layout";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import Homepage from "pages/Homepage/Homepage";
import About from "pages/About/About";
import Dashboard from "pages/Dashboard/Dashboard";
import Characters from "pages/Character/Characters";
import Character from "pages/Character/Character";
import Locations from "pages/Location/Locations";
import Location from "pages/Location/Location";
import Episodes from "pages/Episode/Episodes";
import Episode from "pages/Episode/Episode";
import NotFound from "pages/NotFound/NotFound";

import "styles/base.scss";

const outerContent = (template) => {
  return <Layout>{template}</Layout>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Homepage />} />
        <Route path='/dashboard' index element={outerContent(<Dashboard />)} />
        <Route path='/about' index element={outerContent(<About />)} />
        <Route path='/character'>
          <Route index={true} element={outerContent(<Characters />)} />
          <Route
            index={false}
            path=':charId'
            element={outerContent(<Character />)}
          />
        </Route>
        <Route path='/episode'>
          <Route index={true} element={outerContent(<Episodes />)} />
          <Route
            index={false}
            path=':episodeId'
            element={outerContent(<Episode />)}
          />
        </Route>
        <Route path='/location'>
          <Route index={true} element={outerContent(<Locations />)} />
          <Route
            index={false}
            path=':locationId'
            element={outerContent(<Location />)}
          />
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  redirectLink: state.system.redirectLink
});

App.propTypes = {
  redirectLink: PropTypes.string
};

export default connect(mapStateToProps, {})(App);
