import { Box, Flex, Heading, Input } from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
     <Flex className='nav'>
      <Box>
       <Heading as="h1">Tweeter</Heading>
      </Box>
      <Input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/user">User Profile</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
      </ul>
    </Flex>
  )
}

export default Navbar