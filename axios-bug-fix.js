Axios Version Bug & 400 "Required Parameter: part" Error
Updated 7-16-2020

In the upcoming lecture, we will be creating an axios config instance to call the YouTube API. Starting with release v0.19.0 there is a bug that fails to merge the parameters from the config instance. This will cause a 400 error failure with the message "Required Parameter : part"

Here are two ways we can deal with this:

1. Install a specific version of axios:

npm install axios@0.18.1

2. Move the Params object to the App.js axios call

This is what your axios code should look like at the end of "Putting it all Together" lecture

apis/youtube.js:

import axios from "axios";
 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
App.js:

import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
 
const KEY = "YOUR_KEY";
 
class App extends React.Component {
 
  onTermSubmit = term => {
    youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        key: KEY
      }
    });
  };
...


This is what your axios code should look like at the end of the project:

apis/youtube.js:

import axios from "axios";
 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
App.js:

import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
 
const KEY = "YOUR_KEY";
 
class App extends React.Component {
 
...
 
  onTermSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY
      }
    });
  };
...