import {
  Collapse,
  Flex,
  chakra,
  Text,
  Center,
  Divider,
  HStack,
  Box,
  RadioGroup
} from '@chakra-ui/react';
import { styles } from './styles';
import cover from 'theme/icons/Images/cover01.jpg';
import ProfilePanelCover from './ProfilePanelCover';
import BadgeInfo from 'component-ui/Badges/BadgeInfor';
import { TextLayer } from 'theme/typography/interfaces';
import { PriscoinIconFilled } from 'theme/icons/SVGs/priscoin';
import { ColorToken, TypoToken } from 'theme/base/interfaces';
import { CourseIconFilled } from 'theme/icons/SVGs/course';
import PrisButton from 'component-ui/buttons/PrisButton';
import TextButton from 'component-ui/buttons/TextButton';
import ProfilePanelSettingNav from './ProfilePanelSettingNav';
import { ProfileIconOutlined } from 'theme/icons/SVGs/profile';
import { ThemeIconOutlined } from 'theme/icons/SVGs/theme';
import { LanguageIconOutlined } from 'theme/icons/SVGs/language';
import { LogoutIconOutlined } from 'theme/icons/SVGs/logOut';
import { ExtendedColor } from 'theme/colors/interfaces';
import { ProfileSettingEnum, UserType } from 'models/user';
import { startCase } from 'lodash';
import { Fragment, useState } from 'react';
import { ArrowIconOutlined } from 'theme/icons/SVGs/arrow';
import SwitchSettingButton, {
  SwitchSettingButtonProps
} from './SwitchSettingButton';
import {
  IncognitoIconFilled,
  IncognitoIconOutlined
} from 'theme/icons/SVGs/incognito';
import {
  LearnerIconFilled,
  LearnerIconOutlined
} from 'theme/icons/SVGs/learner';
import {
  InstructorIconFilled,
  InstructorIconOutlined
} from 'theme/icons/SVGs/instructor';
import { UKFlagIcon, VietnamFlagIcon } from 'theme/icons/SVGs/flag';
import 'theme/globalCSS/animation.css';

export interface IProfilePanelProps {
  isShow: boolean;
  imgSrc: string;
  userName: string;
  userType: UserType;
}

export enum PanelMode {
  DEFAULT,
  THEME,
  PROFILE,
  LANGUAGE
}

