import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { IconSettings, IconUser } from "@tabler/icons-react";
import Cookies from "js-cookie";

const Profile = () => {
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });

    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    localStorage.clear();


    router.push('/');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: 'black',

          ...(typeof anchorEl2 === "object" && {
            color: "black",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
            backgroundColor: '#00579A', // Remove background
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Optional: subtle shadow
          },
          "& .MuiMenuItem-root": {
            color: 'black', // Black text color
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.05)', // Light hover effect
            }
          },
          "& .MuiListItemIcon-root": {
            color: '#fff', // Black icon color
          }
        }}
      >
        <MenuItem component="a">
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component="a">
          <ListItemIcon>
            <IconSettings width={20} />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            fullWidth
            sx={{ background: 'white', color: 'black' }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;