import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/action";

const Tweet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweet, setTweet] = useState("");
  const currentUser = useSelector((store) => store.currentUser);
  const currentLocation = useSelector((store) => store.currentLocation);
  const [selectedgif, setSelectedGif] = useState("");
  const [searchgif, setSearchGif] = useState("");
  const [mapGifData, setMapGifData] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };
  const handleSearchGif = (e) => {
    if (e.target.value !== "") {
      setSearchGif(e.target.value);
    }
  };
  const handleSearch = async () => {
    try {
      let response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=s9ROV9EuwdfMZaLJzVRMq8bWl7b6z4WT&q=${searchgif}&limit=25&offset=0&rating=g&lang=en`
      );
      setMapGifData(response.data.data);
    } catch (error) {
      console.log({ error });
    }
  };
  const selectGif = (e) => {
    setSelectedGif(e.target.src);
    toast({
      title: "Gif Selected!",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };
  const handlePost = async () => {
    try {
      if (tweet !== "") {
        let dateAndTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        await axios.post("https://mock-8-coding-vite.onrender.com/posts", {
          user_name: currentUser.user_name,
          des: tweet,
          gif_url: selectedgif,
          location: currentLocation,
          timeStamp:dateAndTime
        });
        toast({
          title: "Tweet posted!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        setSearchGif("");
        setTweet("");
        setSelectedGif("");
        setMapGifData([]);
        dispatch(getPosts());
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Container p={"20px"} border={"1px solid gainsboro"} borderRadius="10px">
      <Textarea
        borderRadius={"5px"}
        value={tweet}
        placeholder="Write your beautiful post..."
        onChange={handleTweetChange}
        size="sm"
      />
      <Flex m={"10px auto"} justify={"space-between"}>
        <Button onClick={onOpen} colorScheme={"whatsapp"}>
          Gifs
        </Button>
        <Button onClick={handlePost} colorScheme={"teal"}>
          Post
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Gifs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"10px"}>
              <Input
                onChange={handleSearchGif}
                type={"text"}
                value={searchgif}
                placeholder="Write gif name"
              />
              <Button onClick={handleSearch} colorScheme={"telegram"}>
                Search
              </Button>
            </Flex>
            <SimpleGrid m={"5px auto"} columns={2} spacing={2}>
              {mapGifData.map((elem) => (
                <Box width={"100%"} key={elem.id}>
                  <Image
                    onClick={selectGif}
                    width={"100%"}
                    _hover={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      cursor: "pointer",
                    }}
                    borderRadius={"5px"}
                    src={elem.images.original.url}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Tweet;
