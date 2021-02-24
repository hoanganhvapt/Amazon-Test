import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Styles/style.scss";
import Header from "./App/Views/DefaultComponents/Header";
import Menu from "./App/Views/DefaultComponents/Menu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import ListProduct from "./App/Views/CustomComponents/ListProduct/ListProduct";
import { Container } from "@material-ui/core";

library.add(fab, fas, far);

const App = () => {
    let location = window.location.pathname;
    useEffect(() => {}, [location]);
    return (
        <Router>
            <Header />
            <Container maxWidth="xl" className="container" disableGutters={true}>
                <Menu location={location} />
                <Switch>
                    <Route exact path="/product">
                        <ListProduct />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
