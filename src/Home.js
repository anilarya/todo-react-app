import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, Grid } from '@mui/material';
import StatusList from './StatusList';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [inputStatus, setInputStatus] = useState('Todo');
  const [submittedTexts, setSubmittedTexts] = useState([]);
  const [setIsEditing] = useState(null);
  const [setEditValue] = useState('');
  const [setEditStatus] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setInputStatus(event.target.value);
  };

  const handleButtonClick = () => {
    const newItem = {
      id: Date.now(),
      text: inputValue,
      status: inputStatus
    };
    setSubmittedTexts([...submittedTexts, newItem]);
    setInputValue('');
    setInputStatus('Todo');
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditValue(submittedTexts[index].text);
    setEditStatus(submittedTexts[index].status);
  };

  const handleEditSave = (id, newText, newStatus) => {
    const updatedTexts = [...submittedTexts];
    const updatedItems = updatedTexts.find(item => item.id === id);
    updatedItems.text = newText;
    updatedItems.status =  newStatus ;
    setSubmittedTexts(updatedTexts);
    setIsEditing(null);
  };

  const handleEditCancel = () => {
    setIsEditing(null);
  };

  const handleDeleteClick = (id) => { 
    const updatedTexts = [...submittedTexts];
    const updatedItems = updatedTexts.filter(item => item.id !== id);
    setSubmittedTexts(updatedItems); 
  };

  const todoItems = submittedTexts.filter(item => item.status === 'Todo');
  const inProgressItems = submittedTexts.filter(item => item.status === 'Inprogress');
  const doneItems = submittedTexts.filter(item => item.status === 'Done');

  return (
    <div className='homecenter'>
      <h2>Home Page</h2>
      <p>Welcome to the Home Page!</p>
      <Box display="flex" alignItems="center" justifyContent="center" height="10vh" flexDirection="column">
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            placeholder="Enter text"
            value={inputValue}
            onChange={handleInputChange}
            sx={{ marginRight: 1, minWidth: 300 }}
          />
          <Select
            value={inputStatus}
            onChange={handleStatusChange}
            displayEmpty
            sx={{ marginRight: 1 }}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="Inprogress">Inprogress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            ADD
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item sx={{ minWidth: 360 }}>
          <StatusList
            title="Todo"
            items={todoItems}
            handleEditSave={handleEditSave}
            handleEditCancel={handleEditCancel}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Grid>
        <Grid item sx={{ minWidth: 360 }}>
          <StatusList
            title="In Progress"
            items={inProgressItems}
            handleEditSave={handleEditSave}
            handleEditCancel={handleEditCancel}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Grid>
        <Grid item sx={{ minWidth: 360 }}>
          <StatusList
            title="Done"
            items={doneItems}
            handleEditSave={handleEditSave}
            handleEditCancel={handleEditCancel}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
