import { Flex } from "@chakra-ui/react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { SidebarTitleData } from "../../constants/SidebarTitleData";
import SidebarTitle from "../../components/dashboard/SidebarTitle";

const Analytics = () => {
  return (
    <Flex
      backgroundColor="#fff"
      h="100vh"
      overflowY="scroll"
      width="100%"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <DashboardNavbar />
      <Flex w="100%">
        <SidebarTitle
          description={SidebarTitleData[1].description}
          title={SidebarTitleData[1].title}
        />
      </Flex>
      <Flex w="100%" p="1rem 0.5rem"></Flex>
    </Flex>
  );
};

export default Analytics;
