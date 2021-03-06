import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import color from '@cdo/apps/util/color';
import onClickOutside from 'react-onclickoutside';
import FontAwesome from '@cdo/apps/templates/FontAwesome';

const styles = {
  main: {
    display: 'inline-block'
  },
  dropdown: {
    border: `1px solid ${color.charcoal}`,
    position: 'absolute'
  },
  anchor: {
    padding: 10,
    color: color.charcoal,
    backgroundColor: color.white,
    fontFamily: '"Gotham 5r", sans-serif',
    display: 'block',
    textDecoration: 'none',
    lineHeight: '20px',
    transition: 'background-color .2s ease-out',
    ':hover': {
      backgroundColor: color.lightest_gray,
      cursor: 'pointer'
    }
  },
  nonFirstAnchor: {
    borderTop: `1px solid ${color.charcoal}`
  }
};

/**
 * A button that drops down to a set of clickable links, and closes itself if
 * you click on the button, or outside of the dropdown.
 */
export const JavalabSettings = class JavalabSettingsComponent extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: props => {
      React.Children.map(props.children, child => {
        if (child.type !== 'a') {
          throw new Error('only accepts children of type <a/>');
        }
        if (!child.props.onClick) {
          throw new Error('each child must have an href or onclick');
        }
      });
    }
  };

  state = {
    dropdownOpen: false
  };

  expandDropdown = () => {
    this.setState({dropdownOpen: true});
  };

  collapseDropdown = () => {
    this.setState({dropdownOpen: false});
  };

  handleClickOutside = () => {
    if (this.state.dropdownOpen) {
      this.collapseDropdown();
    }
  };

  toggleDropdown = () => {
    if (this.state.dropdownOpen) {
      this.collapseDropdown();
    } else {
      this.expandDropdown();
    }
  };

  onClickChild = (event, childProps) => {
    this.collapseDropdown();
    childProps.onClick(event);
  };

  render() {
    const {style} = this.props;
    const {dropdownOpen} = this.state;

    return (
      <div style={styles.main}>
        <button type="button" style={style} onClick={this.toggleDropdown}>
          <FontAwesome icon="cog" className="fa-2x" />
          <br />
          Settings
        </button>

        {dropdownOpen && (
          <div style={styles.dropdown} ref={ref => (this.dropdownList = ref)}>
            {React.Children.map(this.props.children, (child, index) => (
              <a
                {...child.props}
                onClick={event => this.onClickChild(event, child.props)}
                key={index}
                style={{
                  ...styles.anchor,
                  ...(index > 0 && styles.nonFirstAnchor),
                  ...child.props.style
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default onClickOutside(Radium(JavalabSettings));
