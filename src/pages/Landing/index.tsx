import { useState } from "react";
import {
  Container,
  ImageBook,
  ImageContainer,
  Input,
  InputContainer,
  NameContainer,
  Image,
  ErrorContainer,
  Title,
} from "./styled.components";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/reducers";
import Shakehands from "../../assets/image/shakehands.webp";
import SubmitName from "../../assets/image/submitIcon.svg";
import Warning from "../../assets/image/warning.svg";
import { RootState } from "../../store/store";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.phoneBook);

  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const handleSubmit = (e: any) => {
    e.stopPropagation();
    if (name === "" || !RegExp(/^[a-z ,.'-]+$/i).test(name)) {
      setIsError(true);
      return;
    }
    dispatch(login({ userName: name }));
    navigate("/home");
  };

  const handleChange = (value: string) => {
    if (isError) {
      setIsError(false);
    }
    setName(value);
  };
  return (
    <Container>
      <Navbar dispatch={dispatch} isLogin={isLogin} />
      <ImageContainer>
        <Title>Welcome to the best Phonebook</Title>
        <ImageBook src={Shakehands} />
        <NameContainer>
          <InputContainer>
            <Input
              placeholder="What's your name?"
              onChange={(e) => handleChange(e.target.value)}
            />
            <Image
              src={SubmitName}
              alt="submit-icon"
              onClick={(e) => handleSubmit(e)}
            />
          </InputContainer>
          {isError && (
            <ErrorContainer>
              <Image src={Warning} alt="warning-icon" isError={true} />
              Please insert correct name
            </ErrorContainer>
          )}
        </NameContainer>
      </ImageContainer>
    </Container>
  );
};

export default Landing;
