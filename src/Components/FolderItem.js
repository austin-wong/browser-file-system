import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
}

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
`;

const FolderIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const getFolderItemName = (folderItem) => last(folderItem.path.split('/'));

const FolderItem = (props) => {
  const { folderItem, getChildFolderItems, level, onToggle, onFolderItemSelect, delItem, renameItem } = props;

  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={folderItem.type}>
      <button onClick={() => delItem(folderItem)} style={btnStyle}>x</button> 
      {/* <button onClick={() => renameItem(folderItem)}> Rename </button> */}

        <FolderIcon onClick={() => onToggle(folderItem)}>
          { folderItem.type === 'folder' && (folderItem.isOpen  ? <FaChevronDown /> : <FaChevronRight />) } 
        </FolderIcon>
        
        <FolderIcon marginRight={10}>
          { folderItem.type === 'file' && <FaFile /> }
          { folderItem.type === 'folder' && folderItem.isOpen === true && <FaFolderOpen /> }
          { folderItem.type === 'folder' && !folderItem.isOpen && <FaFolder /> }
        </FolderIcon>

        <span role="button" onClick={() => onFolderItemSelect(folderItem)}>
          { getFolderItemName(folderItem) }
        </span>
      </StyledTreeNode>
      
    { folderItem.isOpen && getChildFolderItems(folderItem).map(childFolderItem => (
      <FolderItem
        {...props}
        folderItem={childFolderItem}
        level={level + 1}
      />
    ))}
  </React.Fragment>
  
  );
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '3px 6px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}


// export class FolderItem extends Component {
//   render() {
//     // Destructure
//     const { id, title } = this.props.folder
//     return (
//       / / Controls background color of each folder
//       <div style={itemStyle}>
//         <p>
//         { this.props.folder.title }
//         <button onClick={this.props.delFolder.bind(this, id)} style=
//         {btnStyle}>x</button>
//         </p>
//       </div>
//     )
//   }
// }


// PropTypes
FolderItem.propTypes = {
  folder: PropTypes.object.isRequired,
  getChildFolderItems: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFolderItemSelect: PropTypes.func.isRequired,
  delItem: PropTypes.func.isRequired,
  renameItem: PropTypes.func.isRequired
};

FolderItem.defaultProps = {
  level: 0,
};

// const btnStyle = {
//   background: '#ff0000',
//   color: '#fff',
//   border: 'none',
//   padding: '5px 9px',
//   borderRadius: '50%',
//   cursor: 'pointer',
//   float: 'right'
// }

// const itemStyle = {
//   backgroundColor: '#f4f4f4'
// }

export default FolderItem
