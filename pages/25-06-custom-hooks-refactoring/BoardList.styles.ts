import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  margin: 60px 0 40px 0;
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 80px;
  width: 1200px;
`;

export const CardWrapper = styled.div`
  width: 282px;
  height: 257px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  margin-bottom: 40px;
`;
export const SearchTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 776px;
  height: 52px;
  background: #f2f2f2;
  border-radius: 10px;
  padding-left: 20px;
  overflow: hidden;
`;

export const IconSearch = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 12px;
`;

export const SearchTitleInput = styled.input`
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
`;
export const SearchYear = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 244px;
  height: 52px;
  border: 1px solid #bdbdbd;
`;
export const SearchButton = styled.button`
  width: 94px;
  height: 52px;
  border-radius: 10px;
  color: white;
  background-color: black;
`;

export const BoardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 1200px;
  margin-bottom: 40px;
`;
export const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  // align-items:center
  border-top: 1px solid #bdbdbd;
  height: 52px;
  padding: 15px 10px;
`;

export const ListColumnBasic = styled.div`
  font-size: 16px;
  color: #4f4f4f;
  width: 15%;
  font-weight: bold;
  text-align: center;
`;
export const ListColumnBasicTitle = styled.div`
  font-size: 16px;
  color: #4f4f4f;
  width: 55%;
  font-weight: bold;
  text-align: center;
`;

export const ColumnBasic = styled.div`
  font-size: 16px;
  color: #4f4f4f;
  width: 15%;
  text-align: center;
`;
export const ColumnTitle = styled.div`
  font-size: 16px;
  color: #4f4f4f;
  cursor: pointer;
  width: 55%;
  text-align: center;

  :hover {
    color: orange;
  }
`;

export const UploadButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 14px 16px;
  width: 171px;
  height: 52px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;
export const IconWrite = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 12px;
`;

export const FooterWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
