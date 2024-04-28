import styled from "styled-components";

export const TreeViewContainer = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TreeNodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding-left: 20px;

  & .title {
    display: flex;
    gap: 4px;
  }

  & span {
    text-align: center;
    color: #17192d;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

  .toggle-icon {
    cursor: pointer;
    background-color: transparent;
    margin-right: 10px;
    border: none;
  }


  & .component {
    display: flex;
    align-items: center;
    gap: 4px
  }
`;
