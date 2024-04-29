import React, { createContext, useMemo, useReducer, useState } from 'react';

import { IGlobalContext, IGlobalProviderProps, MyTreeItem } from './types';
import { getTreeData } from '@/utils/utils';

export const GlobalContext = createContext({} as IGlobalContext);

const toggleNode = (nodes: MyTreeItem[], id: string, expanded: boolean): MyTreeItem[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded: expanded };
    }
    if (node.children) {
      return { ...node, children: toggleNode(node.children, id, expanded) };
    }
    return node;
  });
};

const updateAllNodes = (data: MyTreeItem[], isExpanded: boolean): MyTreeItem[] => {
  return data.map((node) => {
    if (node.children) {
      return {
        ...node,
        isExpanded,
        children: updateAllNodes(node.children, isExpanded)
      };
    }
    return { ...node, isExpanded };
  });
};

const searchNodesAndUpdateHighlight = (nodes: any, query: any) => {
  nodes.forEach((node) => {
    let shouldHighlight = query.length
      ? node.name.toLowerCase().includes(query.toLowerCase())
      : false;

    node.isHighlight = shouldHighlight;

    if (node.children) {
      searchNodesAndUpdateHighlight(node.children, query);
      if (node.children.some((child) => child.isHighlight)) {
        node.isHighlight = true;
      }
    }
  });

  return nodes;
};

const treeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    case "TOGGLE_NODE":
      return toggleNode(state, action.id, action.isExpanded);
    case "EXPAND_ALL":
      return updateAllNodes(state, true);
    case "COLLAPSE_ALL":
      return updateAllNodes(state, false);
    case "SEARCH":
      return searchNodesAndUpdateHighlight(state, action.query);
    default:
      return state;
  }
};
export function GlobalProvider({ children }: IGlobalProviderProps) {

  const [activeTab, setActiveTab] = useState<string>('Apex Unit');
  const [state, dispatch] = useReducer(treeReducer, getTreeData(activeTab))


  const contextData = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      state,
      dispatch
    }),
    [activeTab, state],
  );

  return (
    <GlobalContext.Provider
      value={contextData}
    >
      {children}
    </GlobalContext.Provider>
  );
}
