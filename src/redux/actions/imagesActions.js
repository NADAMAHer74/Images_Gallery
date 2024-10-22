import { createClient } from "pexels";

export const getAllImages = () => {
  return async (dispatch) => {
    try {
      const client = createClient(
        "CTpKHje71s8aglx7HOBeK4J6BCehO97XeDW46e4bAz5a9uZEKHGG7tdW"
      );

      client.photos.curated().then((res) => {
        dispatch({ type: "Get_Images", payload: res.photos });
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
};
