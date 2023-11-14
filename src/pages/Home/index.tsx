import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  BodyContent,
  Container,
  ContentContainer,
  EmptyContainer,
  EmptyImage,
  ErrorContainer,
  ImageError,
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
import ErrorImage from "../../assets/image/error.webp";
import Shimmer from "../../components/Shimmer";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<{
    order_by: { created_at: string };
    where?: { first_name: { _like: string } };
    offset?: number;
  }>({
    order_by: { created_at: "desc" },
  });
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
    if (search === "" && options.where) {
      setOptions({
        order_by: { created_at: "desc" },
      });
    } else if (search !== "") {
      setOptions({
        where: {
          first_name: { _like: `%${search}%` },
        },
        offset: 0,
        order_by: { created_at: "desc" },
      });
    }
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
      <ToastContainer />
      <PlusButton
        data-testid="click-create-modal"
        onClick={() => dispatch(setCreateModal(true))}
      >
        +
      </PlusButton>
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
              {error ? (
                <ErrorContainer>
                  <ImageError src={ErrorImage} alt="error-image" />
                  Oops! Something went wrong!
                </ErrorContainer>
              ) : tempContactList?.length === 0 ? (
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
                        data-testid="previous"
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
                        data-testid="next"
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
