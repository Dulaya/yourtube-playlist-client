import axios from 'axios';

import { pictureURL, videoURL } from '../urls/urls'; 


export const fetchPosts = () => axios.get();
export const createPost = (newPost) => axios.post(pictureURL, newPost);
export const likePost = (id) => axios.patch(`${pictureURL}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${pictureURL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${pictureURL}/${id}`);



export const fetchVideos = () => axios.get(videoURL);
export const createVideo = (newVideo) => axios.post(videoURL, newVideo);
export const deleteVideo = (id) => axios.delete(`${videoURL}/${id}`);
