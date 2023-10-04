import styled from "styled-components";

const Search = () => {
  return (
    <SearchContainer>
      <input type="text" placeholder="Search" />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 80%;
  height: 40px;
  margin: 30px auto;
  border: 1px solid white;
  border-radius: 20px;

  & > input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;
    outline: none;
    border: none;
    border-radius: 19px;
  }
`;
