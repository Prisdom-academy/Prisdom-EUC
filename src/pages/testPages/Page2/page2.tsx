import { usePage2Management } from "./usePage2Management";
import {
  Box,
  Button,
  Divider,
  useColorMode,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TextLayerEnum } from "theme/typography/interfaces";
import { DisplayContainer } from "component-ui/DisplayContainer/DisplayContainer";

export const Page2 = () => {
  const { login } = usePage2Management();
  const { toggleColorMode } = useColorMode();

  return (
    <Box m={"2rem"}>
      <DisplayContainer>
        <Text layerStyle={TextLayerEnum.headLineMd}>Page2: Demo</Text>
        <HStack>
          <Button my={"10px"} colorScheme={"gray"} onClick={() => login()}>
            Login
          </Button>
          <Button
            variant={"secondary"}
            color={"gray.700"}
            onClick={toggleColorMode}
          >
            Change color mode
          </Button>
        </HStack>
        <Divider></Divider>
      </DisplayContainer>
      <Outlet />
    </Box>
  );
};
