import styled from "styled-components";

interface ButtonHeaderProps {
  $isSelected: boolean;
}

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #17192d;
  padding: 0px 16px;
  height: 48px;
  align-items: center;

  & .buttons {
    display: flex;
    gap: 10px;
  }
`;

export const ButtonHeader = styled.button<ButtonHeaderProps>`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  background: ${(props) => (props.$isSelected === true ? "#2188ff" : "#023B78")};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.05);

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`;
