import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem,Text } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {   
};

const Communities:React.FC<CommunitiesProps> = () => {
const [open,setOpen]=useState(false);

    return(
    <>
     
      <CreateCommunityModal open={open} handleClose={()=> setOpen(false)}/>
      <MenuItem width="100%"
       onClick={()=>setOpen(true)}
       fontSize="10pts"
       _hover={{bg:"gray.100"}}  
       
                         >
      <Flex  align="center">
        <Icon as={GrAdd} mr={2} fontSize={20}  />
        hii bois
      </Flex>
      </MenuItem>
    </>
    );
}
export default Communities;