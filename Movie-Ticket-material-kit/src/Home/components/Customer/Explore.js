import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchTheatresInCity } from '../Actions/BookingActions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  grid: {
    width: '22%',
    height: 'auto',
    margin: '10px',
    padding: '10px',
  },
});

function Explore() {
  const dispatch = useDispatch();
  const city = useParams();
  const classes = useStyles();
  const theatres = useSelector((state) => state.booking.theatres);

  useEffect(() => {
    dispatch(fetchTheatresInCity(city.cityName));
  }, [dispatch, city.cityName]);

  const options = theatres.map(function (row) {
    return {
      id: row.theatreId,
      name: row.theatreName,
      link: row.theatreId,
    };
  });
  const rows: GridRowsProp = options;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Theatre Name', width: 155 },
    {
      field: 'link',
      headerName: 'More Details',
      width: 145,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Link
            variant='contained'
            color='primary'
            size='small'
            to={'/customer/theatre/detail/' + params.value}
          >
            View
          </Link>
        </strong>
      ),
    },
  ];

  return (
    <div>
      <div>
        <div>Some Recommended Movies</div>
        <div
          className={classes.grid}
          style={{ margin: '0 auto', padding: '10px', height: '100%' }}
        >
          <Typography
            variant='subtitle1'
            style={{ textTransform: 'none' }}
            gutterBottom={true}
          >
            Some Theatres in <h6>{city.cityName}</h6>
          </Typography>
          {theatres && (
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
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
