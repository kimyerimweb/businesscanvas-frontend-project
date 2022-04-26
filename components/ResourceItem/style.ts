import styled from '@emotion/styled';

export const Item = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 90px;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: #fff;
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  input {
    width: 100%;
    height: 30px;
    border: 1px solid #38a5e1;
    background-color: #f7f7f7;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }

  div {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    background-color: #fff;
    padding: 0;

    &:first-child {
      margin-right: 2px;
    }
  }
`;
