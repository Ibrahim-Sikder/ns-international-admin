import React from "react";
import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Sidebar, Logo } from "react-mui-sidebar";
import SideBarItems from "./SidebarItems";
import drawerItems from "./MenuItems";
import Link from "next/link";
import logo from '../../../../../src/assets/images/logo/logo.png'
interface MSidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: MSidebarProps) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const sidebarWidth = "250px";
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#00579A",
      borderRadius: "15px",
    },
  };

  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxShadow: (theme) => theme.shadows[8],
              backgroundColor: "#00579A",
              color: "#fff",
              padding: "10px",
              borderRight: "1px solid #ddd",
              ...scrollbarStyles,
            },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Sidebar
              width={sidebarWidth}
              collapsewidth="80px"
              isCollapse={false}
              mode="light"
              direction="ltr"
              themeColor="#ffffff"
              themeSecondaryColor="#49beff"
              showProfile={false}

            >
              <Link href='/dashboard' style={{ textDecoration: 'none', }}>
                <Typography
                  textAlign="center"
                  fontWeight="bold"
                  variant="h5"
                  marginTop="10px"
                  color='#ffffff'
                >
                  NS-INTERNATIONAL
                </Typography>
              </Link>
              <Box sx={{ mt: 2 }}>
                {drawerItems('super_admin').map((item, index) => (
                  <SideBarItems key={index} item={item} index={index} />
                ))}
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          backgroundColor: "#00579A",
          color: "#ffffff",
          padding: "10px",
          borderRight: "1px solid #ddd",
          ...scrollbarStyles,
        },
      }}
    >
      <Box px={2}>
        <Sidebar
          width={sidebarWidth}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#ffffff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          <Logo img="/images/logos/dark-logo.svg" />
          {drawerItems('super_admin').map((item, index) => (
            <SideBarItems key={index} item={item} index={index} />
          ))}
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
