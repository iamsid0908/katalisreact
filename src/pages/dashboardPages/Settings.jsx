import { Flex, useTheme } from "@chakra-ui/react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { SidebarTitleData } from "../../constants/SidebarTitleData";
import SidebarTitle from "../../components/dashboard/SidebarTitle";

const Settings = () => {
  const theme = useTheme()
  return (
    <Flex
      backgroundColor={theme.colors.dashboardBG}
      h="100vh"
      overflowY="scroll"
      width="100%"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start" p="1.5rem"
    >
      <Flex w="100%">
        <SidebarTitle
          description=""
          title="Settings"
        />
      </Flex>
      <Flex w="100%" p="1rem 0.5rem" >

      </Flex>
    </Flex>
  );
};

export default Settings;
