import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Pagination from "./Pagination";

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page !== 0) {
      runSearch(searchTerm, page);
    }
    // eslint-disable-next-line
  }, [searchTerm, page]);

  const handlePageData = (pageData) => {
    setPage(pageData);
  };

  return (
    <div className="photo-container" id="photo-container">
      <Gallery data={images} pageprop={page} />
      <Pagination preparePageData={handlePageData} data={images} />
    </div>
  );
};

export default Container;
