import React from "react";
import Select from "react-select";
import axios from "axios";
import BingoCard from "../subcomponents/BingoCard";

const CardGenerator = () => {
  const [generatedCards, setGeneratedCards] = React.useState([]);
  const [numberOfCards, setNumberOfCards] = React.useState(null);
  const [blackWhite, setBlackWhite] = React.useState(false);
  const [color, setColor] = React.useState(null);
  const [perPage, setPerPage] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/branch/branch");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error fetching branches");
      }
    };

    fetchUsers();
  }, []);

  const generateBingoNumbers = () => {
    let letters = ["B", "I", "N", "G", "O"];
    let numbers = {};
    let count = 1;
    letters.forEach((letter) => {
      numbers[letter] = [];
      for (let i = 1; i <= 15; i++) {
        numbers[letter].push(count);
        count++;
      }
    });
    return numbers;
  };

  const handleNumberSelect = (event) => {
    setNumberOfCards(parseInt(event.value));
  };

  const handleColorSelect = (event) => {
    setColor(event.value);
  };

  const handlePerPageSelect = (event) => {
    setPerPage(event);
  };

  const handleBWCheckbox = (e) => {
    setBlackWhite(e.currentTarget.checked);
  };

  const handleBranchSelect = (event) => {
    setBranch(event.value);
  };

  const handleButton = async () => {
    let cards = [];
    for (let i = 1; i <= numberOfCards; i++) {
      cards.push(generateCard());
    }
    setGeneratedCards(cards);

    // Save generated cards to backend
    try {
      const response = await axios.post(
        "http://localhost:4000/api/card/cards",
        {
          branch: branch,
          cards: cards.map((card) => ({ card })),
        }
      );
      console.log("Cards saved:", response.data);
    } catch (error) {
      console.error("Failed to save cards:", error);
    }
  };

  const generateCard = () => {
    let numbers = generateBingoNumbers();
    let card = {};

    Object.keys(numbers).forEach((letter) => {
      let chosenNumbers = [];
      for (let i = 0; i < 5; i++) {
        chosenNumbers.push(
          numbers[letter].splice(
            Math.floor(Math.random() * numbers[letter].length),
            1
          )[0]
        );
      }
      card[letter] = chosenNumbers;
    });
    return card;
  };

 

  
  

  const numberOfCardsOptions = [];
  for (let i = 0; i <= 100; i++) {
    numberOfCardsOptions.push({ value: i.toString(), label: i.toString() });
  }

  const colorOptions = [
    { value: "red", label: "red" },
    { value: "orange", label: "orange" },
    { value: "yellow", label: "yellow" },
    { value: "green", label: "green" },
    { value: "blue", label: "blue" },
    { value: "purple", label: "purple" },
    { value: "pink", label: "pink" },
    { value: "aqua", label: "aqua" },
    { value: "gray", label: "gray" },
    { value: "brown", label: "brown" },
  ];

  const sectionClasses = () => {
    let classes = "padding-vertical-xxlg pale-gray-bg " + (blackWhite ? "print-bw " : "print-color ");
    if (perPage !== null) {
      switch (perPage.value) {
        case "2":
          classes += "print-two ";
          break;
        case "4":
          classes += "print-four ";
          break;
        case "6":
          classes += "print-six ";
          break;
        default:
          classes += "print-four ";
          break;
      }
    }
    return classes;
  };

  const generateButtonDisabled = () => {
    return numberOfCards === null || color === null || branch === null;
  };

    return (
      <section className={sectionClasses()}>
        <div className="container row no-print">
          <div className="col">
            <h1>Card Generator</h1>
           
         

            <div className="row justify-start align-center extra-pale-gray-bg padding-xlg">
              <div className="col shrink padding-horizontal-md">
              <Select
                className="number-select"
                placeholder="Number of Cards"
                onChange={handleNumberSelect}
                options={numberOfCardsOptions}
              />
              </div>
              <div className="col shrink padding-horizontal-md">
                <Select
                  className="number-select"
                  placeholder="Card Colors"
                  onChange={handleColorSelect}
                  options={colorOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md">
               
                <Select
                className="branch-name-input"
                placeholder="Select Branch"
                onChange={handleBranchSelect}
                options={users.map(user => ({ value: user.name, label: user.name }))}
              />
              </div>
              <div className="col shrink padding-horizontal-md margin-right-xlg">
              <button
                className="primaryBtn"
                onClick={handleButton}
                disabled={generateButtonDisabled()}
              >
                Generate
              </button>
              </div>
            </div>

            <div className="row justify-start align-center">
              <div className="col shrink padding-horizontal-md">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="blackWhite"
                    name="blackWhite"
                    onChange={handleBWCheckbox}
                  />
                  <label htmlFor="blackWhite">Black & White</label>
                </div>
              </div>

             
            </div>
          </div>
        </div>

        <div className="row card-block justify-center margin-vertical-lg">
          <div className="col text-center">
          {generatedCards.map((card, index) => (
              
                <div
                  
                  className="card"
                  key={"a" + index}
                >
                  <BingoCard card={card} />
                </div>
              
          ))}
          </div>
        </div>
      </section>
    );
  }


export default CardGenerator;
