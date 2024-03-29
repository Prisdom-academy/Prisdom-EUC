import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { NavTokenColor } from 'theme/base/aliasTokens/interfaces';
import { ExtendedColor } from 'theme/colors/interfaces';
import { SearchNormalIconOutlined } from 'theme/icons/SVGs/searchNormal';
import { TextLayer } from 'theme/typography/interfaces';
import SearchResult from './SearchResult';
import { styles } from './style';
import HotKeys from 'react-hot-keys';
import { TypoToken } from 'theme/base/interfaces';

const DELAY_SEARCH_TIME = 2000; // 2 seconds

const NavSearchInput = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSearching, setIsSearching] = useState(false);
  const [val, setVal] = useState('');
  const _searchInputRef = useRef<HTMLInputElement>(null);

  const _renderShortcutIcon = () => {
    return (
      <Flex sx={styles.shortcut}>
        <Text
          layerStyle={TextLayer.smallBoldNormal2X}
          color={NavTokenColor.cpn_shortcut_content}
        >
          Ctrl + /
        </Text>
      </Flex>
    );
  };

  let timeoutId: NodeJS.Timeout | null = null;
  const _onLazyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const searchContent = _searchInputRef.current?.value;
    if (searchContent) {
      timeoutId = setTimeout(() => {
        // start searching
        setIsSearching(true);
      }, DELAY_SEARCH_TIME);
    } else {
      setIsSearching(false);
    }
  };

  const _onShortcut = () => {
    _searchInputRef.current?.focus();
  };

  const _clickOutside = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <HotKeys keyName="ctrl+/" onKeyDown={_onShortcut}>
      <Box position={'relative'}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={
              <SearchNormalIconOutlined
                fill={
                  val
                    ? TypoToken.type_neutral_default
                    : TypoToken.type_placeholder
                }
              />
            }
          />
          <Input
            focusBorderColor={ExtendedColor['primary_dark.500']}
            placeholder="Search"
            sx={styles.input}
            ref={_searchInputRef}
            onChange={(e) => _onLazyChange(e)}
            onFocus={() => onOpen()}
            onClick={() => onOpen()}
            value={val}
          />
          <InputRightElement
            w="70px"
            pointerEvents="none"
            children={_renderShortcutIcon()}
          />
        </InputGroup>
        <SearchResult
          isShow={isOpen}
          inputRef={_searchInputRef}
          isSearching={isSearching}
          onClickOutside={_clickOutside}
        />
      </Box>
    </HotKeys>
  );
};

export default NavSearchInput;
