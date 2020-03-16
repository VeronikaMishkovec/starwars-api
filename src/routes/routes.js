import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PeopleContainer from "../app/containers/PeopleContainer/peopleContainer";
import PersonInfo from "../app/containers/PersonInfo";
import { history } from './history';

const Routes = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path={"/"} component={PeopleContainer} exact />
        <Route
          exact
          path={"/person/:id?"}
          render={({ match }) => {
            return <PersonInfo id={match.params.id} />;
          }}
        />
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
