import {
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/action";
import PostCard from "./PostCard";

const ViewTweet = () => {
    const dispatch = useDispatch();
    const posts = useSelector(store=>store.posts);
    useEffect(() => {
        dispatch(getPosts());
    }, [])
    
  return (
    <SimpleGrid mt={"20px"} columns={{base:1,md:3,lg:4}} spacing={5}>
      {posts.map(elem=>(
        <PostCard key={elem.id} gif={elem.gif_url} user_name={elem.user_name} id={elem.id} des={elem.des}/>
      ))}
    </SimpleGrid>
  );
};

export default ViewTweet;
