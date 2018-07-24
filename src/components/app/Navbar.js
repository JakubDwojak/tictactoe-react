import React from 'react';

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = ({ match }) => (
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <IndexLinkContainer to="/">
          <Navbar.Brand
            className="nav-logo"
          >
            TIC TAC TOE
          </Navbar.Brand>
        </IndexLinkContainer>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav
          pullRight
          justified
        >
          <IndexLinkContainer to="/">
            <NavItem
              className="nav-item"
            >
              Home
          </NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/game">
            <NavItem
              className="nav-item"
            >
              Game
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/history">
            <NavItem
              className="nav-item"
            >
              History
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
