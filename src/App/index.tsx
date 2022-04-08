import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NotFound from "pages/404";
import CurrencyExchange from "../pages/CurrencyExcange";
import GraphqlPage from "../pages/GraphqlPage";
import { PokerRoom } from "../pages/PokerRoom";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PokerRoom} />
        <Route path="/currency-exchange" component={CurrencyExchange} />
        <Route path="/graphql" component={GraphqlPage} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
