import React, { useState, useEffect, useContext } from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import Modal from "./Modal";

const Gallery = props => {

  const [modalInfo, setModalInfo] = useState({
    url: "",
    key: "",
    title: "",
    owner: "",
  });
  const [imageItems, setImageItems] = useState([]);

  // List items
  let images;
  let noImages;

  useEffect(() => {
    console.log(props, props.pageprop)
    if (props.pageprop > 1) {
      setImageItems(prevItems => [...prevItems, ...props.data]);
    } else {
      setImageItems(props.data);
    }
    // eslint-disable-next-line
  }, [props.data]);

  // map variables to each item in fetched image array and return image component
  if (imageItems.length > 0) {
    console.log('imageItems', imageItems)
    images = imageItems.map((image, index) => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
      return <Image key={index} url={url} image={image} title={title} handleShowModal={() => handleShowModal(image)} />;
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }

  // Modal
  const [show, setShow] = useState(false);
  const handleShowModal = (image) => {
    setShow(true);
    const imageInfo = {
      url: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`,
      key: image.id,
      title: image.title,
      owner: image.owner,
    }
    setModalInfo(imageInfo);
  }
  const handleCloseModal = () => {
    setShow(false);
    setModalInfo(null);
  }

  return (
    <div>
      <ul>{images}</ul>
      {noImages}
      {show && <Modal modalInfo={modalInfo} handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Gallery;
