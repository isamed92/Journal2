import { Box } from '@mui/system';
import React from 'react';

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* navbar */}
      {/* Sidebar */}

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {/* toolbar */}
        {children}
      </Box>
    </Box>
  );
};
