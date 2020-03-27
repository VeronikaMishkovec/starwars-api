import React from "react";
import { Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import PeopleContainer from "../app/containers/PeopleContainer/peopleContainer";
import PersonInfo from "../app/containers/PersonInfo";
import history from "./history";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={"/"} component={PeopleContainer} exact />
        <Route path={"/person/:id"} exact children={<Person />}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

const Person = () => {
  let { id } = useParams();
  return <PersonInfo id={id} />;
};

export default Routes;
