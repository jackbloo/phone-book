import Avatar1 from "../assets/image/avatar-1.webp";
import Avatar2 from "../assets/image/avatar-2.webp";
import Avatar3 from "../assets/image/avatar-3.webp";
import Avatar4 from "../assets/image/avatar-4.webp";
import Avatar5 from "../assets/image/avatar-5.webp";
import Avatar6 from "../assets/image/avatar-6.webp";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const Dots = "...";

export const randomAvatar = () => {
  const options: { [key: number]: string } = {
    0: Avatar1,
    1: Avatar2,
    2: Avatar3,
    3: Avatar4,
    4: Avatar5,
    5: Avatar6,
  };
  const number = Math.floor(Math.random() * 5);
  return options[number];
};
