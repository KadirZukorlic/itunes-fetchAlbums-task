import axios from 'axios';

export const searchMusic = (searchTerm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${searchTerm}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
