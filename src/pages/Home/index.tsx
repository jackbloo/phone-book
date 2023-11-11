import React, { useEffect, useState } from "react";
import {
  Container,
  ContentContainer,
  MoreButton,
  MoreButtonContainer,
  PlusButton,
  TitleContainer,
} from "./styled.components";
import Navbar from "../../components/Navbar";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GET_CONTACT_LIST } from "../../apolloClient/queries";
import { saveContactList, setCreateModal } from "../../store/reducers";
import { RootState } from "../../store/store";
import { ContactListType } from "../../interface/reducer";
import ContactList from "../../components/ContactList";
import { Avatar } from "./styled.components";
import DummyAvatar from "../../assets/image/circle-avatar.svg";
import SearchBar from "../../components/SearchBar";
import DeleteModal from "../../components/DeleteModal";
import Modal from "../../components/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState(0);
  const [options, setOptions] = useState({});
  const { limit, noMoreData, contactList, userName, search } = useSelector(
    (state: RootState) => state.phoneBook
  );

  const { loading, error, data, fetchMore } = useQuery(GET_CONTACT_LIST, {
    variables: {
      offset: tempData,
      limit,
      ...options,
    },
  });

  useEffect(() => {
    setOptions(
      search === ""
        ? {}
        : {
            where: {
              first_name: { _like: `%${search}%` },
            },
            offset: 0,
          }
    );
  }, [search]);

  useEffect(() => {
    setTempData(contactList?.length);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(saveContactList(data));
    }
  }, [data, dispatch]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    fetchMore({
      variables: {
        offset: contactList?.length,
        limit,
        options,
      },
    }).then(({ data }: { data: { contact: ContactListType[] } }) => {
      dispatch(saveContactList(data));
    });
  };
  return (
    <Container>
      <PlusButton onClick={(e) => dispatch(setCreateModal(true))}>+</PlusButton>
      <DeleteModal />
      <Modal />
      <Navbar />
      <TitleContainer>
        <Avatar src={DummyAvatar} alt="dummy-avatar" />
        Hi, {userName}!
      </TitleContainer>
      <SearchBar />
      <ContentContainer>Contact List</ContentContainer>
      <ContactList contactList={contactList} />
      {!noMoreData && !loading && !error && (
        <MoreButtonContainer>
          <MoreButton onClick={(e: React.MouseEvent) => handleLoadMore(e)}>
            Load More
          </MoreButton>
        </MoreButtonContainer>
      )}
    </Container>
  );
};

export default Home;
