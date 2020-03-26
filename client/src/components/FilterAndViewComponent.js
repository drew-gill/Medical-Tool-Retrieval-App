import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Skeleton from '@material-ui/lab/Skeleton';

// Styled components
const SearchBarForm = styled.form`
  margin: 10px 0px;
`;

const GridItem = styled(Grid)`
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ToolImage = styled.img`
  width: 100%;
  height: 300px;
  padding: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  height: 300px;
  padding: 10px;
  box-sizing: border-box;
`;

const FilterAndViewComponent = ({ data, selectFunction }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterData();
  }, [data, searchTerm]);

  const filterData = () => {
    const newData = [];
    data.forEach(d => {
      for (let i = 0; i < d.keywords.length; i++) {
        const word = d.keywords[i].toLowerCase();
        if (word.search(searchTerm.toLowerCase()) !== -1) {
          newData.push(d);
          break;
        }
      }
    });
    setFilteredData(newData);
  };

  const handleFilterChange = e => setSearchTerm(e.target.value);

  const handleSelect = item => selectFunction(item);

  const generateSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(<Skeleton variant='rect' width='100%' height='100%' />);
    }
    return skeletons;
  };

  return (
    <React.Fragment>
      <SearchBarForm noValidate>
        <TextField
          onChange={handleFilterChange}
          value={searchTerm}
          label='Search'
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
            )
          }}
        />
      </SearchBarForm>

      <Grid container alignContent='stretch'>
        {filteredData.length > 0
          ? filteredData.map((d, index) => (
              <GridItem
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={d._id}
                onClick={() => handleSelect(d)}
              >
                <ToolImage
                  src={`data:image/jpg;base64, ${d.image.toString('base64')}`}
                />
              </GridItem>
            ))
          : generateSkeletons().map((skel, index) => (
              <GridItem item xs={12} sm={6} md={4} lg={3} key={index}>
                <SkeletonContainer>{skel}</SkeletonContainer>
              </GridItem>
            ))}
      </Grid>
    </React.Fragment>
  );
};

export default FilterAndViewComponent;
