import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import FeedIcon from '@mui/icons-material/Feed';
import { NavLink } from "react-router-dom";

const itemsNavBar = [
  {
    title: "Login",
    link: "/Login",
  },
  {
    title: "Register",
    link: "/Register",
  },
  {
    title: "Home",
    link: "/",
  },
];

const itemsDrawer = [
  {
    title: "Vehiculos",
    link: "/carList",
    icon: <CarRepairIcon />,
  },
  {
    title: "R1",
    link: "/r1",
    icon: <FeedIcon />,
  },
  {
    title: "R2",
    link: "/r2",
    icon: <FeedIcon />,
  },
  {
    title: "R3",
    link: "/r3",
    icon: <FeedIcon />,
  },
  {
    title: "R4",
    link: "/r4",
    icon: <FeedIcon />,
  }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            TINGESO
          </Typography>
          {itemsNavBar.map((item, index) => (
            <Button
              key={index}
              variant="contained"
              size="large"
              component={NavLink}
              to={item.link}
              sx={{ marginRight: "10px" }}
            >
              {item.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 220 }}>
          <nav>
            <List>
              {itemsDrawer.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                >
                  <ListItemButton
                    component={NavLink}
                    to={item.link}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
