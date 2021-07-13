import styled from 'styled-components';

const MainGrid = styled.main`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
  grid-gap:10px;
  padding: 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width: 1100px;
    display: grid;
    grid-template-areas: 
      "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 0.9fr 312px;
  }
`;

export default MainGrid;