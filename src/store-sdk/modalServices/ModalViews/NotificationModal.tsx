import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
  Divider,
  ComponentWithAs,
  IconProps,
  HStack,
} from "@chakra-ui/react";
import { ExtendsColorEnum } from "theme/colors/interfaces";
import { TextLayerEnum } from "theme/typography/interfaces";

export type NotificationModalType = "info" | "error" | "success";

interface ModalMetaData {
  color: string;
  Icon: ComponentWithAs<"svg", IconProps>;
  btnVariant: string;
}

export interface INotificationModal {
  title?: string;
  content?: string;
  isOpen: boolean;
  onClose(): void;
  type?: NotificationModalType;
}

export const NotificationModal = (props: INotificationModal) => {
  const {
    title = "Modal title",
    content = "Modal content",
    isOpen,
    onClose,
    type: noticType,
  } = props;

  const closeButtonColor = useColorModeValue("gray.800", "white");

  function getDataByType(type: NotificationModalType) {
    let data: ModalMetaData = {
      color: ExtendsColorEnum["danger.500"],
      Icon: WarningTwoIcon,
      btnVariant: "error",
    };

    switch (type) {
      case "error":
        data = {
          color: ExtendsColorEnum["danger.500"],
          Icon: WarningTwoIcon,
          btnVariant: "error",
        };
        break;
      case "success":
        data = {
          color: ExtendsColorEnum["secondary.500"],
          Icon: CheckCircleIcon,
          btnVariant: "secondary",
        };
        break;
      case "info":
        data = {
          color: ExtendsColorEnum["info.500"],
          Icon: InfoIcon,
          btnVariant: "info",
        };
        break;

      default:
        break;
    }

    return data;
  }

  const { color, Icon, btnVariant } = getDataByType(noticType || "error");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p=".5rem 1rem">
        <ModalHeader pb="0">
          <HStack>
            <Icon color={color} h="1.5rem" w="1.5rem" mr=".5rem" />
            <Text as="h2" layerStyle={TextLayerEnum.headlineSm} color={color}>
              {title}
            </Text>
          </HStack>
          <Divider mt=".5rem" />
        </ModalHeader>
        <ModalCloseButton color={closeButtonColor} />
        <ModalBody minH="5.5rem" pb="1.5rem">
          <Text as="p" layerStyle={TextLayerEnum.bodyLg400}>
            {content}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant={btnVariant} onClick={onClose} minW="5.5rem">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};