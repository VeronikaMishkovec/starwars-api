import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PeopleContainer from "../app/containers/PeopleContainer/peopleContainer";
import PersonInfo from "../app/containers/PersonInfo";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={"/person/:id?"}
          render={({ match }) => {
            console.log(match);
            return <PersonInfo id={match.params.id} />;
          }}
        />
        <Route path={"/"} component={PeopleContainer} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
