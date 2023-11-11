import React, { useState } from "react";
import { Input, InputContainer } from "./styled.components";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchBar } from "../../store/reducers";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debouncedSearch = React.useMemo(
    () =>
      debounce((val) => {
        dispatch(setSearchBar(val));
      }, 750),
    [dispatch]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );
  return (
    <InputContainer>
      <Input
        onChange={(e) => handleChange(e)}
        placeholder="Search by First Name"
      />
    </InputContainer>
  );
};

export default SearchBar;
