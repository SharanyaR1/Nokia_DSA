import React, { Component } from 'react';

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'Project'
    };
  }

  handleItemClick = (item) => {
    this.setState({ selectedItem: item });
    // Add logic to handle navigation or other actions based on the selected item
  };

  render() {
    const { selectedItem } = this.state;

    return (
      <div className="left-nav-bar">
        <ul>
          <li className={selectedItem === 'Project' ? 'selected' : ''} onClick={() => this.handleItemClick('Project')}>
            Project details
          </li>
          <li className={selectedItem === 'NextPage' ? 'selected' : ''} onClick={() => this.handleItemClick('NextPage')}>
            Dimensioning Input
          </li>
          <li>
            Dimensioning Output
          </li>
          <li>
            Production
          </li>
          <li>
            Manage
          </li>
          <li>
            Observe
          </li>
        </ul>
      </div>
    );
  }
}

export default sidebar;
