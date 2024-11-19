

import { USER_ROLE } from "@/constant/role";
import { DrawerItem, userRole } from "@/types/common";
import { Apartment, ContactPhone, Deck, Diversity2, Handshake, HelpCenter, NotificationAdd, ProductionQuantityLimits, RateReview, Rule, Storefront, ViewCarousel } from "@mui/icons-material";
import {
  IconAperture,
  IconUsersGroup,
  IconPhotoPause,
  IconHistory,
  IconHandStop,


} from "@tabler/icons-react";


const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.super_admin:
      roleMenus.push(

        {
          title: "Services",
          path: `/dashboard/${role}/services`,
          icon: Deck,
        },

        {
          title: "Products",
          path: `/dashboard/${role}/products`,
          icon: ProductionQuantityLimits,
        },
        {
          title: "Compliance & Ethicsh",
          path: `/dashboard/${role}/compliance`,
          icon: Rule,
        },
        {
          title: "Banner",
          path: `/dashboard/${role}/banner`,
          icon: ViewCarousel,
        },
        {
          title: "Brand",
          path: `/dashboard/${role}/brand`,
          icon: Handshake,
        },
        {
          title: "Review",
          path: `/dashboard/${role}/review`,
          icon: RateReview,
        },

        {
          title: "About",
          path: `${role}/about`,
          icon: Apartment,
          child: [
            {
              title: "Who We Are ",
              path: `${role}/about`,
            },
            {
              title: "Mission",
              path: `${role}/about/mission`,
            },

          ],
        },
        {
          title: "Who We Are ",
          path: `/dashboard/${role}/whoweare`,
          icon: Diversity2,
        },
        {
          title: "Contact",
          path: `/dashboard/${role}/contact`,
          icon: ContactPhone,
        },

        {
          title: "Stock Photo",
          path: `${role}/gallery`,
          icon: IconPhotoPause,
          child: [
            {
              title: "All Photos",
              path: `${role}/gallery/photos`,
            },
            {
              title: " All Folders",
              path: `${role}/gallery/folders`,
            },
          ],
        },
        {
          title: "Users Management",
          path: `/dashboard/${role}/users`,
          icon: IconUsersGroup,

        },
        {
          title: "Settings",
          path: `${role}/settings`,
          icon: IconAperture,
          child: [
            {
              title: "Typography",
              path: `${role}/settings`,
            },
            {
              title: "Icons",
              path: `${role}/settings`,
            },
          ],
        }
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: "History",
          path: `/${role}/history`,
          icon: IconHistory,
          child: [
            {
              title: "List History",
              path: `${role}/history`,
            },
          ],
        },
        {
          title: "Oppressed",
          path: `${role}/oppressed`,
          icon: IconHandStop,
          child: [
            {
              title: "List Oppressed",
              path: `${role}/oppressed`,
            },
          ],
        },
      );
      break;

    default:
      break;
  }

  return roleMenus;
};

export default drawerItems;
