import { TurnedInNot } from '@mui/icons-material';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const Sidebar = ({ drawerWidth }) => {

  const {displayName} = useSelector(state => state.auth)
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': {boxSizing:'border-box', width: drawerWidth} }}
      >
        <Toolbar>
            <Typography variant='h6' noWrap >{displayName}</Typography>
        </Toolbar>
        <Divider/>

        <List>
            {
                ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TurnedInNot/>
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={text}/>
                                <ListItemText secondary={'Voluptate fugiat do sint ut sint ipsum est adipisicing aliqua elit aute.'}/>
                            </Grid>
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
      </Drawer>
    </Box>
  );
};
