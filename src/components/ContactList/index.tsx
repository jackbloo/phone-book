import React, { memo } from "react";
import {
  ContactListComponentProps,
  ContactListType,
  PhoneType,
} from "../../interface/reducer";
import {
  ActionsContainer,
  Container,
  Items,
  Subtitle,
  Title,
  Icon,
  TopContainer,
  FavoriteContainer,
  FavoriteIcons,
  SubtitleDesktop,
  MoreText,
  Text,
} from "./styled.components";
import { Avatar } from "./styled.components";
import EditIcon from "../../assets/image/edit.webp";
import DeleteIcon from "../../assets/image/delete.webp";
import { useDispatch } from "react-redux";
import {
  setDeleteId,
  setDeleteModal,
  setEditData,
  setEditModal,
  setFavorite,
} from "../../store/reducers";
import FavoriteIcon from "../../assets/image/favorite.webp";
import UnfavoriteIcon from "../../assets/image/unfavorite.webp";

const ContactListComponent = ({
  contactList,
  favoriteList,
}: ContactListComponentProps) => {
  const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(setDeleteModal(true));
    dispatch(setDeleteId(id));
  };
  const handleFavorite = async (data: ContactListType, type: string) => {
    const copyData = { ...data };
    if (type === "favorite") {
      dispatch(setFavorite({ ...copyData, isFavorite: true }));
    } else {
      dispatch(setFavorite({ ...copyData, isFavorite: false }));
    }
  };
  const handleEdit = (data: ContactListType) => {
    dispatch(setEditData(data));
    dispatch(setEditModal(true));
  };
  return (
    <Container data-testid="contactlist-container">
      {[...favoriteList, ...contactList]?.map(
        (el: ContactListType, index: number) => (
          <Items key={el.id}>
            <TopContainer>
              <FavoriteContainer>
                <FavoriteIcons
                  onClick={() =>
                    handleFavorite(
                      el,
                      el.isFavorite ? "unfavorite" : "favorite"
                    )
                  }
                  src={el.isFavorite ? FavoriteIcon : UnfavoriteIcon}
                  alt={el.isFavorite ? "unfavorite" : "favorite" + index}
                  data-testid={
                    el.isFavorite ? `unfavorite-${index}` : `favorite-${index}`
                  }
                />
              </FavoriteContainer>
              <Avatar src={el.image} alt={`avatar-${el.id}`} />
              <Title>{el.first_name + " " + el.last_name}</Title>
              <Subtitle>
                {el?.phones?.length > 0 &&
                  el?.phones
                    ?.slice(0, 3)
                    .map((el: PhoneType, index: number) => (
                      <Text key={index}>{el?.number}</Text>
                    ))}
                <MoreText>
                  {el?.phones?.length > 3 &&
                    `+${el?.phones?.slice(0, 3)?.length} more`}
                </MoreText>
              </Subtitle>
              <SubtitleDesktop>
                {el?.phones[0]?.number}
                <MoreText>
                  {el?.phones?.length > 3 &&
                    `  +${el?.phones?.slice(0, 3)?.length} more`}
                </MoreText>
              </SubtitleDesktop>
            </TopContainer>

            <ActionsContainer>
              <Icon
                src={DeleteIcon}
                alt="delete-icon"
                onClick={() => handleDelete(el.id)}
                data-testid={`delete-${index}`}
              />

              <Icon
                src={EditIcon}
                alt="edit-icon"
                onClick={() => handleEdit(el)}
                data-testid={`edit-${index}`}
              />
            </ActionsContainer>
          </Items>
        )
      )}
    </Container>
  );
};

export default memo(ContactListComponent);
