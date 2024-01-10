import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { BsChatDots, BsArrowRightCircle } from 'react-icons/bs';
import { GrAdd } from "react-icons/gr";
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from "react-icons/io5";
type IconsProps = {
        //user:any;
};

const Icons: React.FC<IconsProps> = () => {
    return (
        <Flex>
            <Flex display={{ base: "none", md: "flex" }}
                align="center"
                borderRight="1px solid red"
                borderColor="gray.200">
                <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={BsArrowRightCircle} fontSize={20} /></Flex>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }}
                align="center"
                borderRight="1px solid red"
                borderColor="gray.200">
                <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={IoFilterCircleOutline} fontSize={22} /></Flex>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }}
                align="center"
                borderRight="1px solid red"
                borderColor="gray.200">
                <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={IoVideocamOutline} fontSize={22} /></Flex>
            </Flex>
            <>
            <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={BsChatDots} fontSize={22} /></Flex>
                <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={IoNotificationsOutline} fontSize={22} />
                </Flex>
                <Flex mr={1.5} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: "gray.200" }}>
                    <Icon as={GrAdd} fontSize={22} /></Flex>
            </>
        </Flex>
    );
}
export default Icons;