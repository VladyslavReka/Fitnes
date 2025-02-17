import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ placeholder, onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1, borderRadius: 2, boxShadow: 1, backgroundColor: '#fff' }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder || 'Search...'}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery ? (
                <IconButton onClick={handleClear} color="error">
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleSearch} color="primary">
                  <SearchIcon />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
        sx={{ flexGrow: 1, borderRadius: 2 }}
      />
    </Box>
  );
};

export default SearchBar;
