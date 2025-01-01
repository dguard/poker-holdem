import React from "react";
import { Switch, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import NotFound from "pages/404";
import CurrencyExchange from "../pages/CurrencyExcange";
import GraphqlPage from "../pages/GraphqlPage";
import { PokerRoom } from "../pages/PokerRoom";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={PokerRoom} />
        <Route path="/currency-exchange" component={CurrencyExchange} />
        <Route path="/graphql" component={GraphqlPage} />

        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default App;
