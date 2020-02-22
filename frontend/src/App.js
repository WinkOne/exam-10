import React from 'react';
import './App.css';
import {NavLink as RouterNavLink} from "react-router-dom";
import {Button, Container, Navbar, NavbarBrand} from "reactstrap";
import {Route, Switch} from "react-router";
import Main from "./containers/Main";
import NewNews from "./containers/NewNews";
import News from "./containers/News";

function App() {
    return (
        <div className="App">
            <header>
                <Navbar color="light" light expand="md">
                    <Container>
                        <NavbarBrand tag={RouterNavLink} to={"/"}><Button outline color="primary">News</Button></NavbarBrand>
                    </Container>
                </Navbar>
            </header>
            <Switch>
                <Route path={"/"} exact component={Main}/>
                <Route path={"/new"} exact component={NewNews}/>
                <Route path={"/new/:id"} component={News}/>
                <Route render={() => <h1>Not found</h1>}/>
            </Switch>
        </div>
    );
}

export default App;
