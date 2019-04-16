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
    children: ['/root/test1', '/root/test2'],
  },
  '/root/test1': {
    path: '/root/test1',
    type: 'folder',
    children: ['/root/test1/readme.md'],
  },
  '/root/test1/readme.md': {
    path: '/root/test1/readme.md',
    type: 'file',
    content: 'There is nothing here.'
  },
  '/root/test2': {
    path: '/root/test2',
    type: 'folder',
    children: ['/root/test2/pictures', '/root/test2/videos'],
  },
  '/root/test2/pictures': {
    path: '/root/test2/pictures',
    type: 'folder',
    children: ['/root/test2/pictures/vacation'],
  },
  '/root/test2/pictures/vacation': {
    path: '/root/brandon/projects/vacation',
    type: 'folder',
    children: [],
  },
  '/root/test2/videos': {
    path: '/root/test2/videos',
    type: 'folder',
    children: [],
  },
};

class Folders extends Component {

  constructor(props) {
    super(props);
    this.addFolder = this.addFolder.bind(this);
  }

  state = {
    folderItems: data,
  };

  // Add Folder
  addFolder = (title, path, type, children, isRoot) => {
    const newFolder = {
      title: title,
      path: path + '/' + title,
      isRoot: isRoot,
      type: type,
      children: children,
      completed: false
    }
    data[newFolder.path] = newFolder;
    this.setState({state: this.state}, function (){
      this.forceUpdate();
    });
  }

  renameItem = (folderItem) => {
    this.setState();
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

  // Delete Item
  delItem = (folderItem) => {
    delete data[folderItem.path];
    for (var key in data) {
      if (key.includes(folderItem.path)) {
        delete data[folderItem.path];
      }
    }
    this.setState(data) ;
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
        <AddFolder addFolder={this.addFolder} />
        { rootFolderItems.map(folderItem => (
          <FolderItem
            folderItem={folderItem}
            getChildFolderItems={this.getChildFolderItems}
            onToggle={this.onToggle}
            onFolderItemSelect={this.onFolderItemSelect}
            delItem={this.delItem}
            renameItem={this.renameItem}
          />
        ))}
        
      </div>
      
        
    )
  }
}

Folders.propTypes = {
  // folders: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};




export default Folders;
