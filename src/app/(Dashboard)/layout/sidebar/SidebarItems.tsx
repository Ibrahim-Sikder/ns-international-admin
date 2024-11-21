import Link from "next/link";
import List from "@mui/material/List";
import { DrawerItem } from "@/types/common";
import { usePathname } from "next/navigation";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/material";

type IProps = {
  item: DrawerItem;
  index: number;
};

const ListItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'nested' && prop !== 'isActive' && prop !== 'level',
})<{ nested?: boolean; isActive: boolean; level: number }>(({ theme, nested, isActive, level }) => ({
  padding: 0,
  ".MuiButtonBase-root": {
    whiteSpace: "nowrap",
    marginBottom: "4px",
    padding: nested ? "5px 16px" : "5px 18px", 
    borderRadius: "6px",
    color: isActive ? '#fff' : 'white',
    background: isActive ? '' : theme.palette.primary,
    transition: "color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    borderLeft: isActive
      ? `3px solid white`
      : "3px solid transparent",
    borderBottom: isActive
      ? `1px solid white`
      : "3px solid transparent",

  },
}));

const SideBarItems = ({ index, item }: IProps) => {
  const linkPath = `${item.path}`;
  const pathName = usePathname();
  const isActive = pathName === linkPath;
  const theme = useTheme();


  const [expanded, setExpanded] = useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return item.child ? (
    <Accordion
      key={index}
      sx={{ boxShadow: 'none', background: '#00579A', color: '#fff' }}
      expanded={expanded}
      onChange={handleExpandClick}
    >
      <AccordionSummary
        sx={{ color: 'white' }}
        expandIcon={
          expanded ? <RemoveIcon sx={{ color: '#fff' }} /> : <AddIcon sx={{ color: '#fff' }} />
        }
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <ListItemIcon sx={{ minWidth: "28px", color: 'white' }}>
          {item.icon && <item.icon />}
        </ListItemIcon>
        <ListItemText primary={item.title} sx={{ ml: 4.2, color: 'white' }} />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, m: 0, position: 'relative', marginLeft: '30px', color: 'white' }}>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '8px',
            bottom: 0,
            width: '2px',
            bgcolor: 'white',
          }}
        />
        <List component="div" sx={{ ml: 2 }}>
          {item.child.map((subItem, subIndex) => {
            const subLinkPath = `/dashboard/${subItem.path}`;
            const isSubActive = pathName === subLinkPath;

            return (
              <Link href={subLinkPath} key={subIndex} passHref style={{ textDecoration: "none" }}>
                <ListItemStyled
                  nested
                  isActive={isSubActive}
                  level={1}
                >
                  <ListItemButton>
                    {subItem.icon && (
                      <ListItemIcon
                        sx={{
                          minWidth: "28px",
                          color: isSubActive ? theme.palette.primary.main : theme.palette.text.secondary,
                        }}
                      >
                        <subItem.icon size={18} />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={subItem.title}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: isSubActive ? "bold" : "medium",
                        color: isSubActive ? 'white' : "#fff",
                      }}
                    />
                  </ListItemButton>
                </ListItemStyled>
              </Link>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Link href={linkPath} key={index} passHref style={{ textDecoration: "none" }}>
      <ListItemStyled
        isActive={isActive}
        level={0}
      >
        <ListItemButton>
          <ListItemIcon sx={{ m: 0, color: '#fff' }}>
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: isActive ? "bold" : "medium",
              color: isActive ? '#fff' : "inherit",
            }}
          />
        </ListItemButton>
      </ListItemStyled>
    </Link>
  );
};

export default SideBarItems;
