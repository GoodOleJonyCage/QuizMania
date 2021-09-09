import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
      return (
          <Container className="col-xl-9 col-lg-8 noborder">
          {this.props.children}
        </Container>
    );
  }
}
