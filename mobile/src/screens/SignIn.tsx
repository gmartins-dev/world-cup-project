import { Center, Text, Icon } from "native-base"
import Logo from "../assets/logo.svg"
import { Button } from "../components/Button"
import { Fontisto } from "@expo/vector-icons"

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        title="ENTER WITH GOOGLE ACCOUNT"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt="12"
      />
      <Text color="white" textAlign="center" mt="4">
        We do not use any information beyond {'\n'} your email to create your account
      </Text>
    </Center>
  )
}
