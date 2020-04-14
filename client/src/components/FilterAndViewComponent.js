import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import numeral from 'numeral';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from '../Auth';

// Styled components
const SearchBarForm = styled.form`
  display: flex;
  flex-grow: 1;
  margin-right: 10px;
`;

const SearchSortContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 10px 0px;
`;

// Filter options
const FILTER_OPTIONS = {
  ASCENDING: 'asc',
  DESCENDING: 'des',
};

const FilterAndViewComponent = ({ data }) => {
  const authContext = useContext(AuthContext);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const history = useHistory();

  useEffect(() => {
    filterData();
  }, [data, searchTerm, filter]);

  const sortData = (d) => {
    d.sort((a, b) => {
      if (filter === FILTER_OPTIONS.ASCENDING) {
        return a.avgRetrievalTime - b.avgRetrievalTime;
      } else if (filter === FILTER_OPTIONS.DESCENDING) {
        return b.avgRetrievalTime - a.avgRetrievalTime;
      }
    });
  };

  const containsTerm = (keywords, term) => {
    for (let i = 0; i < keywords.length; i++) {
      const word = keywords[i].toLowerCase();
      if (word.search(term.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  };

  const filterData = () => {
    let newData = [];
    let found = {};
    const searchTerms = searchTerm.trim().split(' ');
    data.forEach((d) => {
      searchTerms.forEach((st) => {
        if (containsTerm(d.keywords, st)) {
          if (found[d._id] === undefined) {
            found[d._id] = {
              data: d,
              count: 1,
            };
          } else {
            found[d._id].count += 1;
          }
        }
      });
    });
    const keys = Object.keys(found);
    keys.forEach((key) => {
      if (found[key].count === searchTerms.length) {
        newData.push(found[key].data);
      }
    });
    if (filter !== '') {
      sortData(newData);
    }
    setFilteredData(newData);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (item) => history.push(`/ToolView/${item._id}`);

  const generateSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(<Skeleton variant='rect' width='100%' height={300} />);
    }
    return skeletons;
  };

  return (
    <React.Fragment>
      <SearchSortContainer>
        <SearchBarForm noValidate>
          <TextField
            onChange={handleSearchTermChange}
            value={searchTerm}
            placeholder='Type to search...'
            type='search'
            autoCorrect='off'
            autoCapitalize='off'
            autoComplete='off'
            spellCheck='false'
            id='search'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
          />
        </SearchBarForm>
        {authContext.authenticated && (
          <TextField
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ minWidth: 70 }}
            label='Sort'
            select
          >
            <MenuItem value={FILTER_OPTIONS.DESCENDING}>
              Retrieval Time (Hi - Lo)
            </MenuItem>
            <MenuItem value={FILTER_OPTIONS.ASCENDING}>
              Retrieval Time (Lo - Hi)
            </MenuItem>
          </TextField>
        )}
      </SearchSortContainer>

      <Grid container alignContent='stretch' spacing={3}>
        {data.length > 0
          ? filteredData.map((d, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={d._id}>
                <Card variant='outlined' elevation={0}>
                  <CardActionArea onClick={() => handleSelect(d)}>
                    <CardMedia
                      image={`data:image/jpg;base64, ${d.image.toString(
                        'base64'
                      )}`}
                      style={{ height: 300 }}
                    />
                    {authContext.authenticated && (
                      <CardContent>
                        <Typography>
                          Avg. Retrieval Time:{' '}
                          {numeral(d.avgRetrievalTime).format('0.00')} (s)
                        </Typography>
                      </CardContent>
                    )}
                  </CardActionArea>
                </Card>
                {/* <GridItemContainer onClick={() => handleSelect(d)}>
                  <GridItemHover />
                  <ToolImage
                    src={`data:image/jpg;base64, ${d.image.toString('base64')}`}
                  />
                  <Typography>
                    {numeral(d.avgRetrievalTime).format('0.00')} seconds
                  </Typography>
                </GridItemContainer> */}
              </Grid>
            ))
          : generateSkeletons().map((skel, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card variant='outlined' elevation={0}>
                  <CardActionArea>
                    {skel}
                    {authContext.authenticated && (
                      <CardContent>
                        <Skeleton variant='text' width='100%' height={50} />
                      </CardContent>
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>
    </React.Fragment>
  );
};

export default FilterAndViewComponent;
