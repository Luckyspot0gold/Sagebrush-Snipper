"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface CasinoState {
  bankroll: number
  tonkaTokens: number
  ageVerified: boolean
  activeGame: string | null
  gameHistory: any[]
  landDeeds: number
}

interface CasinoAction {
  type: string
  payload?: any
}

const initialState: CasinoState = {
  bankroll: 1000,
  tonkaTokens: 10,
  ageVerified: false,
  activeGame: null,
  gameHistory: [],
  landDeeds: 0,
}

const casinoReducer = (state: CasinoState, action: CasinoAction): CasinoState => {
  switch (action.type) {
    case "VERIFY_AGE":
      return { ...state, ageVerified: true }
    case "UPDATE_BANKROLL":
      return { ...state, bankroll: state.bankroll + action.payload }
    case "UPDATE_TOKENS":
      return { ...state, tonkaTokens: state.tonkaTokens + action.payload }
    case "SET_GAME":
      return { ...state, activeGame: action.payload }
    case "ADD_LAND_DEED":
      return { ...state, landDeeds: state.landDeeds + 1 }
    case "ADD_GAME_HISTORY":
      return {
        ...state,
        gameHistory: [...state.gameHistory, action.payload],
      }
    default:
      return state
  }
}

const CasinoContext = createContext<{
  state: CasinoState
  dispatch: React.Dispatch<CasinoAction>
} | null>(null)

export const CasinoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(casinoReducer, initialState)

  return <CasinoContext.Provider value={{ state, dispatch }}>{children}</CasinoContext.Provider>
}

export const useCasino = () => {
  const context = useContext(CasinoContext)
  if (!context) {
    throw new Error("useCasino must be used within a CasinoProvider")
  }
  return context
}
