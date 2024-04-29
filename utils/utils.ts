import { MyAsset, MyLocation, MyTreeItem } from "@/contexts/global/types";

import ApexLocations from "./jsons/Apex/locations.json";
import ApexAssets from "./jsons/Apex/assets.json";

import TobiasLocations from "./jsons/Tobias/locations.json";
import TobiasAssets from "./jsons/Tobias/assets.json";

import JaguarLocations from "./jsons/Jaguar/locations.json";
import JaguarAssets from "./jsons/Jaguar/assets.json";

export function createTree(locations: MyLocation[], assets: MyAsset[]) {
  let treeItemsIndex = new Map<string, MyTreeItem>();

  let root: MyTreeItem = {
    id: "root",
    name: 'root',
    parentId: null,
    children: [],
  };

  for (let location of locations) {
    let locationTree: MyTreeItem = {
      id: location.id,
      parentId: location.parentId,
      name: location.name,
      children: [],
    };
    treeItemsIndex.set(location.id, locationTree);
  }

  for (let asset of assets) {
    let assetTree: MyTreeItem = {
      id: asset.id,
      parentId: asset.parentId ?? asset.locationId,
      locationId: asset.locationId ? true : false,
      name: asset.name,
      sensorType: asset.sensorType,
      status: asset.status,
      children: [],
    };
    treeItemsIndex.set(asset.id, assetTree);
  }

  for (let [id, treeItem] of Array.from(treeItemsIndex)) {
    let parentId = treeItem.parentId;
    if (parentId === null) {
      root.children?.push(treeItem);
    } else {
      let parent = treeItemsIndex.get(parentId!);
      if (parent) {
        parent.children?.push(treeItem);
      }
    }
  }

  return root.children;
}

export function getTreeData(activeTab: string) {
  switch (activeTab) {
    case "Apex Unit":
      return createTree(ApexLocations, ApexAssets);
    case "Tobias Unit":
      return createTree(TobiasLocations, TobiasAssets);
    case "Jaguar Unit":
      return createTree(JaguarLocations, JaguarAssets);
    default:
      return createTree(ApexLocations, ApexAssets);
  }
}

// const tree = createTree(locations, assets)

// console.log(JSON.stringify(tree, null, 2))
