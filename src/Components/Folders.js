import React, { Component } from 'react';
import FolderItem from './FolderItem';
import PropTypes from 'prop-types';
import values from 'lodash/values'
import AddFolder from './AddFolder'

const data = {
  '/a': {
    path: '/a',
    type: 'folder',
    isRoot: true,
    children: []
  },
  '/root': {
    path: '/root',
    type: 'folder',
    isRoot: true,
    children: ['/root/austin', '/root/brandon'],
  },
  '/root/austin': {
    path: '/root/austin',
    type: 'folder',
    children: ['/root/austin/readme.md'],
  },
  '/root/austin/readme.md': {
    path: '/root/austin/readme.md',
    type: 'file',
    content: 'There is nothing here.'
  },
  '/root/brandon': {
    path: '/root/brandon',
    type: 'folder',
    children: ['/root/brandon/projects', '/root/brandon/vblogs'],
  },
  '/root/brandon/projects': {
    path: '/root/brandon/projects',
    type: 'folder',
    children: ['/root/brandon/projects/treeview'],
  },
  '/root/brandon/projects/treeview': {
    path: '/root/brandon/projects/treeview',
    type: 'folder',
    children: [],
  },
  '/root/brandon/vblogs': {
    path: '/root/brandon/vblogs',
    type: 'folder',
    children: [],
  },
};

class Folders extends Component {
  state = {
    folderItems: data,
  };

  // Add Folder
  addFolder = (title, path, type, children) => {
    const newFolder = {
      title: title,
      path: "/" + title,
      isRoot: true,
      type: type,
      children: children,
      completed: false
    }
    this.setState(data[path] = newFolder); // Look into this
  }

  // Returns top-level folder
  getRootFolderItems = () => {
    const { folderItems } = this.state;
    return values(folderItems).filter(folderItem => folderItem.isRoot === true);
  }

  // Returns array of children folders from a folder 
  getChildFolderItems = (folderItem) => {
    const { folderItems } = this.state;
    if (!folderItem.children) return [];
    return folderItem.children.map(path => folderItems[path]);
  }

  // Toggles whether or not a folder is open or not
  onToggle = (folderItem) => {
    const { folderItems } = this.state;
    folderItems[folderItem.path].isOpen = !folderItem.isOpen;
    this.setState({ folderItems });
  }

  // Tracks whether or not a folder item is selected or not
  onFolderItemSelect = folderItem => {
    const { onSelect } = this.props;
    onSelect(folderItem);
  }

  // render() {
  //   console.log(this.props.folders)
  //   return this.props.folders.map((folder) => (
  //       <FolderItem key={folder.id} folder={folder} 
  //       delFolder={this.props.delFolder}/>
  //   ));
  // }

  render() {
    const rootFolderItems = this.getRootFolderItems();
    return (
      <div>
        { rootFolderItems.map(folderItem => (
          <FolderItem
            folderItem={folderItem}
            getChildFolderItems={this.getChildFolderItems}
            onToggle={this.onToggle}
            onFolderItemSelect={this.onFolderItemSelect}
          />
        ))}
        <AddFolder addFolder={this.addFolder} />
      </div>
      
        
    )
  }
}

// PropTypes
Folders.propTypes = {
  // folders: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};




export default Folders;
