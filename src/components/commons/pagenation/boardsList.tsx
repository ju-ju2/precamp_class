import styled from "@emotion/styled";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: 20%;
`;

export default function BoardsList(props: any) {
  return (
    <>
      {props.data?.fetchBoards.map((el: any) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.title}</Column>
        </Row>
      ))}
    </>
  );
}
