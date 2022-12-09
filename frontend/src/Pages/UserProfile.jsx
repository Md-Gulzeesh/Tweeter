import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPosts } from "../Redux/action";

const UserProfile = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const handleDelete = async (user) => {
    try {
      let response = await axios.delete(
        `https://mock-8-coding-vite.onrender.com/user/${user.id}`
      );
      dispatch(deleteUser());
      alert("Item deleted");
      toast({
        title: "Profile delete successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/signin");
    } catch (error) {
      console.log("User insesdfh", user.id);
      console.log({ error });
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [])
  
  return (
    <Flex justify={"center"} m="5rem auto 0 auto">
      <Card maxW="xs">
        <CardBody>
          <Image
            width={"100%"}
            src={currentUser.avatar_url}
            alt={currentUser.user_name}
            borderRadius="50%"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">@{currentUser.user_name}</Heading>
            <Heading as={"h1"}>{currentUser.full_name}</Heading>
            <Text>{currentUser.email}</Text>
            <Flex gap={"10px"}>
              <Button>{Math.floor(Math.random() * 100)} Followers</Button>
              <Button>{Math.floor(Math.random() * 100)} Following</Button>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button onClick={onOpen} variant="solid" colorScheme="green">
              Edit Profile
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit your profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input type={"text"} placeholder="Enter full name" defaultValue={currentUser.full_name} />
                    <FormLabel>Email</FormLabel>
                    <Input type={"email"} placeholder="Enter email" defaultValue={currentUser.email} />
                    <FormLabel>Profile Image</FormLabel>
                    <Input type={"url"} placeholder="Enter image url"/>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => handleDelete(currentUser)}
            >
              Delete Account
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UserProfile;
