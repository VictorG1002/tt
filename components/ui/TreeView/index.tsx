import React from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCubeOutline, IoLocationOutline } from "react-icons/io5";
import { FaCircle, FaCodepen } from "react-icons/fa";
import { MdBolt } from "react-icons/md";

import { MyTreeItem } from "@/contexts/global/types";
import { useGlobal } from "@/contexts/global";

import * as S from './styles'

const TreeNode = ({ node }: { node: MyTreeItem }) => {

  const { dispatch } = useGlobal()


  return (
    <S.TreeNodeContainer>
      <div className="title">

        {node.children && (
          <button onClick={() =>
            dispatch({
              type: "TOGGLE_NODE",
              id: node.id,
              isExpanded: !node.isExpanded
            })} className="toggle-icon" disabled={node.children.length === 0}>
            {node.isExpanded ? <IoIosArrowUp size={14} /> : <IoIosArrowDown size={14} />}
          </button>
        )}

        {!node.sensorType && node.sensorType !== null && node.status !== null && (
          <IoLocationOutline size={22} color="#2188FF" />
        )}

        {node.sensorType === null && node.parentId === null && node.status === null && (
          <IoCubeOutline size={22} color="#2188FF" />
        )}

        {node.locationId && node.parentId && node.children && !node.sensorType && (
          <IoCubeOutline size={22} color="#2188FF" />
        )}

        {!node.sensorType && node.parentId && !node.locationId && node.status === null && (
          <IoCubeOutline size={22} color="#2188FF" />
        )}

        {node.sensorType && (
          <FaCodepen size={22} color="#2188FF" />
        )}


        <div className="component">
          <span>{node.name}</span>

          {node.sensorType === 'energy' && (
            <MdBolt size={18} color="#52C41A" />
          )}

          {node.status === 'alert' && (
            <FaCircle size={8} color="red" />
          )}
        </div>
      </div>

      {node.isExpanded && <TreeView data={node.children || []} />}
    </S.TreeNodeContainer>
  );
};

const TreeView = ({ data }: { data: MyTreeItem[] }) => {

  return (
    <S.TreeViewContainer>
      {data.map((node: any) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </S.TreeViewContainer>
  );
};

export default TreeView;
