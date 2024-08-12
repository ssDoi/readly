import axios from 'axios';

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

export const fetchBooks = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/book/searchBooks`);
    // console.log("Full response:", response); // 전체 응답 로깅
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const searchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/searchBooksByTitle/${title}`);
    // console.log(response)
    return response.data.books;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};