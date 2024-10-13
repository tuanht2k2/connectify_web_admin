"use client";

import { loadAccount } from "@/app/redux/reducers/authSlice";
import { accountService } from "@/app/service/accountService";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

import logo from "@/app/assets/images/logo.png";

import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/app/redux/store";

interface ITokenData {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  jti: string;
  id: string;
}

interface IMenuItem {
  isDivider?: boolean;
  label?: string;
  to?: string;
  icon?: any;
}

const APP_MENU: IMenuItem[] = [
  {
    isDivider: true,
  },
  {
    label: "Trang chủ",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    label: "Quản lý người dùng",
    icon: <ManageAccountsIcon />,
    to: "/account-management",
  },
  {
    label: "Quản lý bài viết",
    icon: <BorderColorIcon />,
    to: "/post-management",
  },
  {
    label: "Quản lý nhóm",
    icon: <SupervisedUserCircleIcon />,
    to: "/group-management",
  },
];

function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = useSelector((state: RootState) => state.auth.account);

  const [navbarVisible, setNavbarVisible] = useState(false);
  const toggleDrawer = (isVisible: boolean) => {
    setNavbarVisible(isVisible);
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, height: "100%" }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {APP_MENU.map((item, index) => (
          <ListItem key={index} disablePadding>
            {item.isDivider ? (
              <hr className="w-full h-1 bg-gray-100" />
            ) : (
              <ListItemButton
                onClick={() => {
                  item.to && navigate(item.to);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <span className="font-bold text-sm text-gray-800">
                    {item.label}
                  </span>
                </ListItemText>
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  const getCurrentPage = () => {
    const currentPage = pathName.split("/")[1];
    switch (currentPage) {
      case "account-management":
        return "Quản lý người dùng";
      case "post-management":
        return "Quản lý bài viết";
      case "group-management":
        return "Quản lý nhóm";
      default:
        return "Trang chủ";
    }
  };

  const getAccount = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    const data: ITokenData = jwtDecode(token);

    accountService
      .getAccount(data.id)
      .then((res) => {
        const account = res.data?.data;
        if (!account) return;
        dispatch(loadAccount(account));
      })
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  useEffect(() => {
    getAccount();

    return () => {};
  }, []);

  return loading ? (
    <div className="h-full w-full flex justify-center items-center">
      <CircularProgress size={30} color="primary" />
    </div>
  ) : (
    <div className="w-full h-full">
      <Drawer
        open={navbarVisible}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <div className="flex items-center justify-center font-bold text-2xl text-blue-600 font-sans pt-5">
          <Image
            src={logo}
            alt="Login illustration"
            width={30}
            height={30}
            className="object-cover"
          />
          onnectify
        </div>
        {DrawerList}
        <button
          className="mx-3 mb-4 shadow-md shadow-gray-400 bg-gray-100 p-2 rounded-md font-semibold text-gray-800"
          onClick={logout}
        >
          Đăng xuất
        </button>
      </Drawer>
      <nav className="p-2 shadow-md shadow-gray-200 flex justify-between">
        <div className="flex items-center">
          <Button
            onClick={() => {
              toggleDrawer(true);
            }}
          >
            <MenuIcon />
          </Button>
          <div className="flex items-center justify-center font-bold text-2xl text-blue-600 font-sans">
            <Image
              src={logo}
              alt="Login illustration"
              width={40}
              height={40}
              className="object-cover"
            />
            onnectify
          </div>
        </div>
        <div className="flex items-center text-blue-950 font-bold">
          {getCurrentPage()}
        </div>
        <div className="flex items-center gap-3 pr-4">
          <div className="flex items-center text-gray-700 font-bold gap-3">
            <AccountCircleIcon fontSize="large" color="action" />
            {account?.displayName}
          </div>
        </div>
      </nav>
      <div className="h-[calc(100%-63px)]">{children}</div>
    </div>
  );
}

export default PrivateLayout;
