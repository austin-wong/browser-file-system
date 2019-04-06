import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class FolderItem extends Component {
  render() {
    // Destructure
    const { id, title } = this.props.folder
    return (
      // Controls background color of each folder
      <div style={itemStyle}>
        <p>
        { this.props.folder.title }
        <button onClick={this.props.delFolder.bind(this, id)} style=
        {btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

// PropTypes
FolderItem.propTypes = {
  folder: PropTypes.object.isRequired
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

const itemStyle = {
  backgroundColor: '#f4f4f4'
}

export default FolderItem
