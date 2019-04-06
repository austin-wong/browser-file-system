import React, { Component } from 'react';
import Header from './Components/Layout/Header'
import Folders from './Components/Folders';
import AddFolder from './Components/AddFolder';
import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    folders: [
      {
        id: uuid.v4(),
        title: 'Hello1'
      },
      {
        id: uuid.v4(),
        title: 'Hello2'
      },
      {
        id: uuid.v4(),
        title: 'Hello3'
      }
    ]
  }

  // Delete Folder
  delFolder = (id) => {
    // Filters out the ids of the folders not being deleted
    this.setState({ folders: [...this.state.folders.filter(folder => folder.id
      !== id)] });
  }

  // Add Folder
  addFolder = (title) => {
    const newFolder = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ folders: [...this.state.folders, newFolder]});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddFolder addFolder={this.addFolder}/>
          <Folders folders={this.state.folders} 
          delFolder={this.delFolder}/>
        </div>
      </div>
    );
  }
}

export default App;
