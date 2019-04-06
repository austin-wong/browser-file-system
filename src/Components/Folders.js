import React, { Component } from 'react';
import FolderItem from './FolderItem';
import PropTypes from 'prop-types';

class Folders extends Component {
  render() {
    console.log(this.props.folders)
    return this.props.folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} 
        delFolder={this.props.delFolder}/>
    ));
  }
}

// PropTypes
Folders.propTypes = {
  folders: PropTypes.array.isRequired
}

export default Folders;
