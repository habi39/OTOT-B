
import './App.css';
import { useEffect , useState } from 'react';
import { createContacts, deleteContacts, getAllContacts, updateContact } from './api/contact';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';

import {
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";


function App() {
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [action, setAction] = useState("Add")
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleChange = (event) => {
    setAction(event.target.value)
  }
  const handleSubmit = async () => {
    try {
      if(action==="Add"){
        const res = await createContacts({name:name,gender:gender,email:email,phone:phone})
        if (res.data){
        }
      }
      if(action==="Update"){
        const res = await updateContact({id:id,name:name,gender:gender,email:email,phone:phone})
        if (res.data){
        }
      }
      if(action==="Delete"){
        const res = await deleteContacts({id:id})
        if (res.data){
        }
      }
      fetchData()
    }catch(err){
      console.log(err)
    }
    
  }
  const fetchData = async () =>{
    const allcontacts = await getAllContacts()
    setContacts(allcontacts.data.contacts)
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Box display={"flex"} flexDirection={"column"}  margin="30px" padding="30px">
      <Typography variant={"h3"} align="center" marginBottom={"10px"}>Contact List </Typography>
      <TableContainer component={Paper} align="center">
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="5px">ID</TableCell>
            <TableCell align="center"width="5px">Name</TableCell>
            <TableCell align="center"width="10px">Email</TableCell>
            <TableCell align="center" width="10px">Gender</TableCell>
            <TableCell align="center"width="10px">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row._id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={contacts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        
      </Table>
    </TableContainer>
    <Box display={"flex"} flexDirection={"row"}  margin="10px" padding="10px" width="100%" justify-content="space-between">
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="Action"
          onChange={handleChange}
        >
          <MenuItem value={"Add"}>Add</MenuItem>
          <MenuItem value={"Update"}>Update</MenuItem>
          <MenuItem value={"Delete"}>Delete</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Box>
    {action==="Add"?
    <Box display={"flex"} flexDirection={"row"}  margin="10px" padding="10px" width="100%" justify-content="space-between">
    <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />
      <br></br>
      <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      <br></br>
      <TextField
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      <br></br>
      <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      </Box>:
      action==="Update"?
      <Box display={"flex"} flexDirection={"row"}  margin="10px" padding="10px" width="100%" justify-content="space-between">
      <TextField
                  label="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  autoFocus
              />
      <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />
      <br></br>
      <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      <br></br>
      <TextField
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      <br></br>
      <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
      </Box>
      : action==="Delete"?<Box display={"flex"} flexDirection={"row"}  margin="10px" padding="10px" width="100%" justify-content="space-between">
      <TextField
                  label="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  autoFocus
              />
        <br></br>
        </Box>:<br></br>}
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Button variant={"outlined"} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
}

export default App;
