import React from "react";

const Image = ({ url, image, title, handleShowModal }) => {

  return (
    <li>
      <img src={url} alt={title} onClick={() => handleShowModal(image)} />
      <div className="image-description">
        <div className="image-key">{title}</div>
      </div>
    </li>
  )
}

export default Image;
