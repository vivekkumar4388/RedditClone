import React from 'react';
import { Flex } from '@chakra-ui/react';

import { useRecoilValue } from 'recoil';
import Login from './Login';
import SignUp from './SignUp';
import { authModalState } from "../../../atoms/authModalAtom";
type AuthInputsProps = {
  //user:any;  
};

const AuthInputs:React.FC<AuthInputsProps> = () => {
      
    const modalState =useRecoilValue(authModalState);
    

return(
      <Flex align="center" justify="center" width="100%" mt={4}>
        {modalState.view === "login" && <Login/>}
  
   {modalState.view==="signup" &&  <SignUp/>}

</Flex>

);}
export default AuthInputs;