'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var React = require('react');

import viewDispatch from '../view-dispatch';
import * as appActions from '../../../actions';

var Alert = require('./alert.jsx');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

var AlertArea = React.createClass({
  getDefaultProps: function () {
    return {
      alerts: []
    };
  },
  render: function () {
    return (
      <div className="error-container">
        {this.props.alerts.map(function (alert) {
          return (
            <Alert
              key={alert.id}
              type={alert.type}
              onClose={function () {
                viewDispatch(appActions.closeAlert(alert.id))
              }}
            >
              <p>
                {alert.message}
              </p>
              <p>
                {(alert.buttons || []).map(function (button, index) {
                  return [
                    <button
                      className={'btn btn-' + button.type}
                      onClick={function () {
                        if (button.role === 'appAction') {
                          viewDispatch(button.appAction);
                        }
                        viewDispatch(appActions.closeAlert(alert.id));
                      }}
                    >
                      {button.title}
                    </button>,
                    ' '
                  ];
                })}
              </p>
            </Alert>
          );
        })}
      </div>
    );
  }
});

module.exports = AlertArea;