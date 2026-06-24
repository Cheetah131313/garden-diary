import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Icon from "@mdi/react";
import {
  mdiSprout,
  mdiSeed,
  mdiBasketFill,
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiMagnify,
} from "@mdi/js";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/plantCatalog.module.css";

function PlantCatalog() {
  const [plants, setPlants] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPlant, setExpandedPlant] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    sowingTime: "",
    harvestTime: "",
    information: "",
    picture: "",
  });

  const isGrid = viewType === "grid";

  useEffect(() => {
    axios
      .get("https://garden-diary.onrender.com/catalog/load")
      .then((response) => {
        console.log("Response data:", response.data);
        setPlants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the plants!", error);
      });
  }, []);

  const togglePlantSelection = (plantId) => {
    setSelectedPlants((prevSelectedPlants) =>
      prevSelectedPlants.includes(plantId)
        ? prevSelectedPlants.filter((id) => id !== plantId)
        : [...prevSelectedPlants, plantId]
    );
  };

  const handleCardClick = (plant) => {
    setExpandedPlant(plant);
  };

  const handleClose = () => {
    setExpandedPlant(null);
  };

  const handleAddPlantClose = () => {
    setShowAddModal(false);
  };

  const handleAddPlantShow = () => {
    setShowAddModal(true);
  };

  const handleAddPlantChange = (e) => {
    const { name, value } = e.target;
    setNewPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleAddPlantSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://garden-diary.onrender.com/plant/create", newPlant)
      .then((response) => {
        setPlants([...plants, response.data]);
        setShowAddModal(false);
        setNewPlant({
          name: "",
          sowingTime: "",
          harvestTime: "",
          information: "",
          picture: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the plant!", error);
      });
  };

  const filteredPlants = showMyList
    ? plants.filter((plant) => selectedPlants.includes(plant.id))
    : plants.filter((plant) =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className={expandedPlant ? styles.blurredBackground : ""}>
      <Navbar bg="light" className={styles.navbar}>
        <Container>
          <Navbar.Brand>Katalog rostlin</Navbar.Brand>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={styles.searchForm}
          >
            <InputGroup>
              <InputGroup.Text>
                <Icon size={1} path={mdiMagnify} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </InputGroup>
          </Form>
          <Button
            variant="outline-primary"
            className={styles["button-toggle-view"]}
            onClick={() =>
              setViewType((currentState) =>
                currentState === "grid" ? "list" : "grid"
              )
            }
          >
            {isGrid ? "Změnit náhled" : "Změnit náhled"}
          </Button>
          <Button
            variant="outline-secondary"
            className={styles["button-toggle-view"]}
            onClick={() => setShowMyList(!showMyList)}
          >
            {showMyList ? "Katalog" : "Můj seznam"}
          </Button>
          <Button
            variant="outline-success"
            className={styles["button-add-plant"]}
            onClick={handleAddPlantShow}
          >
            Přidat novou rostlinu
          </Button>
        </Container>
      </Navbar>
      <Container className={styles.container}>
        {filteredPlants.length > 0 ? (
          <Row>
            {filteredPlants.map((plant) => (
              <Col key={plant.id} md={isGrid ? 4 : 12}>
                <Card
                  className={`${styles.plantCard} ${
                    isGrid ? "" : styles.listView
                  }`}
                  onClick={() => handleCardClick(plant)}
                >
                  <Row className="no-gutters">
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={plant.picture}
                        className={styles.smallImage}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body className={styles.cardBody}>
                        <Card.Title>
                          <Icon path={mdiSprout} size={1} color="grey" />
                          {plant.name}
                        </Card.Title>
                        <Card.Text>
                          <Icon path={mdiSeed} size={1} color="grey" />
                          <strong>Výsev:</strong> {plant.sowingTime}
                          <br />
                          <Icon path={mdiBasketFill} size={1} color="grey" />
                          <strong>Sklizeň:</strong> {plant.harvestTime}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                  <Card.Footer>
                    <Button
                      variant="outline-success"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlantSelection(plant.id);
                      }}
                      className={styles.addButton}
                    >
                      {selectedPlants.includes(plant.id) ? (
                        <Icon path={mdiCheckboxMarked} size={1} color="green" />
                      ) : (
                        <Icon
                          path={mdiCheckboxBlankOutline}
                          size={1}
                          color="grey"
                        />
                      )}
                      {selectedPlants.includes(plant.id)
                        ? " Přidáno"
                        : " Přidat na můj seznam"}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div>Žádne rostliny nejsou vybrány</div>
        )}
      </Container>

      {expandedPlant && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{expandedPlant.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Img
              variant="top"
              src={expandedPlant.picture}
              className={styles.largeImage}
            />
            <Card.Text>
              <Icon path={mdiSeed} size={1} color="grey" />
              <strong>Výsev:</strong> {expandedPlant.sowingTime}
              <br />
              <Icon path={mdiBasketFill} size={1} color="grey" />
              <strong>Sklizeň:</strong> {expandedPlant.harvestTime}
              <br />
              <strong>Informace a popis:</strong> {expandedPlant.information}
            </Card.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={() => {
                togglePlantSelection(expandedPlant.id);
                handleClose();
              }}
            >
              {selectedPlants.includes(expandedPlant.id) ? (
                <Icon path={mdiCheckboxMarked} size={1} color="green" />
              ) : (
                <Icon path={mdiCheckboxBlankOutline} size={1} color="grey" />
              )}
              {selectedPlants.includes(expandedPlant.id)
                ? " Přidáno"
                : " Přidat na můj seznamu"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      
      <Modal show={showAddModal} onHide={handleAddPlantClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Přidat novou rostlinu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPlantSubmit}>
            <Form.Group controlId="formPlantName">
              <Form.Label>Název rostliny</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPlant.name}
                onChange={handleAddPlantChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSowingTime">
              <Form.Label>Výsev</Form.Label>
              <Form.Control
                type="text"
                name="sowingTime"
                value={newPlant.sowingTime}
                onChange={handleAddPlantChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHarvestTime">
              <Form.Label>Sklizeň</Form.Label>
              <Form.Control
                type="text"
                name="harvestTime"
                value={newPlant.harvestTime}
                onChange={handleAddPlantChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formInformation">
              <Form.Label>Informace a popis</Form.Label>
              <Form.Control
                as="textarea"
                name="information"
                value={newPlant.information}
                onChange={handleAddPlantChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPicture">
              <Form.Label>Obrázek</Form.Label>
              <Form.Control
                type="text"
                name="picture"
                value={newPlant.picture}
                onChange={handleAddPlantChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Přidat
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlantCatalog;
