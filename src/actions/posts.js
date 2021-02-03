import * as api from '../api/index.js';
/*
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    //dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};*/


export const createPost = async (post) => {
  try { 
    await api.createPost(post); 
  }
  catch (error) {
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
export const deletePost = async (id) => {
  try {
    await api.deletePost(id);

  } catch (error) {
    console.log(error.message);
  }
};
