import React from 'react';
import { Flex,Button } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from '../../Modal/Auth/AuthModal';
import { User, signOut } from 'firebase/auth';
import {auth} from '../../../firebase/clientApp';
import Icons from "./Icons";
import UserMenu from './UserMenu';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';


type RightContentProps = {
user? : User|null;
};

const RightContent:React.FC<RightContentProps> = ({user}) => {

    
return(
     <>
      <AuthModal/>
     <Flex justify="center" align="center">
     {user ? (<Icons/>):(<AuthButtons/>)}
    
     <UserMenu user={user}/> 
       
     </Flex >
     </>

);
}
export default RightContent;