import { Row, Text, Pressable } from "native-base"

export function EmptyPoolList() {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        You are not yet participating in {"\n"} of a Pool, how about
      </Text>

      <Pressable>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          search for one by code
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        or
      </Text>

      <Pressable>
        <Text textDecorationLine="underline" color="yellow.500">
          create a new Pool
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  )
}
