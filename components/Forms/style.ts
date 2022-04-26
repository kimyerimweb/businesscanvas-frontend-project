import styled from '@emotion/styled';

export const Input = styled.input`
  position: absolute;
  display: block;
  width: calc(100% - 10px);
  height: 30px;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  background-color: #f7f7f7;
  z-index: 200;

  &:focus {
    outline: 1px solid #38a5e1;
  }
`;

export const Form = styled.form`
  position: absolute;
  top: calc(100% + 2px);
  width: calc(200% - 10px);
  display: block;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  z-index: 100;

  p {
    position: absolute;
    bottom: 0;
    left: 10px;
    font-size: 12px;
    color: red;
    z-index: 300;
  }
`;
