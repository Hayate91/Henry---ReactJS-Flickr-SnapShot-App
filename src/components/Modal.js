import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

const Modal = ({ modalInfo, handleCloseModal }) => {
    const [owner, setOwner] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${apiKey}&user_id=${modalInfo.owner}&format=json&nojsoncallback=1`
                )
                setOwner(response.data.person);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return (
        <>
            {loaded && <div className="modal-image" onClick={() => handleCloseModal()}>
                <div className="modal-container">
                    <div className="modal-header">
                        <div>
                            <span className="label">Image: </span><span>{modalInfo.title}</span>
                        </div>
                        <div>
                            <span className="label">Owner: </span><span>{owner.realname ? owner.realname._content : owner.username._content}</span>
                        </div>
                        <div className="close-icon" onClick={() => handleCloseModal()}>X</div>
                    </div>
                    <div className="modal-content">
                        <img src={modalInfo.url} alt={modalInfo.title} />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Modal;
