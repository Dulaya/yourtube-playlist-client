import axios from 'axios';

const url = 'https://your-tube-playlist.herokuapp.com/posts';
const videoURL = 'https://your-tube-playlist.herokuapp.com/videos';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);



export const fetchVideos = () => axios.get(videoURL);
export const createVideo = (newVideo) => axios.post(videoURL, newVideo);
export const deleteVideo = (id) => axios.delete(`${videoURL}/${id}`);