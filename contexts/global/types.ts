import { Dispatch, SetStateAction } from "react"

export interface IGlobalContext {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

export interface IGlobalProviderProps {
  children: React.ReactNode;
}
