import styled from '@emotion/styled';

export const ViewerContainer = styled.div`
  background-color: #e5e5e5;
  flex-shrink: 1;
  width: 100%;
  height: 100vh;

  div {
    background-color: #fff;

    header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 0 17px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 100;

      h1 {
        display: block;
        font-size: 14px;
        line-height: 16px;
        color: #000;
        flex-shrink: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      button {
        flex-shrink: 0;
        border: 0;
        background-color: #fff;
        cursor: pointer;
      }
    }

    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: #666;

      div {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img,
        iframe {
          position: absolute;
          width: 100%;
          height: calc(100% - 50px); //h1
        }

        img {
          object-fit: contain;
          background-color: #666;
        }

        iframe {
          top: 0;
          left: 0;
          background-color: #fff;
        }
      }
    }
  }
`;
