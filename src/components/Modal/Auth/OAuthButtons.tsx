import React from 'react';
import { Flex,Button ,Image,Text} from '@chakra-ui/react';
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";


const OAuthButtons:React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
    <Flex direction="column" mb={4} width="100%" >
      <Button variant="oauth" mb={2}  isLoading={loading}
      onClick={()=> signInWithGoogle()}><Image src="/images/googlelogo.png" height="20px" mr={4}></Image> Continue with Google </Button>
      <Button variant="oauth" mb={2} > Some Other Provider </Button>
      {error && <Text> {error.message} </Text>}

    </Flex>
    );

}
export default OAuthButtons;