const ProfilePanel = (props: IProfilePanelProps) => {
  const { isShow, imgSrc, userName, userType } = props;
  const [panelMode, setPanelMode] = useState(PanelMode.DEFAULT);
  const [profileChoice, setProfileChoice] = useState(
    ProfileSettingEnum.LEARNER
  );
  const [themeChoice, setThemeChoice] = useState(
    ProfileSettingEnum.DARK
  );
  const [langChoice, setLangChoice] = useState(ProfileSettingEnum.UK);

  const _renderCourseAndPointInfo = () => {
    return (
      <Flex alignItems={'center'}>
        <HStack mr="1rem">
          <Center
            p="4px"
            borderRadius={'50%'}
            mr=".1rem"
            bg={ColorToken.warning_darker}
          >
            <PriscoinIconFilled
              boxSize={'1rem'}
              fill={ColorToken.warning_light}
            />
          </Center>
          <Text
            layerStyle={TextLayer.smallBoldNormalX}
            color={TypoToken.type_neutral_default}
          >
            1245
          </Text>
        </HStack>
        <Divider orientation="vertical" h="8px" />
        <HStack ml="1rem">
          <Center
            p="4px"
            borderRadius={'50%'}
            bg={ColorToken.primary_base}
            mr=".1rem"
          >
            <CourseIconFilled
              boxSize={'1rem'}
              fill={ColorToken.primary_lighter}
            />
          </Center>

          <Text
            layerStyle={TextLayer.smallBoldNormalX}
            color={TypoToken.type_neutral_default}
          >
            21
          </Text>
        </HStack>
      </Flex>
    );
  };

  const _renderMenuLists = () => {
    const data = [
      {
        Icon: ProfileIconOutlined,
        title: 'Profile',
        subTitle: 'Learner',
        className: 'settingNav',
        onClick: () => setPanelMode(PanelMode.PROFILE)
      },
      {
        Icon: ThemeIconOutlined,
        title: 'Theme',
        subTitle: 'System default',
        className: 'settingNav',
        onClick: () => setPanelMode(PanelMode.THEME)
      },
      {
        Icon: LanguageIconOutlined,
        title: 'Language',
        subTitle: 'English',
        className: 'settingNav',
        onClick: () => setPanelMode(PanelMode.LANGUAGE)
      }
    ];
    return (
      <Box px="1rem">
        {data.map((itemProps) => (
          <ProfilePanelSettingNav
            key={itemProps.title}
            {...itemProps}
          />
        ))}
      </Box>
    );
  };

  const _renderMainPanel = () => {
    return (
      <Fragment>
        <ProfilePanelCover imgSrc={cover} />
        <Flex direction="column" alignItems={'center'}>
          <chakra.img
            sx={styles.bigProfileImg}
            borderColor={`${bgColor} !important`}
            src={imgSrc}
          />
          <BadgeInfo
            className="avatarBadge"
            bgColor={bgColor}
            color={color}
          >
            {startCase(userType)}
          </BadgeInfo>
        </Flex>
        <Text
          layerStyle={TextLayer.largeBoldX}
          color={TypoToken.type_neutral_hard}
        >
          {userName}
        </Text>
        {_renderCourseAndPointInfo()}
        <Box px="1rem" w="100%">
          <PrisButton size={'lg'} w="100%" mt="1.5rem">
            View profile
          </PrisButton>
        </Box>
        <Divider my="1.5rem" />
        <HStack px="1rem" w="100%">
          <Text layerStyle={TextLayer.mediumBold} mr="auto">
            Settings
          </Text>
          <TextButton size={'sm'}>More</TextButton>
        </HStack>
        {_renderMenuLists()}
        <Box px="1rem" w="100%" mb="1.75rem">
          <PrisButton
            size={'lg'}
            w="100%"
            mt="1.5rem"
            variant={'tertiary'}
          >
            <LogoutIconOutlined
              boxSize={'1.5rem'}
              fill={ExtendedColor['darkLevel.200']}
              mr=".75rem"
            />
            <Text layerStyle={TextLayer.baseBoldNormal}>Log out</Text>
          </PrisButton>
        </Box>
      </Fragment>
    );
  };

  const _backToMainPanel = () => setPanelMode(PanelMode.DEFAULT);
  const _renderSubPanelHeaders = (headerTitle: string) => {
    return (
      <HStack w="100%" mb="1rem">
        <PrisButton
          variant={'tertiary'}
          boxSize={'2.25rem !important'}
          minW="0"
          borderRadius={'50%'}
          onClick={_backToMainPanel}
        >
          <ArrowIconOutlined
            boxSize={'1.25rem'}
            transform={'rotate(180deg)'}
            fill={ExtendedColor['darkLevel.200']}
          />
        </PrisButton>
        <Text
          layerStyle={TextLayer.mediumBold}
          as="h3"
          ml=".6rem !important"
        >
          {headerTitle}
        </Text>
        <TextButton size={'sm'} ml="auto !important">
          More
        </TextButton>
      </HStack>
    );
  };
  const _renderProfilePanel = () => {
    const itemListData: SwitchSettingButtonProps[] = [
      {
        IconNormal: LearnerIconOutlined,
        IconWhenActive: LearnerIconFilled,
        title: 'learner',
        radioValue: ProfileSettingEnum.LEARNER,
        isChecked: profileChoice === ProfileSettingEnum.LEARNER,
        onClick: () => setProfileChoice(ProfileSettingEnum.LEARNER)
      },
      {
        IconNormal: InstructorIconOutlined,
        IconWhenActive: InstructorIconFilled,
        title: 'instructor',
        radioValue: ProfileSettingEnum.INSTRUCTOR,
        isChecked: profileChoice === ProfileSettingEnum.INSTRUCTOR,
        onClick: () => setProfileChoice(ProfileSettingEnum.INSTRUCTOR)
      },
      {
        IconNormal: IncognitoIconOutlined,
        IconWhenActive: IncognitoIconFilled,
        title: 'incognito',
        radioValue: ProfileSettingEnum.INCOGNITO,
        isChecked: profileChoice === ProfileSettingEnum.INCOGNITO,
        onClick: () => setProfileChoice(ProfileSettingEnum.INCOGNITO)
      }
    ];
    return (
      <Box p="1rem" w="100%">
        {_renderSubPanelHeaders('Switch profile')}
        <RadioGroup
          value={profileChoice}
          onChange={(val) =>
            setProfileChoice(val as ProfileSettingEnum)
          }
        >
          {itemListData.map((propsData) => (
            <SwitchSettingButton
              className="switchButton slideInAnimation"
              key={propsData.title}
              {...propsData}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  const _renderThemePanel = () => {
    const itemListData: SwitchSettingButtonProps[] = [
      {
        title: 'system default',
        radioValue: ProfileSettingEnum.SYSTEM_DEFAULT,
        isChecked: themeChoice === ProfileSettingEnum.SYSTEM_DEFAULT,
        onClick: () =>
          setThemeChoice(ProfileSettingEnum.SYSTEM_DEFAULT)
      },
      {
        title: 'dark',
        radioValue: ProfileSettingEnum.DARK,
        isChecked: themeChoice === ProfileSettingEnum.DARK,
        onClick: () => setThemeChoice(ProfileSettingEnum.DARK)
      },
      {
        title: 'light',
        radioValue: ProfileSettingEnum.LIGHT,
        isChecked: themeChoice === ProfileSettingEnum.LIGHT,
        onClick: () => setThemeChoice(ProfileSettingEnum.LIGHT)
      }
    ];

    return (
      <Box p="1rem" w="100%">
        {_renderSubPanelHeaders('Switch theme')}
        <RadioGroup
          value={themeChoice}
          onChange={(val) =>
            setThemeChoice(val as ProfileSettingEnum)
          }
        >
          {itemListData.map((propsData) => (
            <SwitchSettingButton
              className="switchButton slideInAnimation"
              key={propsData.title}
              {...propsData}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  const _renderLanguagePanel = () => {
    const itemListData: SwitchSettingButtonProps[] = [
      {
        IconNormal: VietnamFlagIcon,
        title: 'Vietnamese',
        radioValue: ProfileSettingEnum.VN,
        isChecked: langChoice === ProfileSettingEnum.VN,
        onClick: () => setLangChoice(ProfileSettingEnum.VN)
      },
      {
        IconNormal: UKFlagIcon,
        title: 'English',
        radioValue: ProfileSettingEnum.UK,
        isChecked: langChoice === ProfileSettingEnum.UK,
        onClick: () => setLangChoice(ProfileSettingEnum.UK)
      }
    ];

    return (
      <Box p="1rem" w="100%">
        {_renderSubPanelHeaders('Switch language')}
        <RadioGroup
          value={langChoice}
          onChange={(val) => setLangChoice(val as ProfileSettingEnum)}
        >
          {itemListData.map((propsData) => (
            <SwitchSettingButton
              className="switchButton slideInAnimation"
              key={propsData.title}
              {...propsData}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  const _renderPanelBasedOnMode = () => {
    let renderer = _renderMainPanel();

    switch (panelMode) {
      case PanelMode.PROFILE:
        renderer = _renderProfilePanel();
        break;
      case PanelMode.THEME:
        renderer = _renderThemePanel();
        break;
      case PanelMode.LANGUAGE:
        renderer = _renderLanguagePanel();
        break;
    }

    return renderer;
  };

  const bgColor =
    userType === 'learner'
      ? ExtendedColor['darkLevel.100']
      : ColorToken.primary_base;

  const color =
    userType === 'learner'
      ? ExtendedColor['darkLevel.800']
      : ExtendedColor['darkLevel.200'];

  return (
    <Collapse in={isShow} unmountOnExit>
      <Flex sx={styles.profilePanel}>
        {_renderPanelBasedOnMode()}
      </Flex>
    </Collapse>
  );
};

export default ProfilePanel;
