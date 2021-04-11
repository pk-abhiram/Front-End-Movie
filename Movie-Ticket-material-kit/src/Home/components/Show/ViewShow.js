import React, { useEffect } from 'react';
import { fetchShows } from '../Actions/ShowActions';
import { Button } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteShowByID } from '../Actions/ShowActions';
function ViewShow() {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.show.shows);
  const loading = useSelector((state) => state.screen.loading);
  useEffect(() => {
    dispatch(fetchShows());
  }, [dispatch]);

  const options = shows.map(function (row) {
    return {
      id: row.showId,
      showStartTime: row.showStartTime,
      showEndTime: row.showEndTime,
      showName: row.showName,
      delete: row.showId,
    };
  });

  const rows: GridRowsProp = options;

  const columns: GridColDef[] = [
    { field: 'showStartTime', headerName: 'showStartTime ', width: 180 },
    {
      field: 'showEndTime',
      headerName: 'showEndTime',
      width: 180,
    },
    {
      field: 'showName',
      headerName: 'showName ',
      width: 200,
    },

    {
      field: 'delete',
      headerName: 'DELETE',
      width: 180,
      renderCell: (params: GridCellParams) => (
        <Link to={'/admin/shows'} style={{ marginLeft: 16, width: '1rem' }}>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            style={{ margin: 2 }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </Link>
      ),
    },
  ];
  const handleDelete = (id) => {
    console.log('called');
    dispatch(deleteShowByID(id));
    window.location.reload();
  };
  return (
    <div>
      <div style={{ padding: '20px', margin: '30px' }}>
        {(loading && <CircularProgress />) ||
          (options.length === 0 && <h4>EMPTY</h4>) || (
            <DataGrid
              density='compact'
              disableExtendRowFullWidth='true'
              checkboxSelection={false}
              columns={columns}
              rows={rows}
              rowHeight='52'
              autoHeight={true}
              hideFooter={true}
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
      </div>
    </div>
  );
}

export default ViewShow;
