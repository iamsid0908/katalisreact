import {
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { PiMagicWand } from "react-icons/pi";
import { GrAnalytics } from "react-icons/gr";
import { BiLogOut, BiArrowBack } from "react-icons/bi";
import { MdOutlineSpaceDashboard, MdOutlineHelpOutline } from "react-icons/md";
import { BsBriefcase, BsPencilSquare } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { HiOutlineTemplate } from "react-icons/hi";
import { SlScreenDesktop } from "react-icons/sl";
import KatalisLogo2 from "../../assets/images/KatalisLogo2.jpg";
import KatalisLogo from "../../assets/images/KatalisLogo.png";
import {
  SidebarMainItems,
  SidebarOtherItems,
} from "../../constants/SidebarItems";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const iconComponentsMenuItems = {
  MdOutlineSpaceDashboard,
  GrAnalytics,
  PiMagicWand,
  BsBriefcase,
  BsPencilSquare,
  AiOutlineMessage,
  LiaProjectDiagramSolid,
  HiOutlineTemplate,
  SlScreenDesktop
};
const iconComponentsOtherItems = {
  AiOutlineSetting,
  BsPersonCircle,
  MdOutlineHelpOutline,
};

const Sidebar = () => {
  const theme = useTheme();
  const [navSize, setNavSize] = useState("large");
  const location = useLocation();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["KatalisAuth"]);

  const handleLogoutBtn = () => {
    removeCookie("KatalisAuth", { path: "/" });
    navigate("/login");
  };

  return (
    <Flex
      h="100vh"
      w="100%"
      flexDir="row"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow="lg"
    >
      <Flex
        pos="sticky"
        p={4}
        h="100vh"
        w={navSize === "small" ? "5rem" : "17rem"}
        flexDir="column"
        justifyContent="space-between"
        //   left="5"
        boxShadow="lg"
        backgroundColor={theme.colors.navBG}
        transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
      >
        <Flex flexDir="column" alignItems="center">
          <Flex flexDir="row" alignItems="center" as="nav" w="100%">
            {/* <Flex alignItems="center" h={12}>
              {navSize === "small" ? (
                <img src={KatalisLogo} alt="" />
              ) : (
                <img src={KatalisLogo2} alt="" />
              )}
            </Flex> */}
            {/* <IconButton
              transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
              transform={
                navSize === "small"
                  ? "translateX(2.7rem)"
                  : "translateX(12.7rem)"
              }
              pos="absolute"
              background="#f2f2f4"
              borderRadius={20}
              mt={5}
              _hover={{ background: "#c8c8c8" }}
              icon={
                navSize === "small" ? <IoIosArrowForward /> : <IoIosArrowBack />
              }
              onClick={() => {
                navSize === "small" ? setNavSize("large") : setNavSize("small");
              }}
            /> */}
          </Flex>

          {/* ------------------------------  MENU ITEMS  ------------------------------ */}
          <Flex
            flexDir="column"
            alignItems="flex-start"
            mt={30}
            w={navSize === "small" ? "100%" : "13rem"}
          >
            <Text
              wordBreak="keep-all"
              flexWrap="nowrap"
              ml={5}
              color="#fff"
              fontSize="16px"
              fontWeight="500"
              p="0.4rem 0"
              display={navSize === "small" ? "none" : "flex"}
            >
              MENU
            </Text>
            {SidebarMainItems.map((item, index) => {
              const IconComponent = iconComponentsMenuItems[item.icon];
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  to={item?.path}
                  style={{
                    width: "100%",
                  }}
                  borderRadius={4}
                  key={index}
                >
                  <Flex
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                  >
                    <Menu placement="right">
                      <Text
                        padding="0.4rem 1rem"
                        borderRadius={4}
                        _hover={{
                          textDecor: "none",
                          color: `${theme.colors.active_navColor}`,
                        }}
                        w={navSize === "large" && "100%"}
                      >
                        <MenuButton>
                          <Flex align="center">
                            <IconComponent
                              style={{
                                fontSize: "1.4rem",
                                color: `${isActive ? `${theme.colors.active_navColor}` : `${theme.colors.navColor}`}`,
                              }}
                            />
                            <Text
                              fontSize="14px"
                              ml={5}
                              style={{
                                color: `${isActive ? `${theme.colors.active_navColor}` : `${theme.colors.navColor}`}`,
                              }}
                              display={navSize === "small" ? "none" : "flex"}
                            >
                              {item?.title}
                            </Text>
                          </Flex>
                        </MenuButton>
                      </Text>
                    </Menu>
                  </Flex>
                </NavLink>
              );
            })}
          </Flex>
          {/* ------------------------------  MENU ITEMS  ------------------------------ */}

          {/* -------------------------------  OTHER ITEMS  ----------------------------- */}
          <Flex
            flexDir="column"
            alignItems="flex-start"
            mt={30}
            w={navSize === "small" ? "100%" : "13rem"}
          >
            <Text
              wordBreak="keep-all"
              flexWrap="nowrap"
              ml={5}
              fontSize="16px"
              fontWeight="500"
              p="0.4rem 0"
              color="#fff"
              display={navSize === "small" ? "none" : "flex"}
            >
              OTHER
            </Text>
            {SidebarOtherItems.map((item, index) => {
              const IconComponent = iconComponentsOtherItems[item.icon];
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  to={item?.path}
                  style={{
                    width: "100%",
                  }}
                  key={index}
                >
                  <Flex
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                  >
                    <Menu placement="right">
                      <Text
                        p="0.4rem 1rem"
                        borderRadius={4}
                        _hover={{ textDecor: "none" }}
                        w={navSize === "large" && "100%"}
                      >
                        <MenuButton>
                          <Flex align="center">
                            <IconComponent
                              style={{
                                fontSize: "1.4rem",
                                color: `${isActive ? `${theme.colors.active_navColor}` : `${theme.colors.navColor}`}`,
                              }}
                            />
                            <Text
                              fontSize="14px"
                              ml={5}
                              style={{
                                color: `${isActive ? `${theme.colors.active_navColor}` : `${theme.colors.navColor}`}`,
                              }}
                              display={navSize === "small" ? "none" : "flex"}
                            >
                              {item?.title}
                            </Text>
                          </Flex>
                        </MenuButton>
                      </Text>
                    </Menu>
                  </Flex>
                </NavLink>
              );
            })}
          </Flex>
          {/* -------------------------------  OTHER ITEMS  ----------------------------- */}
          <Flex
            flexDir="column"
            alignItems="flex-start"
            w={navSize === "small" ? "100%" : "13rem"}>
            <Flex
              w="100%"
              onClick={() => handleLogoutBtn()}
            >
              <Flex alignItems={navSize === "small" ? "center" : "flex-start"} w="100%">
                <Menu placement="right">
                  <Text
                    p="0.4rem 1rem"
                    borderRadius={4}
                    _hover={{
                      textDecor: "none",
                    }}
                    w={navSize === "large" && "100%"}
                    color="red"
                  >
                    <MenuButton>
                      <Flex align="center">
                        <BiLogOut fontSize="1.4rem" />
                        <Text
                          fontSize="14px"
                          ml={5}
                          display={navSize === "small" ? "none" : "flex"}
                          color="red"
                        >
                          Logout
                        </Text>
                      </Flex>
                    </MenuButton>
                  </Text>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
