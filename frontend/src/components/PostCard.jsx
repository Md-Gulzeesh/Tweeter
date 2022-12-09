import {
  Button,
  Card,
  CardBody,
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/action";

const PostCard = ({ gif, user_name, des, id }) => {
  const currentUser = useSelector((store) => store.currentUser);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newtweet, setNewTweet] = useState("");
  const [newgif, setNewGif] = useState("");
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mock-8-coding-vite.onrender.com/posts/${id}`);
      toast({
        title: "Tweet Deleted!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      dispatch(getPosts());
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  const handletweetChange = (e) => {
    if (e.target.value !== "") {
      setNewTweet(e.target.value);
    }
  };
  const handleGifChange = (e) => {
    if (e.target.value !== "") {
      setNewGif(e.target.value);
    }
  };
  const handleEdit = async (id) => {
    try {
      if (newgif !== "" && newtweet !== "") {
        await axios.patch(
          `https://mock-8-coding-vite.onrender.com/posts/${id}`,
          { gif_url: newgif, des: newtweet }
        );
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      } else if (newgif !== "") {
        await axios.patch(
          `https://mock-8-coding-vite.onrender.com/posts/${id}`,
          {
            gif_url: newgif,
          }
        );
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      } else {
        await axios.patch(
          `https://mock-8-coding-vite.onrender.com/posts/${id}`,
          {
            des: newtweet,
          }
        );
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={gif} alt={user_name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="sm">Posted By: {user_name}</Heading>
          <Text>{des}</Text>
        </Stack>
      </CardBody>
      {user_name === currentUser.user_name ? (
        <Flex gap={10} p={"10px"}>
          <Button onClick={onOpen} colorScheme="teal">
            Edit
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your tweet</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Tweet</FormLabel>
                  <Textarea
                    onChange={handletweetChange}
                    placeholder="Enter modified tweet"
                    defaultValue={des}
                  />
                  <FormLabel>Gif URL</FormLabel>
                  <Input
                    onChange={handleGifChange}
                    type={"url"}
                    placeholder="Enter gif url"
                    defaultValue={gif}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => handleEdit(id)}
                  colorScheme="teal"
                  mr={3}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button onClick={() => handleDelete(id)} colorScheme="red">
            Delete
          </Button>
        </Flex>
      ) : (
        ""
      )}
    </Card>
  );
};

export default PostCard;
