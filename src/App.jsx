import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PlayerInput from "./PlayerInput";
import image1 from "./assets/Luis.png";
import image2 from "./assets/Linda.png";
import image3 from "./assets/Luna.png";
import InputTest from "./inputTest";
import InputPage from "./InputPage";

import { styled } from "styled-components";

const profiles = [
  {
    name: "Luis",
    quote: "A stitch in time saves nine",
    image: image1,
  },
  {
    name: "Linda",
    quote: "I believe I can fly",
    image: image2,
  },
  {
    name: "Luna",
    quote: "A lovely day to smile",
    image: image3,
  },
];

function App() {
  const [nameValue, setNameValue] = useState("");
  const [foodValue, setFoodValue] = useState("");
  const [animalValue, setAnimalValue] = useState("");
  const [placeValue, setPlaceValue] = useState("");
  const [thingValue, setThingValue] = useState("");
  const [bigImage, setBigImage] = useState(image1);
  const [count, setCount] = useState(0);
  const [letter, setLetter] = useState("A");
  const [nameResponse, setNameResponse] = useState(false);
  const [foodResponse, setFoodResponse] = useState(false);
  const [animalResponse, setAnimalResponse] = useState(false);
  const [placeResponse, setPlaceResponse] = useState(false);
  const [thingResponse, setThingResponse] = useState(false);
  const [responseSubmitted1, setResponseSubmitted1] = useState(false);
  const inputArea = document.getElementById("input-area");
  const alphabet = [
    "IFEOLUWA",
    "RAPHAEL",
    "BARAKAT",
    "PHILIP",
    "DAMILOLA",
    "TOMISIN",
    "OLUWASEUN",
    "OGECHI",
    "MARYAM",
    "BLESSING",
    "MARVELLOUS",
    "JOSEPH",
    "NANCY",
    "AYODEJI",
    "OLUSOJI",
    "ABIDEMI",
    "RASHEEDAH",
    "MARY",
    "CSO",
    "ADEOLA",
    "ADIGUN",
    "SEGUN",
    "PAPA",
    "ABU",
    "SAMUEL",
    "RONKE",
    "FUNMI",
  ];
  const [startPage, setStartPage] = useState({
    pageStarted: undefined,
    projects: [],
  });
  function handleStartProject() {
    setStartPage((prevState) => {
      return {
        ...prevState,
        pageStarted: null,
      };
    });
  }
  function handleAddProject(projectData) {
    setStartPage((prevState) => {
      const newData = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newData],
      };
    });
  }
  console.log(startPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  function bigSelector(image) {
    setBigImage(image);
  }

  function closeModal() {
    document.getElementsByClassName("darkscarf").style.display = "none";
    document.getElementsByClassName("player-profile").style.display = "none";
  }
  const [inputInvalid, setInputInvalid] = useState();
  /*const TestButton = styled.button`
    padding: 1rem 2rem 1rem 2rem;
    font-size: 1.rem;
    background-color: green;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;

    &:hover{
      background-color: red;
    }
  `
  const TestDiv = styled.div`
    width: 40%;
    height: auto;
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px green solid;
    border-radius: 1.5rem;
    & span{
      color: ${({invalid}) => invalid ? 'red':'white'}
    } 
  `*/
  function openModal(profile) {
    setIsModalOpen(true);
    setSelectedProfile(profile);
  }
  function closeModal() {
    setIsModalOpen(false);
    setSelectedProfile(null);
  }
  return (
    <>
      <div className="main-test-area">
        {startPage.pageStarted === undefined ? (
          <button onClick={handleStartProject}>Start</button>
        ) : (
          <>
            <InputPage onAdd={handleAddProject}></InputPage>
          </>
        )}
      </div>
    </>
  );
}

export default App;
