var React = require('react');
var PropTypes = require('prop-types');

export default class FormsyStub extends React.Component {
  static childContextTypes = {
    formsy: PropTypes.object
  };

  getChildContext() {
    return {
      formsy: {
        attachToForm() { },
        detachFromForm() { },
        validate() { },
        isFormDisabled() { },
        isValidValue() { }
      }
    };
  }

  render() {
    return (this.props.children);
  }
}