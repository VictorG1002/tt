import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #d8dfe6;
  background: #fff;

  & .header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    & .title {
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;

      & span {
        color: #77818c;
        text-align: center;
        font-family: Inter;
        font-style: normal;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }

  & .columns {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  & .input {
    display: flex;
    align-items: center;
    border: 1px solid #d8dfe6;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    padding: 4px;
    margin-top: 16px;
    background: #fff;
    padding: 1px 12px 0px 0px;

    & input {
      border: none;
      outline: none;
      padding: 8px;
      width: 100%;
      height: 45px;
    }

    & button {
      cursor: pointer;
      display: flex;
      align-items: center;
      border: none;
      background: transparent;
    }

    ::placeholder {
        color: #C1C9D2;
        opacity: 1; 
      }
  }


  & .view {
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-right: 1px solid var(--Shapes-Border-input-Border-card, #D0D7DE);
    border-left: 1px solid var(--Shapes-Border-input-Border-card, #D0D7DE);
    border-bottom: 1px solid var(--Shapes-Border-input-Border-card, #D0D7DE);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;
