import { authModalState } from '@/src/atoms/authModalAtom';
import { Input, Button, Flex,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/clientApp";
import {FIREBASE_ERRORS} from "../../../firebase/errors";



const SignUp:React.FC = () => {
    const setAuthModalState =useSetRecoilState(authModalState);
    const [signUpForm,setSignUpForm]=useState({
        email:" ",
        password:" ",
        confirmPassword: "",
    });
 const [error,setError]=useState('');
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      usererror,
    ] = useCreateUserWithEmailAndPassword(auth);


    const onSubmit =(event:React.FormEvent<HTMLFormElement>)=>{
       event.preventDefault();
       if(error) setError('');
      if(signUpForm.password !== signUpForm.confirmPassword){
         setError("password doest not match");
         return;
       }

      console.log(signUpForm.email, signUpForm.password); 
      createUserWithEmailAndPassword(signUpForm.email,signUpForm.password);
    };


   const onChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
     setSignUpForm(prev=>({
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
     minLength={8}
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
     <Input name="confirmPassword"
        placeholder="confirm password"
        type="password"
        required
        minLength={8}
        onChange={onChange}
       mb={2}  
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
       {(error || usererror) && 
       (<Text align="center" height="36px" width="100%" mr={2} mb={2} color="red">{
       error || FIREBASE_ERRORS[usererror?.message as keyof typeof FIREBASE_ERRORS]}</Text>)}
    <Button  type="submit" mt={2} mb={2} width="100%" height="36px" isLoading={loading} >Sign Up</Button>
    <Flex justifyContent="center" fontSize="9pt"  >
        <Text mr={1}> Already Redditer login</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer"
         onClick={() => setAuthModalState((prev) =>({
            ...prev,
            view: "login",
         }))

        }>Log In</Text>
        
    </Flex>
    </form>
    );
}
export default SignUp;