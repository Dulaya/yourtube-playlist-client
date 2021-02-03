
import * as api from '../api/index.js';

/*
export const getVideos = () => async () => {
  try {
    const {data} = await api.fetchVideos();

  } catch (error) {
    console.log(error.message);
  }
};*/

export const createVideo = async (video) => {
  try {
    await api.createVideo(video);
  } catch (error) {
    console.log(error.message);
  }
};
/*
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    //dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    //dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
*/

export const deleteVideo = async (id) => {
  try {
    await api.deleteVideo(id);

  } catch (error) {
    console.log(error.message);
  }
};
