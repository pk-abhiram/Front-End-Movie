import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { deleteTheatreByID, fetchTheatre } from '../Actions/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export const CustomLocaleTextGrid = () => {
  const dispatch = useDispatch();
  const [del, setDel] = React.useState(false); //State to refresh after delete
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  function enterPassword(theatreId) {
    handleClickOpen();
    setId(theatreId);
  }

  function deleteTheatre(id) {
    console.log(password);

    if (password === 'password') {
      dispatch(deleteTheatreByID(id));
      setDel(!del);

      return <div>{console.log('Deleted' + id)}</div>;
    } else {
      alert('Incorrect Password');
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchTheatre());
    handleClose();
  }, [del, dispatch]); //To fetch after deletion

  const theatres = useSelector((state) => state.theatres);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const options = theatres.map(function (row) {
    return {
      id: row.theatreId,
      name: row.theatreName,
      theatreCity: row.theatreCity,
      managerName: row.managerName,
      managerContact: row.managerContact,
      link: row.theatreId,
      delete: row.theatreId,
    };
  });

  const rows: GridRowsProp = options;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Theatre Name', width: 180 },
    { field: 'theatreCity', headerName: 'Theatre City', width: 180 },
    { field: 'managerName', headerName: 'Manager Name', width: 200 },
    { field: 'managerContact', headerName: 'Manager Contact', width: 200 },
    {
      field: 'link',
      headerName: 'More Details',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Link
            variant='contained'
            color='primary'
            size='small'
            style={{ marginLeft: 16 }}
            to={'/theatre/detail/' + params.value}
          >
            View
          </Link>
        </strong>
      ),
    },
    {
      field: 'delete',
      headerName: 'DELETE',
      width: 130,
      renderCell: (params: GridCellParams) => (
        <Link to={'/theatre'} style={{ marginLeft: 16, width: '1rem' }}>
          <Button
            onClick={() => enterPassword(params.value)}
            variant='contained'
            color='secondary'
            size='small'
            style={{ margin: 3, width: '1rem' }}
          >
            X
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ height: 600 }}>
      <Link to='/theatre/addTheatre'>
        <Button
          variant='contained'
          color='primary'
          size='medium'
          style={{ margin: 3 }}
        >
          Add Theatre
        </Button>
      </Link>
      <br />
      {(loading && <h4>Loading...</h4>) ||
        (error && <h4>{error}</h4>) ||
        (options.length === 0 && <h4>EMPTY</h4>) || (
          <DataGrid
            density='compact'
            disableExtendRowFullWidth='true'
            checkboxSelection={false}
            columns={columns}
            rows={rows}
            localeText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
              toolbarDensityCompact: 'Small',
              toolbarDensityStandard: 'Medium',
              toolbarDensityComfortable: 'Large',
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter password :</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteTheatre(id);
            }}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
