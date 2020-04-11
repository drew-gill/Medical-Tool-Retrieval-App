import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Skeleton from '@material-ui/lab/Skeleton';

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

const GridItemContainer = styled.div`
  width: 100%;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;

const GridItemHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const ToolImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
`;

// Filter options
const FILTER_OPTIONS = {
  ASCENDING: 'asc',
  DESCENDING: 'des',
};

const FilterAndViewComponent = ({ data }) => {
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

  const filterData = () => {
    let newData = [];
    data.forEach((d) => {
      for (let i = 0; i < d.keywords.length; i++) {
        const word = d.keywords[i].toLowerCase();
        if (word.search(searchTerm.toLowerCase()) !== -1) {
          newData.push(d);
          break;
        }
      }
    });
    if (filter !== '') {
      sortData(newData);
    }
    setFilteredData(newData);
  };

  const handleFilterChange = (e) => setSearchTerm(e.target.value);

  const handleSelect = (item) => history.push(`/ToolView/${item._id}`);

  const generateSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(<Skeleton variant='rect' width='100%' height='100%' />);
    }
    return skeletons;
  };

  return (
    <React.Fragment>
      <SearchSortContainer>
        <SearchBarForm noValidate>
          <TextField
            onChange={handleFilterChange}
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
      </SearchSortContainer>

      <Grid container alignContent='stretch' spacing={3}>
        {data.length > 0
          ? filteredData.map((d, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={d._id}>
                <GridItemContainer onClick={() => handleSelect(d)}>
                  <GridItemHover />
                  <ToolImage
                    src={`data:image/jpg;base64, ${d.image.toString('base64')}`}
                  />
                </GridItemContainer>
              </Grid>
            ))
          : generateSkeletons().map((skel, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <GridItemContainer>
                  <GridItemHover />
                  {skel}
                </GridItemContainer>
              </Grid>
            ))}
      </Grid>
    </React.Fragment>
  );
};

export default FilterAndViewComponent;
