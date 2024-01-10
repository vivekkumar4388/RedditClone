import {User, signOut} from "firebase/auth";
import { ChevronDownIcon,Icon} from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, Button, MenuList, Flex,MenuDivider} from '@chakra-ui/react';
import React from 'react';
import {Text} from"@chakra-ui/react";
import {FaRedditSquare} from "react-icons/fa";
import {VscAccount} from "react-icons/vsc";
import {IoSparkles} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLogin, MdOutlineLogout} from "react-icons/md";
import { auth } from "../../../firebase/clientApp";
import { authModalState } from "../../../atoms/authModalAtom";
import {useSetRecoilState} from "recoil";

type UserMenuProps = {
  user?: User | null;   
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
   const setAuthModalState=useSetRecoilState(authModalState);
      
    return (
    <Menu>
        <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{outline:"1px solid",outlineColor:"gray.300"}}  >
        <Flex align="center">
            <Flex align="center">
          {user ? 
            <>
             <Icon   fontSize={24} color="gray.200" mr={1} as={FaRedditSquare}
             />
             <Flex
              align="flex-start"
               mr={8}
              direction="column"
              display={{base:"none" ,lg:"flex"}}
              fontSize="8pt"
              >
                <Text fontWeight={700}>
       {user?.displayName || user.email?.split("@")[0]}
                </Text>
                <Flex>
                  <Icon as={IoSparkles} color="brand.100" mr={1}/>
                  <Text color="gray.400">1 karma</Text>
                </Flex>
             </Flex> 
               </>
               :
               (<Icon  fontSize={24} color="gray.400" mr={1} as={VscAccount} /> )}
               </Flex>
               <ChevronDownIcon />
               </Flex>
        </MenuButton>
        <MenuList >
            {user ? (<><MenuItem  fontSize="10pt"  fontWeight={700}
         _hover={{color:"white",bg:"blue.500"}}>
        <Flex align="center ">
        <Icon fontSize={24}  mr={2} as={CgProfile}/>
        Profile
        </Flex>
        </MenuItem>
        <MenuDivider/>
        <MenuItem  fontSize="10pt"  fontWeight={700}
         _hover={{color:"white",bg:"blue.500"}}
         onClick={()=>signOut(auth)}>
        <Flex align="center ">
        <Icon fontSize={24}  mr={2} as={MdOutlineLogout}/>
        Logout
        </Flex>
        </MenuItem>
        </>)
        :(
        <>
        <MenuItem  fontSize="10pt"  fontWeight={700}
         _hover={{color:"white",bg:"blue.500"}}
         onClick={()=> setAuthModalState({open:true,view:"login" })}>
        <Flex align="center ">
        <Icon fontSize={24}  mr={2} as={MdOutlineLogin}/>
        Log In / SignUp
        </Flex>
        </MenuItem>
        </>
        )}
        
        </MenuList>
        </Menu>
        );
        
}
export default UserMenu;


