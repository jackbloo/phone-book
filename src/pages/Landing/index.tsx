import { EventHandler, useState } from "react";
import {
  Container,
  ImageBook,
  ImageContainer,
  Input,
  InputContainer,
  NameContainer,
  Image,
  ErrorContainer,
} from "./styled.components";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers";
import Shakehands from "../../assets/image/shakehands.jpg";
import SubmitName from "../../assets/image/submitIcon.svg";
import Warning from "../../assets/image/warning.svg";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const handleSubmit = (e: any) => {
    e.stopPropagation();
    if (name === "" || !RegExp(/^[a-z ,.'-]+$/i).test(name)) {
      setIsError(true);
      return;
    }
    dispatch(login());
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
      <Navbar />
      <ImageContainer>
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
