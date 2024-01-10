import React from 'react';
import {Flex, Input, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react';
import { PhoneIcon, CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {User} from "firebase/auth";
type SearchInputProps = {
 user?: User|null;   
};

const SearchInput:React.FC<SearchInputProps> = ({user}) => {
   return (
      <Flex align="center" maxWidth={user ? "auto":"600px"} mr={2} flexGrow={1}>
    <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <SearchIcon color='gray.400' />
    </InputLeftElement>
    <Input type='SearchIcon' placeholder='Search Reddit' fontSize="10pts" _placeholder={{color: "gray.500"}}
    _hover={{
     bg:"white" ,
     border: "1px solid",
     borderColor: "blue.500"
    }}
    _focus={{
        outline:"none",
        border:"1px solid",
        borderColor:"blue.500"
    }}
    bg="grey.50"
    height="34px"/>
  </InputGroup>

 
      </Flex>
   );    
}
export default SearchInput;