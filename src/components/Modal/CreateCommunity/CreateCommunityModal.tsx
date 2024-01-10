import { useDisclosure, Modal, ModalOverlay,Text, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {HiLockClosed} from "react-icons/hi";
import {BsFillEyeFill,BsFillPersonFill} from "react-icons/bs";
import {auth, firestore} from "../../../firebase/clientApp";
import {doc,getDoc,serverTimestamp,setDoc} from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open:boolean;
    handleClose:()=>void;
    
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open,handleClose}) => {
  const [user] =useAuthState(auth);
   const [communityName,setCommunityName]=useState('');
   const [charsRemaning,setCharsRemaning]=useState(21);
   const [communityType,setCommunityType]=useState("public");
   const[error,setError]=useState("");
   const[loading,setLoading]=useState(false);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.value.length >21) return;
    setCommunityName(event.target.value);
    setCharsRemaning(21-event.target.value.length);
   }
   const oncommunityChange =(event:React.ChangeEvent<HTMLInputElement>)=>{
/* setLoginForm(prev=>({
        ...prev,
        [event.target.name]:event.target.value,
    })); */
  setCommunityType(event.target.name);
   }
   const handleCreateCommunity = async() =>{
          const format = /[`^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$]/;
          if(format.test(communityName) || communityName.length<3){
             setError("Community names must be 3 to 21 and contains special characters");
          return;
   }
  setLoading(true);

  try {
    const communityDocRef =doc(firestore,'communities',communityName);
    const communityDoc =await getDoc(communityDocRef);
    if(communityDoc.exists()){
      throw new Error (`${communityName} is already taken Try Another`);
     
    }
     await setDoc(communityDocRef,{
         
       creatorId:user?.uid ,
       createdAt: serverTimestamp(),
       numberOfMember: 1,
       PrivacyType: communityType 
     });
  } catch (error:any) {
     console.log(error);
     setError(error.message);
  }
  
 setLoading(false);
   }
    return (
      <>
        
  
        <Modal isOpen={open} onClose={handleClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display="flex" padding={3} flexDirection="column" fontSize={15} >Create a Communties</ModalHeader>
           <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px" border="1px solid red">
              <Text fontWeight={600} fontSize={15}>Name</Text>
              <Text fontSize={11} color="gray.500">Communties name cannot be changed</Text>
              <Text position="relative" color="gray.500" top="28px" left="10px" width="20px"> r/</Text> 
            <Input position="relative" value={communityName} size="sm" pl="23px" onChange={handleChange}/>
            <Text fontSize={charsRemaning === 0? "20px":"10px"} color={charsRemaning ===0 ? "red" : "gray.500"}>{charsRemaning}Characters Remaning</Text>
            <Text fontSize="9pts" color="red.300">{error} </Text>
            <Box mt={4} mb={4} >
              <Text fontWeight={600} fontSize={17}> Community type</Text>
              <Stack>
                <Checkbox name="public" isChecked={communityType === "public" } onChange={oncommunityChange}>
                <Flex align="center">
                <Icon as={BsFillPersonFill} mr={2} color="gray.500"/>
               <Text fontSize="10pt" mr={1}>Public</Text>
              <Text   fontSize="8pt" pt={1}color="gray.500"> Anyone can view, post and comment to community</Text>
                </Flex>
                </Checkbox>
                 <Checkbox name="restricted" isChecked={communityType === "restricted"}onChange={oncommunityChange}>
                 
                 <Flex align="center">
                 <Icon as={HiLockClosed} color="gray.500" mr={2}/>
                 <Text fontSize="10pt" mr={1}>Restricted</Text>
             <Text   fontSize="8pt" pt={1}color="gray.500"> Anyone can view appporved can post and comment to community</Text>
               </Flex>
                  </Checkbox>

                <Checkbox name="private" isChecked={communityType === "private"}onChange={oncommunityChange}>
                  <Flex align="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2}/>
                 <Text fontSize="10pt" mr={1}>private</Text>
             <Text   fontSize="8pt" pt={1}color="gray.500"> Apporved can only view, post and comment to community</Text>
               </Flex></Checkbox>
              </Stack>
            </Box>
            </ModalBody>
            </Box>
            <ModalFooter  bg="gray.100" borderRadius="0px 0px 10px 10px">
              <Button variant="outline" mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button  onClick={handleCreateCommunity} isLoading={loading}>Create Community</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };
export default CreateCommunityModal;