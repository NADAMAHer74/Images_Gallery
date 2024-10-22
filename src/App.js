import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllImages } from "./redux/actions/imagesActions";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";

export default function App() {
  const [navbarBackground, setNavbarBackground] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [imageLoaded, setImageIsLoaded] = useState(false);

  const openModal = (index) => {
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setCurrentIndex(null);
  };

  const previousImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllImages());
    setIsLoading(false);
  }, []);
  const handleImageLoad = () => {
    setImageIsLoaded(true);
  };
  return (
    <div>
      {currentIndex === null && (
        <Navbar
          expand="lg"
          className={`navbar-custom ${
            navbarBackground ? "navbar-scrolled" : ""
          }`}
          fixed="top"
        >
          <Container>
            <Navbar.Brand href="#home">Gallery</Navbar.Brand>
          </Container>
        </Navbar>
      )}
      <div className="background-image">
        <div className="content">
          <img src="https://template59493.motopreview.com/mt-demo/59400/59493/mt-content/uploads/2017/03/mt-0896-home-logo1.png" />
          <h1>Welcome to OUr Gallery</h1>
        </div>
      </div>

      {loading ? (
        <div className="loading"></div>
      ) : (
        <div>
          {images && images.length > 0 ? (
            <div className="gallery-container">
              <div className="image-grid">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="image-item"
                    onClick={() => openModal(index)}
                  >
                    <img src={image.src.landscape} alt={`Image ${image.id}`} />
                  </div>
                ))}
              </div>

              {currentIndex !== null && (
                <div className="image-modal" onClick={closeModal}>
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="prev" onClick={previousImage}>
                      &#10094;
                    </span>
                    <img
                      src={images[currentIndex].src.landscape}
                      alt={`Image ${currentIndex}`}
                      onLoad={handleImageLoad}
                      className={`${imageLoaded ? "loaded" : ""}`}
                    />
                    <span className="next" onClick={nextImage}>
                      &#10095;
                    </span>
                    <div className="image-counter">
                      {`${currentIndex + 1} of ${images.length}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>no images</div>
          )}
        </div>
      )}
    </div>
  );
}
