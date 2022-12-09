import { Button, Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const PostCard = ({gif,user_name,des}) => {
    const currentUser = useSelector(store=>store.currentUser);
  return (
    <Card maxW="sm">
        <CardBody>
          <Image
            src={gif}
            alt={user_name}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="sm">Posted By: {user_name}</Heading>
            <Text>
              {des}
            </Text>
          </Stack>
        </CardBody>
       {(user_name === currentUser.user_name)?( <Flex gap={10} p={"10px"}>
          <Button colorScheme="teal">Edit</Button>
          <Button colorScheme="red">Delete</Button>
        </Flex>):""}
      </Card>
  )
}

export default PostCard