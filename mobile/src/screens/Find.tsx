import { useState } from "react"
import { Heading, useToast, VStack } from "native-base"
import { useNavigation } from "@react-navigation/native"

/* import { api } from "../services/api" */

import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Input } from "../components/Input"

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")

  const toast = useToast()
  const { navigate } = useNavigation()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        toast.show({
          title: "Report the code",
          placement: "top",
          bgColor: "red.500",
        })
      }

      await api.post("/pools/join", { code })

      toast.show({
        title: "You is in the Pool successfully!",
        placement: "top",
        bgColor: "green.500",
      })

      navigate("pools")
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (error.response?.data?.message === "Pool not found.") {
        toast.show({
          title: "It was not possible to find the Pool",
          placement: "top",
          bgColor: "red.500",
        })
        return
      }

      if (error.response?.data?.message === "You already joined this poll.") {
        toast.show({
          title: "You are already in this Pool",
          placement: "top",
          bgColor: "red.500",
        })
        return
      }
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Search by code" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
         Find a Pool through{"\n"}
          your unique code
        </Heading>

        <Input
          mb={2}
          placeholder="What is the Pool code?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button title="SEARCH BY CODE" onPress={handleJoinPool} />
      </VStack>
    </VStack>
  )
}
