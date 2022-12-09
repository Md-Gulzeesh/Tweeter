import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const UserProfile = () => {
  const currentUser = useSelector((store) => store.currentUser);
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
  return (
    <Flex w={"20%"} m="5rem auto 0 auto">
      <Card textAlign={"center"}>
        <CardBody>
          <Image
            width={"100%"}
            src={currentUser.avatar_url}
            alt={currentUser.user_name}
            borderRadius="50%"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">@{currentUser.user_name}</Heading>
            <Heading as={"h1"}>@{currentUser.full_name}</Heading>
            <Text>{currentUser.email}</Text>
            <Flex>
              <Button>{Math.floor(Math.random() * 100)} Followers</Button>
              <Button>{Math.floor(Math.random() * 100)} Following</Button>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="green">
              Edit Profile
            </Button>
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
