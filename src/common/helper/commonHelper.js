import { baseUrl } from "../constants/configConstants";

/**
 * randomString : generate random string for given length
 * @param {number}  givenLength: length of random string to be generated (default 75)
 * @return {string} : generated random string
 */
export const randomNumberGenerator = (givenLength = 5) => {
  const characters = "123456789";
  const length = givenLength;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
};

/**
 * App logo
 * @returns
 */
export const logo = () => {
  return baseUrl("assets/logo.png");
};
