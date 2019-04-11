import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export class AddFolder extends Component {
  state = {
    titleFile: '',
    titleFolder: '',
    path: './root',
    type: '',
    children: []
  }

  onSubmitFile = (e) => {
      e.preventDefault();
      this.props.addFolder(this.state.titleFile, this.state.path, 'file', []);
      this.setState({ titleFile: '' });
      console.log("hi");
  }

  onSubmitFolder = (e) => {
    e.preventDefault();
    this.props.addFolder(this.state.titleFolder, this.state.path, 'folder', []);
    this.setState({ titleFolder: '' });
    console.log("hi");

}

  onChangeFile = (e) => this.setState({ titleFile: e.target.value });
  onChangeFolder = (e) => this.setState({titleFolder: e.target.value});

  render() {
    return (
      <DropdownButton id="dropdown-basic-button" title="New" style={{float: 'right'}}>
        <Dropdown.Item> 
          <form onSubmit={this.onSubmitFile} style={{display: 'flex'}}>
            <input
              type="text"
              name="title"
              style={{ flex: '10', padding: '5px' }} 
              placeholder="Add File ..."
              value = {this.state.title}
              onChangeFile={this.onChangeFile}
            />
            <input 
              type="submit" 
              value="Submit"
              className="btn"
              style={{flex: '1'}} 
            />
          </form>
        </Dropdown.Item>
        
        <Dropdown.Item>
          <form onSubmit={this.onSubmitFolder} style={{display: 'flex'}}>
            <input
              type="text"
              style={{ flex: '10', padding: '5px' }} 
              placeholder="Add Folder ..."
              value = {this.state.title}
              onChangeFolder={this.onChangeFolder}
            />
            <input 
              type="submit" 
              value="Submit"
              className="btn"
              style={{flex: '1'}} 
            />
          </form>
        </Dropdown.Item>
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
