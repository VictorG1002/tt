import { Dispatch, SetStateAction } from "react"

export interface IGlobalContext {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  state: MyTreeItem[]
  dispatch: Dispatch<any>
  selectedFilter: string
  setSelectedFilter: Dispatch<SetStateAction<string>>
}

export interface IGlobalProviderProps {
  children: React.ReactNode;
}
export interface MyLocation {
  name: string;
  id: string;
  parentId: string | null;
}
export interface MyAsset {
  name: string;
  id: string;
  locationId: string | null;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
}
export interface MyTreeItem {
  parent?: any
  id?: string;
  parentId?: string | null;
  children?: MyTreeItem[];
  name?: string;
  sensorType?: string | null;
  status?: string | null;
  locationId?: boolean;
  isExpanded?: boolean;
  isHighlight?: boolean;
}
