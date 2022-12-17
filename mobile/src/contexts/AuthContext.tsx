import { ReactNode, createContext } from "react"

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {

  async function signIn() {
    console.log("test sign function")
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Guilherme",
          avatarUrl: "https://github.com/guilhermemm-dev",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
