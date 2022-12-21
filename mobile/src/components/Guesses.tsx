import { useEffect, useState } from "react"
import { FlatList, useToast } from "native-base"

import { api } from "../services/api"

import { Loading } from "./Loading"
import { Game, GameProps } from "../components/Game"
import { EmptyMyPoolList } from "./EmptyMyPoolList"

interface Props {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState("")
  const [secondTeamPoints, setSecondTeamPoints] = useState("")

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
    } catch (error) {
      toast.show({
        title: "It was not possible to list the games",
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Enter the scoring to guess",
          placement: "top",
          bgColor: "red.500",
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: "Guessed successfully!",
        placement: "top",
        bgColor: "green.500",
      })

      fetchGames()
    } catch (error) {
      console.log(error)

      toast.show({
        title: "It was not possible to send the guess.",
        placement: "top",
        bgColor: "red.500",
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  )
}
