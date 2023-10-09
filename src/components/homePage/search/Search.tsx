import { useState } from "react";
import { Conversation } from "../../../model/conversation";
import * as S from "./Search.styled";

type Props = {
  conversation: Conversation[];
  setSearchConversation: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({
  conversation,
  setSearchConversation,
  setSearchValue,
}: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const serchValue = e.target.value;

    if (serchValue === "") {
      return setSearchConversation([]);
    }
    const searched = conversation.filter((c) =>
      c.members.find((m) => m.userName.includes(serchValue))
    );

    setSearchConversation(searched);
  };
  return (
    <S.SearchContainer>
      <input type="text" placeholder="Search" onChange={handleSearch} />
    </S.SearchContainer>
  );
};

export default Search;
