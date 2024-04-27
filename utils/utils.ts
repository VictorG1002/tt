interface MyLocation {
  name: string;
  id: string;
  parentId: string | null;
}

interface MyAsset {
  name: string;
  id: string;
  locationId: string | null;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
}

interface MyTreeItem {
  id?: string;
  parentId?: string | null;
  children?: MyTreeItem[];
  name?: string;
  sensorType?: string | null;
  status?: string | null;
}


export function createTree(locations:MyLocation[], assets: MyAsset[]) {
  
  let treeItemsIndex = new Map<string, MyTreeItem>();

  let root: MyTreeItem = {
    id: "root",
    parentId: null,
    children: [],
  };

  for (let location of locations) {
    let locationTree: MyTreeItem = {
      id: location.id,
      parentId: location.parentId,
      name: location.name,
      children: []
    };
    treeItemsIndex.set(location.id, locationTree);
  }

  for (let asset of assets) {
    let assetTree: MyTreeItem = {
      id: asset.id,
      parentId: asset.parentId ?? asset.locationId,
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

  return root.children
}

// const tree = createTree(locations, assets)

// console.log(JSON.stringify(tree, null, 2))
