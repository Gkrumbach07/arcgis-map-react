import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useMapStore from "../../stores/mapStore";

const wellKnownBasemaps = [
    "terrain", "dark-gray", "dark-gray-vector", "gray-vector", 
    "streets-vector", "streets-night-vector", "streets-relief-vector", 
    "streets-navigation-vector", "topo-vector"
];


const BasemapModal = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [setBasemap, currentBasemap] = useMapStore((state) => [state.setBasemap, state.basemap]);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
            Basemap
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a basemap</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                wellKnownBasemaps.map((basemap, index) => {
                    return (
                        <Button key={index} variant={currentBasemap === basemap ? "outline-primary" : "outline-seconday"} onClick={() =>{
                            console.log('basemap: ', basemap);
                            setBasemap(basemap);
                            handleClose();
                        }}>{basemap}</Button>
                    )
                })
            }
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default BasemapModal;