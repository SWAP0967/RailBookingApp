import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Action_Creators/ActionCreators";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import navlogo from "../../Asserts/brandlogo.jpg";
import { FaHome } from "react-icons/fa";
const { Sider } = Layout;

function Navbar() {
  const loggedInUser = useSelector((state) => state.Irctc.user);
      // eslint-disable-next-line
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] =useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm } = Modal;

  const handleLogout = () => {
    dispatch(logout());
    setLogoutConfirmationVisible(false);
    localStorage.removeItem("loggedInUser");
    navigate("/home");
  };

  const showLogoutConfirmation = () => {
    confirm({
      title: "Logout Confirmation",
      content: "You are logging out",
      onOk: handleLogout,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const customMenu = document.querySelector(".custommenu");

      if (customMenu) {
        const scrollPosition = window.scrollY;
        const threshold = 100;

        if (scrollPosition > threshold) {
          customMenu.classList.add("scrolled");
        } else {
          customMenu.classList.remove("scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuitems = [
    {
      key: "Login",
      icon: <UserOutlined className="menu-icon" />,
      children: [
        {
          label: "Logout",
          key: "Logout",
        },
      ],
    },
  ];

  const items2 = [
    {
      key: "home",
      link: "/Home",
      icon: <FaHome style={{ fontSize: "2rem" }} />,
    },
    {
      key: "sub1",
      label: "Train  Information",
      children: [
        {
          key: "SeatAvailability",
          label: "Seat Availability",
          link: "/SeatAvailability",
        },
        {
          key: "TrainLiveStatus",
          label: "Train Live Status",
          link: "/TrainLiveStatus",
        },
        { key: "SearchTrain", label: "Search Train", link: "/SearchTrain" },
      ],
    },
  ];

  const handleMenuItemClick = (item) => {
    if (item.key === "Logout") {
      localStorage.removeItem("confirmationDetails");
      showLogoutConfirmation();
    } else if (item.key === "home") {
      navigate("/home");
    }
  };

  return (
    <div>
      <Menu mode="horizontal" className="custommenu">
        {loggedInUser.username ? (
          <>
           <div className="menu-item">
              <img
                src={navlogo}
                alt="Logo"
                className="logo"
                style={{ width: "150px", paddingRight: "18px", paddingTop: "5px" }}
              />
            </div>
            <div className="custom-menu-item" style={{ marginRight: "60rem", paddingTop: "25px" }}>
              Welcome, {loggedInUser.username}!
            </div>
           
          </>
        ) : (
          <div className="menu-item">
            <img
              src={navlogo}
              alt="Logo"
              className="logo"
              style={{ width: "150px", paddingRight: "80rem", paddingTop: "5px" }}
            />
          </div>
        )}

        {menuitems.map((item) =>
          item.children ? (
            <Menu.SubMenu
              className="menu-item"
              key={item.key}
              icon={item.icon}
              title={item.label}
              style={{ paddingTop: "25px" }}
            >
              {item.children.map((childItem) => (
                <Menu.Item
                  className="menu-item"
                  key={childItem.key}
                  onClick={() => handleMenuItemClick(childItem)}
                >
                  <Link to={childItem.link}>{childItem.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              className="menu-item"
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuItemClick(item)}
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
      <Layout>
        <Sider
          width={240}
          style={{
            height: "100vh",
            position: "absolute",
            paddingTop: "1.7rem",
          }}
        >
          <Menu className="menuitem" mode="inline">
            {items2.map((item) =>
              item.children ? (
                <Menu.SubMenu
                  key={item.key}
                  title={item.label}
                  icon={item.icon}
                  style={{ margin: "3rem 0", fontWeight: "bolder" }}
                >
                  {item.children.map((childItem) => (
                    <Menu.Item
                      key={childItem.key}
                      onClick={() => handleMenuItemClick(childItem)}
                      style={{ margin: "3.5rem 0" }}
                    >
                      <Link to={childItem.link}>{childItem.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
}

export default Navbar;
