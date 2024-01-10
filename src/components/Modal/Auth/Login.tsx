import React,{useState} from 'react';
import {Button, Flex, Input,Text} from "@chakra-ui/react";
import { on } from 'events';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth}  from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setAuthModalState =useSetRecoilState(authModalState);
    const [loginForm,setLoginForm]=useState({
        email:"",
        password:"",
    });
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
    const onSubmit =(event: React.ChangeEvent<HTMLFormElement>)=>{
      event.preventDefault();
      signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };
   const onChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
     setLoginForm(prev=>({
        ...prev,
        [event.target.name]:event.target.value,
    }));
    

   };
    return (
    <form onSubmit={onSubmit}>
     <Input  name="email" 
     required 
     placeholder="email"
      type="email" 
      mb={2} 
     _placeholder={{color:"gray.500"}}
     _hover={{
        bg:"white",
        border:"1px solid",
        borderColor:"blue.500",
     }}
     _focus={{
        outline:'none',
        bg:"white",
        border:"1px solid",
        borderColor:"blue.500",
     }}
     fontSize="10pt"
     bg="gray.50"
     onChange={onChange}/>
     <Input name="password" 
     required 
     placeholder="password"
      type="password"
       mb={2}  
       onChange={onChange}  
       fontSize="10pt"
       bg="gray.50"
 _placeholder={{color:"gray.500"}}
       _hover={{
        bg:"white",
        border:"1px solid",
        borderColor: "blue.500",
       }}
       _focus={{
        outline:"none",
        bg:"white",
        border:"1px solid",
        borderColor:"blue.500",
       }}
       />
       
       <Text textAlign="center" height="36px" width="100%" mr={2} mb={2} fontSize="10pt" color="red">
       {FIREBASE_ERRORS[ error?.message as keyof typeof FIREBASE_ERRORS]} </Text>
    <Button  type="submit" mt={2} mb={2} width="100%" height="36px"  isLoading={loading}>Log In</Button>
    <Flex justifyContent="center" fontSize="9pt"  >
        <Text mr={1}> Forget your password ?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer"
         onClick={() => setAuthModalState((prev) =>({
            ...prev,
           view: "resetPassword",
         }))

        }> Reset </Text>
        </Flex>
    <Flex justifyContent="center" fontSize="9pt"  >
        <Text mr={1}> New here ?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer"
         onClick={() => setAuthModalState((prev) =>({
            ...prev,
            view: "signup",
         }))

        }> SIGN UP</Text>
        <Text> </Text>
    </Flex>
    </form>
    );
}
export default Login;