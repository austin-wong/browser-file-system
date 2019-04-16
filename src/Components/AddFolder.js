import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'

export class AddFolder extends Component {
  state = {
    titleFile: '',
    titleFolder: '',
    path: '/root/austin', 
    type: '',
    children: []
  }

  constructor(props) {
    super(props);
  }

  // TODO: 
  onFolderItemClick = folderItem => {
    const { onClick } = this.props;
    onClick(folderItem);
  }

  // TODO: Return path of current folder item
  getFolderItemPath = folderItem => {
    const { folderItems } = this.state;
    
  }

  onSubmitFile = (e) => {
      e.preventDefault();
      this.props.addFolder(this.state.titleFile, this.state.path, 'file', []);
      this.setState({ titleFile: '' });
  }

  onSubmitFolder = (e) => {
    e.preventDefault();
    this.props.addFolder(this.state.titleFolder, this.state.path, 'folder', [], false);
    this.setState({ titleFolder: '' });
}

  onChangeFile = (e) => this.setState({ titleFile: e.target.value });
  onChangeFolder = (e) => this.setState({titleFolder: e.target.value});

  render() {
    return (
      <DropdownButton id="dropdown-basic-button" title="New" style={{float: 'right'}}>
          <form onSubmit={this.onSubmitFile} style={{display: 'flex'}}>
            <input
              type="text"
              name="title"
              style={{ flex: '10', padding: '5px' }} 
              placeholder="Add File ..."
              value = {this.state.title}
              onChange={this.onChangeFile}  // onChange callback
            />
            <input 
              type="submit" 
              value="Submit"
              className="btn"
              style={{flex: '1'}} 
            />
          </form>
          <form onSubmit={this.onSubmitFolder} style={{display: 'flex'}}>
            <input
              type="text"
              style={{ flex: '10', padding: '5px' }} 
              placeholder="Add Folder ..."
              value = {this.state.title}
              onChange={this.onChangeFolder}  //onChange callback
            />
            <input 
              type="submit" 
              value="Submit"
              className="btn"
              style={{flex: '1'}} 
            />
          </form>
      </DropdownButton>

      // <form onSubmit={this.onSubmit} style={{display: 'flex' }}>
      //     <input 
      //       type="text" 
      //       name="title"
      //       style={{ flex: '10', padding: '5px' }} 
      //       placeholder="Add Folder ..."
      //       value = {this.state.title}
      //       onChange={this.onChange}
      //     />
      //     <input 
      //       type="submit" 
      //       value="Submit"
      //       className="btn"
      //       style={{flex: '1'}} 
      //     />
      // </form>
    )
  }
}


export default AddFolder
