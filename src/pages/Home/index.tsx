import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  BodyContent,
  Container,
  ContentContainer,
  EmptyContainer,
  EmptyImage,
  MoreButtonContainer,
  MoreContainer,
  PlusButton,
  RightMenu,
  TitleContainer,
} from "./styled.components";
import Navbar from "../../components/Navbar";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GET_CONTACT_LIST } from "../../apolloClient/queries";
import {
  saveContactList,
  setCreateModal,
  setOffset,
} from "../../store/reducers";
import { RootState } from "../../store/store";
import ContactList from "../../components/ContactList";
import { Avatar } from "./styled.components";
import DummyAvatar from "../../assets/image/circle-avatar.svg";
import SearchBar from "../../components/SearchBar";
import DeleteModal from "../../components/DeleteModal";
import Modal from "../../components/Modal";
import LeftMenu from "../../components/LeftMenu";
import Arrow from "../../assets/image/arrow.webp";
import Empty from "../../assets/image/emptyData.webp";
import Shimmer from "../../components/Shimmer";

const Home = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState({});
  const {
    limit,
    offset,
    noMoreData,
    contactList,
    userName,
    search,
    isLogin,
    favoriteList,
    tempContactList,
  } = useSelector((state: RootState) => state.phoneBook);
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      offset: offset,
      limit,
      ...options,
    },
  });

  useEffect(() => {
    setOptions(
      search === ""
        ? {
            order_by: { created_at: "desc" },
          }
        : {
            where: {
              first_name: { _like: `%${search}%` },
            },
            offset: 0,
            order_by: { created_at: "desc" },
          }
    );
  }, [search]);

  useEffect(() => {
    if (data) {
      dispatch(saveContactList(data));
    }
  }, [data, dispatch]);

  const handleLoadMore = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    if (type === "add") {
      dispatch(setOffset(offset + limit));
    } else {
      dispatch(setOffset(offset - limit));
    }
  };
  return (
    <Container>
      <PlusButton onClick={(e) => dispatch(setCreateModal(true))}>+</PlusButton>
      <DeleteModal handleRefetch={refetch} />
      <Modal refetch={refetch} />
      <Navbar dispatch={dispatch} isLogin={isLogin} />
      <BodyContent>
        <LeftMenu userName={userName} />
        <RightMenu>
          <TitleContainer>
            <Avatar src={DummyAvatar} alt="dummy-avatar" />
            Hi, {userName}!
          </TitleContainer>
          <SearchBar />
          <ContentContainer>Contact List</ContentContainer>
          {loading ? (
            <Shimmer />
          ) : (
            <>
              {" "}
              {tempContactList?.length === 0 ? (
                <EmptyContainer>
                  <EmptyImage src={Empty} alt="empty-image" />
                  No Data Found
                </EmptyContainer>
              ) : (
                <ContactList
                  contactList={contactList}
                  favoriteList={favoriteList}
                />
              )}
              {!loading && !error && tempContactList.length > 0 && (
                <MoreButtonContainer>
                  <MoreContainer>
                    {tempContactList?.length <= limit && offset > 0 && (
                      <ArrowIcon
                        src={Arrow}
                        alt="icon-left"
                        style={{ transform: "rotateY(180deg)" }}
                        onClick={(e) => handleLoadMore(e, "substract")}
                      />
                    )}
                  </MoreContainer>
                  <MoreContainer>
                    {tempContactList?.length > 0
                      ? offset === 0
                        ? 1
                        : offset / 10 + 1
                      : null}
                  </MoreContainer>
                  <MoreContainer>
                    {tempContactList?.length === limit && !noMoreData && (
                      <ArrowIcon
                        src={Arrow}
                        alt="icon-right"
                        onClick={(e) => handleLoadMore(e, "add")}
                      />
                    )}
                  </MoreContainer>
                </MoreButtonContainer>
              )}
            </>
          )}
        </RightMenu>
      </BodyContent>
    </Container>
  );
};

export default Home;
