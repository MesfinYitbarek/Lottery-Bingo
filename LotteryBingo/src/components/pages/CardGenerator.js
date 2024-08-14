  import React, { useEffect,useState } from "react";
  import axios from "axios";
  import BingoCard from "../subcomponents/BingoCard";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import QRCode from 'qrcode.react';

  const CardGenerator = () => {
    const [generatedCards, setGeneratedCards] = React.useState([]);
    const [numberOfCards, setNumberOfCards] = React.useState(null);
    const [blackWhite, setBlackWhite] = React.useState(false);
    const [color, setColor] = React.useState(null);
    const [perPage] = React.useState(null);
    const [branch, setBranch] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [startingPoint, setStartingPoint] = React.useState(null);
    
    const [qrUrl, setQrUrl] = useState('');

    const { currentUser } = useSelector((state) => state.user);
   

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            `/api/branch/getbranch/${currentUser.username}`
          );
          const data = await response.json();
          setUsers(data);
        } catch (err) {
          alert("Error fetching branches");
        }
      };

      fetchUsers();
    }, []);

    const [superBranch, setSuperBranch] = React.useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`/api/branch/branch`);
          const data = await response.json();
          setSuperBranch(data);
        } catch (err) {
          alert("Error fetching User");
        }
      };

      fetchUsers();
    }, [superBranch]);

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
      setNumberOfCards(parseInt(event.target.value));
    };

    const handleColorSelect = (event) => {
      setColor(event.target.value);
    };

    const handleBWCheckbox = (e) => {
      setBlackWhite(e.currentTarget.checked);
    };

    const handleBranchSelect = (event) => {
      setBranch(event.target.value);
    };

    const handleStartingPointSelect = (event) => {
      setStartingPoint(parseInt(event.target.value));
    };

    const handleButton = async () => {
      let cards = [];
      for (let i = 0; i < numberOfCards; i++) {
        cards.push({ id: startingPoint + i, card: generateCard() });
      }
      setGeneratedCards(cards);

      // Save generated cards to backend
      try {
        await axios.post(
          "/api/card/cards",
          {
            branch: branch,
            cards: cards.map((card) => ({ id: card.id, card: card.card })),
          }
        );
        alert("Cards saved!");
      } catch (error) {
        alert("Failed to save cards:");
      }
    };

    const generateCard = () => {
      let numbers = generateBingoNumbers();
      let card = {};
    // let middleIndex = Math.floor((5 * 5) / 2); // Calculate middle index

      Object.keys(numbers).forEach((letter, index) => {
        let chosenNumbers = [];
        for (let i = 0; i < 5; i++) {
          if (index === 2 && i === 2) {  // Replace middle position with "Free"
            chosenNumbers.push("Free");
          } else {
            chosenNumbers.push(
              numbers[letter].splice(
                Math.floor(Math.random() * numbers[letter].length),
                1
              )[0]
              );
            }
          }
          card[letter] = chosenNumbers;
        });
        return card;
      };
    
      const numberOfCardsOptions = [];
      for (let i = 0; i <= 100; i++) {
        numberOfCardsOptions.push({ value: i.toString(), label: i.toString() });
      }
    
      const startingPointOptions = [];
      for (let i = 1; i <= 1000; i++) {
        startingPointOptions.push({ value: i.toString(), label: i.toString() });
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
        let classes =
          "padding-vertical-xxlg pale-gray-bg " +
          (blackWhite ? "print-bw " : "print-color ");
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
      const generateQRCode = () => {
        // Ensure the branch variable is properly encoded
        const encodedBranch = encodeURIComponent(branch);
        const url = `https://lotterybingoet.com/bingo?branch=${encodedBranch}`;
        setQrUrl(url);
      };
    
      const generateButtonDisabled = () => {
        return (
          numberOfCards === null ||
          color === null ||
          branch === null ||
          startingPoint === null
        );
      };
      const downloadQRCode = () => {
        const canvas = document.getElementById('qrCodeCanvas');
        const pngUrl = canvas.toDataURL('image/png');
    
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `QRCode_${branch}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    
      return (

        <section className={sectionClasses()}>
          <div className="container row no-print">
            <div className="col">
            <Link to="/card" className="tw-border-2 tw-p-1 tw-px-4 tw-border-blue-800 tw-text-blue-800">
      show cards
      </Link>
              <h1>Card Generator</h1>
    
              <div className="row justify-start align-center extra-pale-gray-bg padding-xlg">
                <div className="col shrink padding-horizontal-md">
                  <select className="number-select" onChange={handleNumberSelect}>
                    <option value="">Number of Cards</option>
                    {numberOfCardsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <select className="number-select" onChange={handleColorSelect}>
                    <option value="">Card Colors</option>
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <select
                    className="branch-name-input"
                    onChange={handleBranchSelect}
                  >
                    <option value="">Select Branch</option>
                    {["admin", "employee"].includes(currentUser.role) ? (
                      <option value={currentUser.branch}>{currentUser.branch}</option>
                    ) : currentUser.role == "superadmin" ? (
                      superBranch.map((branch) => (
                        <option key={branch.id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))
                    ) : (
                      users &&
                      users.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <select
                    className="starting-point-select"
                    onChange={handleStartingPointSelect}
                >
                  <option value="">Starting Point</option>
                  {startingPointOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
   <input
        type="text"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Enter branch name"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrUrl && (
        <div>
          <QRCode id="qrCodeCanvas" value={qrUrl} />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
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
              <div className="card" key={card.id}>
                <BingoCard card={card.card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default CardGenerator;
