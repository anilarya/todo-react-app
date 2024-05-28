import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper, IconButton, TextField, Select, MenuItem, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const StatusList = ({
  title,
  items,
  handleEditSave,
  handleEditCancel,
  handleEditClick,
  handleDeleteClick
}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  const handleSave = (id) => {
    handleEditSave(id, editValue, editStatus);
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    handleEditCancel();
  };

  const handleEdit = (index, text, status) => {
    setIsEditing(index);
    setEditValue(text);
    setEditStatus(status);
    handleEditClick(index);
  };

  const handleDelete = (id) => { 
    handleDeleteClick(id);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, mb: 2 }}>
      <Paper elevation={2}>
        <Box p={2}>
          <h3>{title}</h3>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={item.id}
                sx={{
                  mb: 1,
                  wordWrap: 'break-word'
                }}
              >
                {isEditing === index ? (
                  <>
                    <TextField
                      variant="outlined"
                      value={editValue}
                      onChange={handleEditChange}
                      sx={{ marginRight: 1, minWidth: 100 }}
                    />
                    <Select
                      value={editStatus}
                      onChange={handleEditStatusChange}
                      displayEmpty
                      sx={{ marginRight: 1, bgcolor: 'white' }}
                    >
                      <MenuItem value="Todo">Todo</MenuItem>
                      <MenuItem value="Inprogress">Inprogress</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                    <IconButton color="primary" onClick={() => handleSave(item.id)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleCancel}>
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText primary={`(${index + 1}) - ${item.text}`} sx={{ wordBreak: 'break-word' }} />
                    <IconButton color="primary" onClick={() => handleEdit(index, item.text, item.status)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() =>handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatusList;
