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

const searchNodesWithCriticalStatus = (data: MyTreeItem[], isExpanded: boolean): MyTreeItem[] => {
  const hasAlertInChildren = (node: MyTreeItem) => {
    if (node.status === 'alert') {
      return true;
    }
    if (node.children) {
      return node.children.some(hasAlertInChildren);
    }
    return false;
  };

  return data.map((node) => {
    const alertInChildren = node.children ? hasAlertInChildren(node) : node.status === 'alert';

    if (node.children) {
      return {
        ...node,
        isExpanded: alertInChildren ? true : isExpanded,
        isHighlight: alertInChildren,
        children: searchNodesWithCriticalStatus(node.children, alertInChildren)
      };
    }
    return {
      ...node,
      isExpanded: node.status === 'alert' ? true : isExpanded,
      isHighlight: node.status === 'alert'
    };
  });
};

const searchNodesAndUpdateHighlight = (nodes: MyTreeItem[], query: string) => {
  let foundHighlight = false;

  const highlightNodes = (nodes: MyTreeItem[], parent: MyTreeItem | null = null) => {
    nodes.forEach(node => {
      node.isHighlight = false;
      node.isExpanded = false;

      if (node.children && node.children.length > 0) {
        if (highlightNodes(node.children, node)) {
          foundHighlight = true;
          node.isExpanded = true;
        }
      }

      if (!foundHighlight && query.length && node.name && node.name.toLowerCase().includes(query.toLowerCase())) {
        node.isHighlight = true;
        foundHighlight = true;

        let currentNode = parent;
        while (currentNode) {
          currentNode.isExpanded = true;
          currentNode = currentNode?.parent;
        }
      }
    });

    return foundHighlight;
  };

  highlightNodes(nodes);
  foundHighlight = false;

  return nodes;
};

const filterNodesBySensorType = (nodes: MyTreeItem[], sensorType: string): MyTreeItem[] => {
  const hasSensorInChildren = (node: MyTreeItem) => {
    if (node.sensorType === sensorType) {
      return true;
    }
    if (node.children) {
      return node.children.some(hasSensorInChildren);
    }
    return false;
  };


  const buildFilteredTree = (nodes: MyTreeItem[]) => {
    return nodes.reduce((acc: MyTreeItem[], node) => {
      if (hasSensorInChildren(node)) {
        const newNode = { ...node, isExpanded: true };
        if (node.children) {
          newNode.children = buildFilteredTree(node.children);
        }
        acc.push(newNode);
      }
      return acc;
    }, []);
  };

  return buildFilteredTree(nodes);
};

const treeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    case "TOGGLE_NODE":
      return toggleNode(state, action.id, action.isExpanded);
    case "CRITICAL_STATUS":
      return searchNodesWithCriticalStatus(state, true);
    case "SEARCH":
      return searchNodesAndUpdateHighlight(state, action.query);
    case "SENSOR_ENERGY":
      return filterNodesBySensorType(state, 'energy');
    default:
      return state;
  }
};


export function GlobalProvider({ children }: IGlobalProviderProps) {

  const [activeTab, setActiveTab] = useState<string>('Apex Unit');
  const [state, dispatch] = useReducer(treeReducer, getTreeData(activeTab))
  const [selectedFilter, setSelectedFilter] = useState('')


  const contextData = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      state,
      dispatch,
      selectedFilter,
      setSelectedFilter
    }),
    [activeTab, state, selectedFilter],
  );

  return (
    <GlobalContext.Provider
      value={contextData}
    >
      {children}
    </GlobalContext.Provider>
  );
}
