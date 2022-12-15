import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [userList, setUserList] = useState([]);
  // const [lastList, setLastList] = useState(false);
  // useEffect(() => {
  //   const fetchData = async (query, page) => {
  //     const response = await axios.get(
  //       `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=12&page=${page}&format=json&nojsoncallback=1`
  //     );
  //     console.log(response, "<<<");
  //     if (!response.data.photos.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setImages([...images, ...response.data.photos]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, images]);

  // const onScroll = () => {
  //   console.log(listInnerRef)
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };

  const runSearch = (query, page = 1) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=12&page=${page}&format=json&nojsoncallback=1`
      )
      .then(response => {
        setImages(response.data.photos.photo);
        // setImages(prevImages => [...prevImages,...response.data.photos.photo]);
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
