import React, { useState, useEffect } from "react";

const Pattern = ({ selectedPattern }) => {
  const [gridState, setGridState] = useState(Array(25).fill(false));
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    // Reset grid state when the selected pattern changes
    setGridState(Array(25).fill(false));
    setAnimationActive(true);

    let intervalId;
    let currentIndex = 0;

    switch (selectedPattern) {
      case "anyhorizontal":
        intervalId = setInterval(() => {
          const newGridState = Array(25).fill(false);
          for (let i = 0; i < 5; i++) {
            newGridState[currentIndex * 5 + i] = true; // Activate the current row
          }
          setGridState(newGridState);
          currentIndex++;
          if (currentIndex === 5) {
            currentIndex = 0; // Reset the index to start from the beginning
          }
        }, 2000); // Adjust speed here (1000ms = 1 second)
        break;

      case "anyvertical":
        intervalId = setInterval(() => {
          const newGridState = Array(25).fill(false);
          for (let i = 0; i < 5; i++) {
            newGridState[currentIndex + i * 5] = true; // Activate the current column
          }
          setGridState(newGridState);
          currentIndex++;
          if (currentIndex === 5) {
            currentIndex = 0; // Reset the index to start from the beginning
          }
        }, 2000); // Adjust speed here
        break;
        case "anyTwoVertical":
          intervalId = setInterval(() => {
            const newGridState = Array(25).fill(false);
            if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i*5] = true;
              newGridState[(i *5)+2] = true; 
            }}
            else if(currentIndex === 1){
              for (let i = 0; i < 5; i++) {
                newGridState[(i*5)+1] = true;
                newGridState[(i*5)+3] = true;
              }

            }
            else if(currentIndex === 2){
              for (let i = 0; i < 5; i++) {
               
                newGridState[(i *5)+2] = true; 
                newGridState[(i *5)+4] = true; 
              }

            }
            else if(currentIndex === 3){
              for (let i = 0; i < 5; i++) {
               
                newGridState[(i*5)+1] = true;
                newGridState[i*5] = true;
              }

            }
       
            setGridState(newGridState);
            currentIndex++;
            if (currentIndex ===4) {
              currentIndex = 0; // Reset the index to start from the beginning
            }
          }, 2000); // Adjust speed here
          break;
          case "anyTwoHorizontal":
            intervalId = setInterval(() => {
              const newGridState = Array(25).fill(false);
              if (currentIndex === 0) {
              for (let i = 0; i < 5; i++) {
                newGridState[i] = true;
                newGridState[i+5] = true; 
              }}
              else if(currentIndex === 1){
                for (let i = 0; i < 5; i++) {
                  newGridState[10+i] = true;
                  newGridState[15+i] = true;
                }
  
              }
              else if(currentIndex === 2){
                for (let i = 0; i < 5; i++) {
                 
                  newGridState[i ] = true; 
                  newGridState[i +10] = true; 
                }
  
              }
              else if(currentIndex === 3){
                for (let i = 0; i < 5; i++) {
                 
                  newGridState[i+5] = true;
                  newGridState[i+10] = true;
                }
  
              }
         
              setGridState(newGridState);
              currentIndex++;
              if (currentIndex ===4) {
                currentIndex = 0; // Reset the index to start from the beginning
              }
            }, 2000); // Adjust speed here
            break;
            case "letterA":
              intervalId = setInterval(() => {
                const newGridState = Array(25).fill(false);
                if (currentIndex === 0) {
                
                  newGridState[15] = true;
                  newGridState[20] = true; 
                  newGridState[10] = true; 
                  newGridState[5] = true; 
                  newGridState[0] = true; 
                  newGridState[1] = true; 
                  newGridState[2] = true; 
                  newGridState[3] = true; 
                  newGridState[4] = true; 
                  newGridState[9] = true; 
                  newGridState[14] = true; 
                
                  
                  newGridState[13] = true; 
                  newGridState[12] = true; 
                  newGridState[11] = true; 
             
                  newGridState[19] = true; 
                  newGridState[24] = true; 
                 
                }

                else if (currentIndex === 1) {
                  newGridState[15] = true;
                  newGridState[20] = true; 
                  newGridState[10] = true; 
                  newGridState[5] = true; 
                  newGridState[0] = true; 
                  
                  newGridState[4] = true; 
                  newGridState[9] = true; 
                  newGridState[14] = true; 
                
                  
                  newGridState[13] = true; 
                  newGridState[12] = true; 
                  newGridState[11] = true; 
             
                  newGridState[19] = true; 
                  newGridState[24] = true; 
                   
                }
                else if (currentIndex === 2) {
                
                  newGridState[15] = true;
                  newGridState[20] = true; 
                  newGridState[10] = true; 
                  newGridState[5] = true; 
                  newGridState[0] = true; 
                  newGridState[1] = true; 
                  newGridState[2] = true; 
                  newGridState[3] = true; 
                  newGridState[4] = true; 
                  newGridState[9] = true; 
                  newGridState[14] = true; 
                
                  
                  newGridState[13] = true; 
                  newGridState[12] = true; 
                  newGridState[11] = true; 
             
                  newGridState[19] = true; 
                  newGridState[24] = true; 
                 
                }

              else  if (currentIndex === 3) {
                
                  newGridState[15] = true;
                  newGridState[20] = true; 
                  newGridState[10] = true; 
                  newGridState[5] = true; 
                  newGridState[0] = true; 
                  newGridState[1] = true; 
                  newGridState[2] = true; 
                  newGridState[3] = true; 
                   
                  newGridState[9] = true; 
                  newGridState[14] = true; 
                
                  newGridState[19] = true; 
                  newGridState[21] = true; 
                  newGridState[22] = true; 
                  newGridState[23] = true; 
               
                 
                }

                
              else  if (currentIndex === 4) {
                
                newGridState[15] = true;
                newGridState[20] = true; 
                newGridState[10] = true; 
                newGridState[5] = true; 
                newGridState[0] = true; 
            
                 
                newGridState[9] = true; 
                newGridState[14] = true; 
              
                newGridState[19] = true; 
                newGridState[21] = true; 
                newGridState[22] = true; 
                newGridState[23] = true; 
                newGridState[24] = true; 
                newGridState[4] = true; 
             
               
              }
           
                setGridState(newGridState);
                currentIndex++;
                if (currentIndex ===5) {
                  currentIndex = 0; // Reset the index to start from the beginning
                }
              }, 2000); // Adjust speed here
              break;

              case "FMC":
                intervalId = setInterval(() => {
                  const newGridState = Array(25).fill(false);
                  if (currentIndex === 0) {
                  
                    newGridState[0] = true;
                    newGridState[6] = true; 
                    newGridState[20] = true; 
                    newGridState[16] = true; 
                    newGridState[18] = true; 
                    newGridState[24] = true; 
                    newGridState[8] = true; 
                    newGridState[4] = true; 
                  }
                
                  

                  setGridState(newGridState);
                  currentIndex++;
                  if (currentIndex ===1) {
                    currentIndex = 0; // Reset the index to start from the beginning
                  }
                }, 2000); // Adjust speed here
                break;

                case "CS":
                  intervalId = setInterval(() => {
                    const newGridState = Array(25).fill(false);
                    if (currentIndex === 0) {
                    
                      newGridState[0] = true;
                     
                      newGridState[20] = true; 
                     
                      newGridState[24] = true; 
                      
                      newGridState[4] = true; 
                    }
                  
                    
  
                    setGridState(newGridState);
                    currentIndex++;
                    if (currentIndex ===1) {
                      currentIndex = 0; // Reset the index to start from the beginning
                    }
                  }, 2000); // Adjust speed here
                  break;

                  case "MS":
                    intervalId = setInterval(() => {
                      const newGridState = Array(25).fill(false);
                      if (currentIndex === 0) {
                      
                   
                        newGridState[6] = true; 
                     
                        newGridState[16] = true; 
                        newGridState[18] = true; 
                       
                        newGridState[8] = true; 
                 
                      }
                    
                      
    
                      setGridState(newGridState);
                      currentIndex++;
                      if (currentIndex ===1) {
                        currentIndex = 0; // Reset the index to start from the beginning
                      }
                    }, 2000); // Adjust speed here
                    break;

                
              case "FullHouse":
                intervalId = setInterval(() => {
                  const newGridState = Array(25).fill(false);
                  if (currentIndex === 0) {
                  
                    newGridState[0] = true;
                    newGridState[1] = true; 
                    newGridState[2] = true; 
                    newGridState[3] = true; 
                    newGridState[4] = true; 
                    newGridState[5] = true; 
                    newGridState[6] = true; 
                    newGridState[7] = true; 
                    
                    newGridState[8] = true;
                    newGridState[9] = true; 
                    newGridState[10] = true; 
                    newGridState[11] = true; 
                    newGridState[12] = true; 
                    newGridState[13] = true; 
                    newGridState[14] = true; 
                    newGridState[15] = true; 

                    newGridState[16] = true;
                    newGridState[16] = true; 
                    newGridState[17] = true; 
                    newGridState[18] = true; 
                    newGridState[19] = true; 
                    newGridState[20] = true; 
                    newGridState[21] = true; 
                    newGridState[22] = true; 
                    newGridState[23] = true; 
                    newGridState[24] = true; 
                  }
                
                  

                  setGridState(newGridState);
                  currentIndex++;
                  if (currentIndex ===1) {
                    currentIndex = 0; // Reset the index to start from the beginning
                  }
                }, 2000); // Adjust speed here
                break;

      case "anydiagonal":
        intervalId = setInterval(() => {
          const newGridState = Array(25).fill(false);
          if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i * 6] = true; // Main diagonal
            }
          } else if (currentIndex === 1) {
            for (let i = 0; i < 5; i++) {
              newGridState[i * 4 + 4] = true; // Secondary diagonal
            }
          }
          setGridState(newGridState);
          currentIndex++;
          if (currentIndex === 2) {
            currentIndex = 0; // Reset the index to start from the beginning
          }
        }, 2000); // Adjust speed here
        break;
        case "anyTwoLines":
          intervalId = setInterval(() => {
            const newGridState = Array(25).fill(false);
            if (currentIndex < 2) {
              // Activate two horizontal lines
              for (let i = 0; i < 5; i++) {
                newGridState[currentIndex * 5 + i] = true; // Activate row
                newGridState[(currentIndex * 5 + i)+5] = true; // Activate row
              }
            } else if (currentIndex ===2) {
              // Activate two vertical lines
              for (let i = 0; i < 5; i++) {
                newGridState[ i * 5] = true; // Activate column
                newGridState[ (i * 5)+1] = true; // Activate column
              }
            }
            else if (currentIndex ===3) {
              // Activate two vertical lines
              for (let i = 0; i < 5; i++) {
                newGridState[ (i * 5)+2] = true; // Activate column
                newGridState[ (i * 5)+3] = true; // Activate column
              }
            }
            else if (currentIndex === 4) {
              for (let i = 0; i < 5; i++) {
                newGridState[i * 5] = true;
                newGridState[10+i] = true; 
              }
            } 
            else if (currentIndex === 5) {
              for (let i = 0; i < 5; i++) {
                newGridState[i] = true;
                newGridState[(5*i)+2] = true; 
              }
            } 

            else if (currentIndex === 6) {
              for (let i = 0; i < 5; i++) {
                newGridState[i * 6] = true;
                newGridState[(5*i)+2] = true; 
              }
            } 


           else if (currentIndex === 7) {
              for (let i = 0; i < 5; i++) {
                newGridState[i * 6] = true;
                newGridState[i * 4 + 4] = true; // Main diagonal
              }
            } 
            else if (currentIndex === 8) {
              for (let i = 0; i < 5; i++) {
                newGridState[2+(i*5)] = true;
                newGridState[i +10] = true; 
              }
            }
            else if (currentIndex === 9) {
              for (let i = 0; i < 5; i++) {
                newGridState[i] = true;
                newGridState[i +10] = true; 
              }
            }
            else if (currentIndex === 10) {
              for (let i = 0; i < 5; i++) {
                newGridState[i+5] = true;
                newGridState[i +15] = true; 
              }
            }
            else if (currentIndex === 11) {
              for (let i = 0; i < 5; i++) {
                newGridState[i*5] = true;
                newGridState[(i *5)+2] = true; 
              }
            }
            else if (currentIndex === 12) {
              for (let i = 0; i < 5; i++) {
                newGridState[(i*5)+1] = true;
                newGridState[(i*5)+3] = true; 
              }
            }
            else if (currentIndex === 13) {
              for (let i = 0; i < 5; i++) {
                newGridState[i*5] = true;
                newGridState[i*6] = true; // Main diagonal
              }
            }
          
            setGridState(newGridState);
            currentIndex++;
            if (currentIndex === 14) {
              currentIndex = 0; // Reset the index to start from the beginning
            }
          }, 1000); // Adjust speed here
          break;

        case "defaultPattern":
          intervalId = setInterval(() => {
            const newGridState = Array(25).fill(false);
            if (currentIndex < 5) {
              // Activate rows
              for (let i = 0; i < 5; i++) {
                newGridState[currentIndex * 5 + i] = true; // Activate row
              }
            } else if (currentIndex >= 5 && currentIndex < 10) {
              // Activate columns
               for (let i = 0; i < 5; i++) {
            newGridState[(currentIndex + i * 5)-5] = true; // Activate the current column
          }
            } else if (currentIndex === 10) {
              // Main diagonal
              for (let i = 0; i < 5; i++) {
                newGridState[i * 6] = true; // Main diagonal
              }
            } else if (currentIndex === 11) {
              // Secondary diagonal
              for (let i = 0; i < 5; i++) {
                newGridState[i * 4 + 4] = true; // Secondary diagonal
                
              }
            }
            setGridState(newGridState);
            currentIndex++;
            if (currentIndex === 12) {
              currentIndex = 0; // Reset the index to start from the beginning
            }
          }, 2000); // Adjust speed here
          break;
        }

    return () => clearInterval(intervalId);
  }, [selectedPattern]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridGap: "1px",
        width: "150px",
        height: "150px",
        border: "1px solid white", // Make the grid borders visible
      }}
    >
      {gridState.map((isActive, index) => (
        <div
          key={index}
          style={{
            backgroundColor: isActive ? "whitesmoke" : "transparent",
            animation: isActive && animationActive ? "blink 1s infinite" : "none",
            border: "1px solid white", // Make cell borders visible
          }}
        />
      ))}
    </div>
  );
};

export default Pattern;