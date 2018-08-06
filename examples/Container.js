import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withRouter, Switch, Link, Redirect, Route} from 'react-router-dom';

import styles from './styles.module.css';

const GoogleApiWrapper = __IS_DEV__
  ? require('../src/index').GoogleApiWrapper
  : require('../dist').GoogleApiWrapper;

class Container extends Component {
  static propTypes = {};

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const {children, routes, routeDef} = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <ul>
              {routes.map(route => (
                <Link key={route.path} to={route.path}>
                  <li>{route.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <div className={styles.content}>
          

            <Switch>
              {routes.map(route => (
                <Route
                  key={route.name}
                  path={route.path}
                  routeDef={route}
                  routes={routes}
                  render={routingProps => (
                    <div>
                      <route.component
                        {...routingProps}
                        google={this.props.google}
                        loaded={this.props.loaded}
                      />
                    </div>
                  )}
                />
              ))}
              <Redirect path="*" to={'/basic'} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const Loading = () => <div>Fancy loading container</div>;

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyAQ6YdJQNioPpb3uiJ6JviM_sBJngu9Y4s',
    libraries: ['places', 'visualization'],
    LoadingContainer: Loading
  })(Container)
);
