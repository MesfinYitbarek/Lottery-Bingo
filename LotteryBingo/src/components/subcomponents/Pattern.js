import React, { useState, useEffect ,useRef} from "react";

const Pattern = ({ selectedPattern,selectedPattern2 }) => {
  const [gridState, setGridState] = useState(Array(25).fill(false));
  const [animationActive, setAnimationActive] = useState(false);
  const intervalIdRef = useRef(null);

  useEffect(() => {



     if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Reset grid state when the selected pattern changes
    setGridState(Array(25).fill(false));
    setAnimationActive(true);
    let currentIndex = 0;

    // Define the interval logic based on selected patterns
    const startAnimation = () => {
      intervalIdRef.current = setInterval(() => {
        const newGridState = Array(25).fill(false);

        if( (selectedPattern === 'anyhorizontal' && selectedPattern2 === 'anyvertical2')|| (selectedPattern === 'anyvertical' && selectedPattern2 === 'anyhorizontal2') ){
          if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i] = true;
              newGridState[i * 5] = true;
            }
          } else if (currentIndex === 1) {
            for (let i = 0; i < 5; i++) {
              newGridState[10 + i] = true;
              newGridState[2 + (i * 5)] = true;
            }
          }

          else if (currentIndex === 2) {
            for (let i = 0; i < 5; i++) {
              newGridState[20 + i] = true;
              newGridState[2 + (i * 5)] = true;
            }
          }

          else if (currentIndex === 3) {
            for (let i = 0; i < 5; i++) {
              newGridState[5 + i] = true;
              newGridState[2 + (i * 5)] = true;
            }
          }

          else if (currentIndex === 4) {
            for (let i = 0; i < 5; i++) {
              newGridState[15+ i] = true;
              newGridState[2 + (i * 5)] = true;
            }
          }
        } else if( (selectedPattern === 'anyhorizontal' && selectedPattern2 === 'anydiagonal2')|| (selectedPattern === 'anydiagonal' && selectedPattern2 === 'anyhorizontal2')) {
          if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i] = true;
              newGridState[(1 + i) * 4] = true;
            }
          } else if (currentIndex === 1) {
            for (let i = 0; i < 5; i++) {
              newGridState[5 + i] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 2) {
            for (let i = 0; i < 5; i++) {
              newGridState[10 + i] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 3) {
            for (let i = 0; i < 5; i++) {
              newGridState[20 + i] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 4) {
            for (let i = 0; i < 5; i++) {
              newGridState[15 + i] = true;
              newGridState[i * 6] = true;
            }
          }
        }





        else if( (selectedPattern === 'anyvertical' && selectedPattern2 === 'anydiagonal2')|| (selectedPattern === 'anydiagonal' && selectedPattern2 === 'anyvertical2')) {
          if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i*5] = true;
              newGridState[(1 + i) * 4] = true;
            }
          } else if (currentIndex === 1) {
            for (let i = 0; i < 5; i++) {
              newGridState[(5 * i)+1] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 2) {
            for (let i = 0; i < 5; i++) {
              newGridState[(5 * i)+2] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 3) {
            for (let i = 0; i < 5; i++) {
              newGridState[(5 * i)+3] = true;
              newGridState[i * 6] = true;
            }
          }
          else if (currentIndex === 4) {
            for (let i = 0; i < 5; i++) {
              newGridState[(5 * i)+4] = true;
              newGridState[i * 6] = true;
            }
          }
        }








        else if( (selectedPattern === 'anyhorizontal' && selectedPattern2 === 'anyTwoVertical2')|| (selectedPattern === 'anyTwoVertical' && selectedPattern2 === 'anyhorizontal2')) {
          if (currentIndex === 0) {
            for (let i = 0; i < 5; i++) {
              newGridState[i] = true;
              newGridState[(i*5 )] = true;
              newGridState[(5 * i) +2] = true;
            }
          } else if (currentIndex === 1) {
            for (let i = 0; i < 5; i++) {
              newGridState[i+5] = true;
              newGridState[(i*5 )+1] = true;
              newGridState[(5 * i) +4] = true;
              
            }
          }

          else if (currentIndex === 2) {
            for (let i = 0; i < 5; i++) {
              newGridState[i+5] = true;
              newGridState[(i*5 )+1] = true;
              newGridState[(5 * i) +4] = true;
            }
          }

          else if (currentIndex === 3) {
            for (let i = 0; i < 5; i++) {
              newGridState[i+10] = true;
              newGridState[(i*5 )+3] = true;
              newGridState[(5 * i) +2] = true;
            }
          }

          else if (currentIndex === 4) {
            for (let i = 0; i < 5; i++) {
              newGridState[i] = true;
              newGridState[(i*5 )+3] = true;
              newGridState[(5 * i) +2] = true;
            }
          }
        }



        else if ((selectedPattern === 'anyhorizontal' && selectedPattern2 === 'CS2')|| (selectedPattern === 'CS' && selectedPattern2 === 'anyhorizontal2')) {
          if (currentIndex === 0) {
        
                      for (let i = 0; i < 5; i++) {
                        newGridState[ i] = true;
                        newGridState[0] = true;
                                 
                        newGridState[20] = true; 
                       
                        newGridState[24] = true; 
                        
                        newGridState[4] = true;
            
                      }
                    }
                    else if(currentIndex===1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[20+ i] = true;
                        newGridState[0] = true;
                                 
                        newGridState[20] = true; 
                       
                        newGridState[24] = true; 
                        
                        newGridState[4] = true;
            
                      }
            
                    }

                    else if(currentIndex===2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+ i] = true;
                        newGridState[0] = true;
                                 
                        newGridState[20] = true; 
                       
                        newGridState[24] = true; 
                        
                        newGridState[4] = true;
            
                      }
            
                    }

                    else if(currentIndex===3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[10+ i] = true;
                        newGridState[0] = true;
                                 
                        newGridState[20] = true; 
                       
                        newGridState[24] = true; 
                        
                        newGridState[4] = true;
            
                      }
            
                    }

                    else if(currentIndex===4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[15+ i] = true;
                        newGridState[0] = true;
                                 
                        newGridState[20] = true; 
                       
                        newGridState[24] = true; 
                        
                        newGridState[4] = true;
            
                      }
            
                    }


        }


        else if ((selectedPattern === 'anyhorizontal' && selectedPattern2 === 'MS2')|| (selectedPattern === 'MS' && selectedPattern2 === 'anyhorizontal2')) {
          if (currentIndex === 0) {
        
                      for (let i = 0; i < 5; i++) {
                        newGridState[ i] = true;
                        newGridState[6] = true;
                                                   
                        newGridState[16] = true; 
                       
                        newGridState[8] = true; 
                        
                        newGridState[18] = true;
            
                      }
                    }
                    else if(currentIndex===1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[10+ i] = true;
                        newGridState[6] = true;
                                 
                        newGridState[16] = true; 
                       
                        newGridState[8] = true; 
                        
                        newGridState[18] = true;
            
                      }
          
                    }
                  
                    else if(currentIndex===2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+ i] = true;
                        newGridState[6] = true;
                                 
                        newGridState[16] = true; 
                       
                        newGridState[8] = true; 
                        
                        newGridState[18] = true;
            
                      }
            
                    }

                    else if(currentIndex===3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[20+ i] = true;
                        newGridState[6] = true;
                                 
                        newGridState[16] = true; 
                       
                        newGridState[8] = true; 
                        
                        newGridState[18] = true;
            
                      }
            
                    }

                    else if(currentIndex===4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[15+ i] = true;
                        newGridState[6] = true;
                                 
                        newGridState[16] = true; 
                       
                        newGridState[8] = true; 
                        
                        newGridState[18] = true;
            
                      }
            
                    }

        }



        else if  ((selectedPattern === 'anyhorizontal' && selectedPattern2 === 'FMC2') || (selectedPattern === 'FMC' && selectedPattern2 === 'anyhorizontal2')) {
          if (currentIndex === 0) {
        
                      for (let i = 0; i < 5; i++) {
                        newGridState[ i] = true;
                        newGridState[0] = true;
                        newGridState[6] = true; 
                        newGridState[20] = true; 
                        newGridState[16] = true; 
                        newGridState[18] = true; 
                        newGridState[24] = true; 
                        newGridState[8] = true; 
                        newGridState[4] = true; 
            
                      }
                    }
                    else if(currentIndex===1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[10+ i] = true;
                        newGridState[0] = true;
                                newGridState[6] = true; 
                                newGridState[20] = true; 
                                newGridState[16] = true; 
                                newGridState[18] = true; 
                                newGridState[24] = true; 
                                newGridState[8] = true; 
                                newGridState[4] = true; 
            
                      }
            
                    }
        }

      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='anyTwoVertical2')|| (selectedPattern==='anyTwoVertical' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+5] = true; 
                      newGridState[(i*5)+1] = true; 
                      newGridState[(i*5)+3] = true; 

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[(i*5)+1] = true; 
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[(i*5)+1] = true; 
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[(i*5)+1] = true; 
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }

                    else if(currentIndex === 4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[(i*5)+1] = true; 
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }


      }

      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='anydiagonal2')|| (selectedPattern==='anydiagonal' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+15] = true; 
                      newGridState[(1 + i) * 4] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[i * 6] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[15+i] = true;
                        newGridState[20+i] = true;
                        newGridState[i * 6] = true;
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[i] = true;
                        newGridState[20+i] = true;
                        newGridState[i * 6] = true;
                      }
        
                    }

                    else if(currentIndex === 4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[10+i] = true;
                        newGridState[i * 6] = true;
                      }
        
                    }


      }


      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='CS2')|| (selectedPattern==='CS' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+5] = true; 
                      newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[i] = true;
                        newGridState[15+i] = true;
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[i] = true;
                        newGridState[5+i] = true;
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[10+i] = true;
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }

                    else if(currentIndex === 4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[20+i] = true;
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }


      }



      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='MS2')|| (selectedPattern==='MS' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+5] = true; 
                      newGridState[6] = true;
                                       
                                                newGridState[8] = true; 
                                               
                                                newGridState[16] = true; 
                                                
                                                newGridState[18] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[20+i] = true;
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[10+i] = true;
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[i] = true;
                        newGridState[10+i] = true;
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }

                    else if(currentIndex === 4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[i] = true;
                        newGridState[15+i] = true;
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }


      }

      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='anyvertical2')|| (selectedPattern==='anyvertical' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+5] = true; 
                      newGridState[(i*5)+1] = true; 
                    

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[20+i] = true;
                      
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                      
                        newGridState[(i*5)+2] = true; 
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                      
                        newGridState[(i*5)+3] = true; 
                      }
        
                    }

                    else if(currentIndex === 4){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                      
                        newGridState[(i*5)+4] = true; 
                      }
        
                    }


      }

      else if((selectedPattern==='anyTwoHorizontal' && selectedPattern2==='FMC2')|| (selectedPattern==='FMC' && selectedPattern2==='anyTwoHorizontal2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[i] = true;
                      newGridState[i+5] = true; 
                      newGridState[0] = true;
                                  newGridState[6] = true; 
                                  newGridState[20] = true; 
                                  newGridState[16] = true; 
                                  newGridState[18] = true; 
                                  newGridState[24] = true; 
                                  newGridState[8] = true; 
                                  newGridState[4] = true;  

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[5+i] = true;
                        newGridState[15+i] = true;
                        newGridState[0] = true;
            newGridState[6] = true; 
            newGridState[20] = true; 
            newGridState[16] = true; 
            newGridState[18] = true; 
            newGridState[24] = true; 
            newGridState[8] = true; 
            newGridState[4] = true; 
                      }
        
                    }


      }


      else if((selectedPattern==='anyTwoVertical' && selectedPattern2==='FMC2')|| (selectedPattern==='FMC' && selectedPattern2==='anyTwoVertical2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[(i*5)+4] = true;
                      newGridState[i*5] = true; 
                      newGridState[0] = true;
                                  newGridState[6] = true; 
                                  newGridState[20] = true; 
                                  newGridState[16] = true; 
                                  newGridState[18] = true; 
                                  newGridState[24] = true; 
                                  newGridState[8] = true; 
                                  newGridState[4] = true;  

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+3] = true; 
                        newGridState[0] = true;
            newGridState[6] = true; 
            newGridState[20] = true; 
            newGridState[16] = true; 
            newGridState[18] = true; 
            newGridState[24] = true; 
            newGridState[8] = true; 
            newGridState[4] = true; 
                      }
        
                    }


      }


      
      else if((selectedPattern==='anyTwoVertical' && selectedPattern2==='MS2')|| (selectedPattern==='MS' && selectedPattern2==='anyTwoVertical2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[(i*5)+4] = true;
                      newGridState[i*5] = true; 
                      newGridState[6] = true;
                                       
                                                newGridState[8] = true; 
                                               
                                                newGridState[16] = true; 
                                                
                                                newGridState[18] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+3] = true; 
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+4] = true; 
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+2] = true; 
                        newGridState[6] = true;
                                       
                              newGridState[8] = true; 
                             
                              newGridState[16] = true; 
                              
                              newGridState[18] = true;
                      }
        
                    }


      }

      
      else if((selectedPattern==='anyTwoVertical' && selectedPattern2==='CS2')|| (selectedPattern==='CS' && selectedPattern2==='anyTwoVertical2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[(i*5)+4] = true;
                      newGridState[i*5] = true; 
                      newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+3] = true; 
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+4] = true; 
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }

                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+2] = true; 
                        newGridState[0] = true;
                     
            newGridState[20] = true; 
           
            newGridState[24] = true; 
            
            newGridState[4] = true;
                      }
        
                    }


      }


      else if((selectedPattern==='anyTwoVertical' && selectedPattern2==='anydiagonal2')|| (selectedPattern==='anydiagonal' && selectedPattern2==='anyTwoVertical2') ){

        if (currentIndex === 0) {
                    for (let i = 0; i < 5; i++) {
                      newGridState[(i*5)+4] = true;
                      newGridState[i*5] = true; 
                      newGridState[(1 + i) * 4] = true;

                    }}
                    else if(currentIndex === 1){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+4] = true; 
                        newGridState[i * 6] = true;
                      }
        
                    }

                    else if(currentIndex === 2){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+0] = true;
                        newGridState[(i*5)+2] = true; 
                        newGridState[i * 6] = true;
                      }
        
                    }


                    else if(currentIndex === 3){
                      for (let i = 0; i < 5; i++) {
                        newGridState[(i*5)+1] = true;
                        newGridState[(i*5)+4] = true; 
                        newGridState[i * 6] = true;
                      }
        
                    }

      }







      else if(selectedPattern === 'defaultPattern'  && selectedPattern2 === 'defaultpattern2'  ) 
        {
        if (currentIndex ===0) {
                    // Activate rows
                    for (let i = 0; i < 5; i++) {
                      newGridState[ i] = true; // Activate row
                      
                    }
                  } 
                  
                  else if (currentIndex ===1) {
                    // Activate columns
                    for (let i = 0; i < 5; i++) {
                                 
                      newGridState[0] = true;
                               
                      newGridState[20] = true; 
                     
                      newGridState[24] = true; 
                      
                      newGridState[4] = true;
          
                    }
                  } 
                  
                  else if (currentIndex ===2) {
                    // Activate columns
                    for (let i = 0; i < 5; i++) {
                                               
  newGridState[6] = true;
                                                         
    newGridState[8] = true; 
  newGridState[16] = true; 
                                                
      newGridState[18] = true;
                                    
  }
                  } 
                  
                  else if (currentIndex ===3) {
                    // Activate columns
                     for (let i = 0; i < 5; i++) {
                  newGridState[( i * 5)] = true; 
                  
                }
                  }
                  
                  else if (currentIndex === 4) {
                    // Main diagonal
                    for (let i = 0; i < 5; i++) {
                      newGridState[( i * 5)+2] = true; 
                    }
                  }

                  else if (currentIndex === 5) {
                    // Main diagonal
                    for (let i = 0; i < 5; i++) {
                    
                      newGridState[i * 6] = true;

                    }
                  }
      }


 else if(selectedPattern==='anyhorizontal'){
        if (currentIndex === 0) {
          for (let i = 0; i < 5; i++) {
            newGridState[i] = true;
          

          }}
          else if(currentIndex === 2){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i +10] = true;
            }

          }

          else if(currentIndex === 3){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i +10] = true;
            }

          }
          else if(currentIndex === 4){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i +10] = true;
            }

          }
          else if(currentIndex === 5){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i +10] = true;
            }

          }
         


      }

      else if(selectedPattern==='anyvertical'){
        if (currentIndex === 0) {
          for (let i = 0; i < 5; i++) {
            newGridState[i*5] = true;
          

          }}
          else if(currentIndex === 1){
            for (let i = 0; i < 5; i++) {
              
              newGridState[(i *5)+2] = true;
            }

          }

          else if(currentIndex === 2){
            for (let i = 0; i < 5; i++) {
              
              newGridState[(i *5)+2] = true;
            }

          }

          else if(currentIndex === 3){
            for (let i = 0; i < 5; i++) {
              
              newGridState[(i *5)+2] = true;
            }

          }

          else if(currentIndex === 4){
            for (let i = 0; i < 5; i++) {
              
              newGridState[(i *5)+2] = true;
            }

          }

          else if(currentIndex === 5){
            for (let i = 0; i < 5; i++) {
              
              newGridState[(i *5)+2] = true;
            }

          }
          

      }

      else if(selectedPattern==='anydiagonal'){
        if (currentIndex === 0) {
          for (let i = 0; i < 5; i++) {
            newGridState[i * 6] = true;
          

          }}
          else if(currentIndex === 1){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i * 4 + 4] = true;
            }

          }
          else if(currentIndex === 2){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i * 4 + 4] = true;
            }

          }
          else if(currentIndex === 3){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i * 4 + 4] = true;
            }

          }
          else if(currentIndex === 4){
            for (let i = 0; i < 5; i++) {
              
              newGridState[i * 4 + 4] = true;
            }

          }

      }


      else if(selectedPattern==='defaultPattern'){
        if (currentIndex ===0) {
                    // Activate rows
                    for (let i = 0; i < 5; i++) {
                      newGridState[ i] = true; // Activate row
                      
                    }
                  } 
                  
                  else if (currentIndex ===1) {
                    // Activate columns
                     for (let i = 0; i < 5; i++) {
                 
                      newGridState[ 5+i] = true; // Activate row
                }
                  } 
                  
                  
                  else if (currentIndex ===2) {
                    // Activate columns
                     for (let i = 0; i < 5; i++) {
                 
                  newGridState[( i * 5)+2] = true; // Activate the current column
                }
                  } 
                  
                  else if (currentIndex ===3) {
                    // Activate columns
                     for (let i = 0; i < 5; i++) {
                  newGridState[( i * 5)] = true; // Activate the current column
                  
                }
                  }
                  
                  else if (currentIndex === 4) {
                    // Main diagonal
                    for (let i = 0; i < 5; i++) {
                      newGridState[i * 4 + 4] = true;
                     

                    }
                  }

                  else if (currentIndex === 5) {
                    // Main diagonal
                    for (let i = 0; i < 5; i++) {
                    
                      newGridState[i * 6] = true;

                    }
                  }

      }







     
     else if(selectedPattern==='anyTwoLines') {

   
           
         
             
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
                    newGridState[ (i * 5)] = true; // Activate column
                    newGridState[ (i * 6)] = true; // Activate column
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


     }

     else if(selectedPattern==='MS'){

      if (currentIndex === 0) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }

                            else  if (currentIndex === 1) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }
                       
                             else  if (currentIndex === 2) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }
                       

                              else if (currentIndex === 3) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }
                       

                             else if (currentIndex === 4) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }
                       

                            else  if (currentIndex === 5) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[6] = true;
                                           
                                  newGridState[8] = true; 
                                 
                                  newGridState[16] = true; 
                                  
                                  newGridState[18] = true;
                      
                                }
                              }
                       
                       
    }




    else if(selectedPattern==='CS'){

      if (currentIndex === 0) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                           
                                  newGridState[20] = true; 
                                 
                                  newGridState[24] = true; 
                                  
                                  newGridState[4] = true;
                      
                                }
                              }

                              if (currentIndex === 1) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                           
                                  newGridState[20] = true; 
                                 
                                  newGridState[24] = true; 
                                  
                                  newGridState[4] = true;
                      
                                }
                              }

                              if (currentIndex === 2) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                           
                                  newGridState[20] = true; 
                                 
                                  newGridState[24] = true; 
                                  
                                  newGridState[4] = true;
                      
                                }
                              }

                              if (currentIndex === 3) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                           
                                  newGridState[20] = true; 
                                 
                                  newGridState[24] = true; 
                                  
                                  newGridState[4] = true;
                      
                                }
                              }

                              if (currentIndex === 4) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                           
                                  newGridState[20] = true; 
                                 
                                  newGridState[24] = true; 
                                  
                                  newGridState[4] = true;
                      
                                }
                              }
                          
    }

    else if(selectedPattern==='FMC'){

      if (currentIndex === 0) {
                          
                                for (let i = 0; i < 5; i++) {
                                 
                                  newGridState[0] = true;
                                                  newGridState[6] = true; 
                                                  newGridState[20] = true; 
                                                  newGridState[16] = true; 
                                                  newGridState[18] = true; 
                                                  newGridState[24] = true; 
                                                  newGridState[8] = true; 
                                                  newGridState[4] = true; 
                      
                                }
                              }

                              
      else if (currentIndex === 1) {
                          
        for (let i = 0; i < 5; i++) {
         
          newGridState[0] = true;
                          newGridState[6] = true; 
                          newGridState[20] = true; 
                          newGridState[16] = true; 
                          newGridState[18] = true; 
                          newGridState[24] = true; 
                          newGridState[8] = true; 
                          newGridState[4] = true; 

        }
      }

      else if (currentIndex === 2) {
                          
        for (let i = 0; i < 5; i++) {
         
          newGridState[0] = true;
                          newGridState[6] = true; 
                          newGridState[20] = true; 
                          newGridState[16] = true; 
                          newGridState[18] = true; 
                          newGridState[24] = true; 
                          newGridState[8] = true; 
                          newGridState[4] = true; 

        }
      }

      else if (currentIndex === 3) {
                          
        for (let i = 0; i < 5; i++) {
         
          newGridState[0] = true;
                          newGridState[6] = true; 
                          newGridState[20] = true; 
                          newGridState[16] = true; 
                          newGridState[18] = true; 
                          newGridState[24] = true; 
                          newGridState[8] = true; 
                          newGridState[4] = true; 

        }
      }

      else if (currentIndex === 4) {
                          
        for (let i = 0; i < 5; i++) {
         
          newGridState[0] = true;
                          newGridState[6] = true; 
                          newGridState[20] = true; 
                          newGridState[16] = true; 
                          newGridState[18] = true; 
                          newGridState[24] = true; 
                          newGridState[8] = true; 
                          newGridState[4] = true; 

        }
      }

      else if (currentIndex === 5) {
                          
        for (let i = 0; i < 5; i++) {
         
          newGridState[0] = true;
                          newGridState[6] = true; 
                          newGridState[20] = true; 
                          newGridState[16] = true; 
                          newGridState[18] = true; 
                          newGridState[24] = true; 
                          newGridState[8] = true; 
                          newGridState[4] = true; 

        }
      }
                           
    }

    else if(selectedPattern==='letterA'){
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

    }
    else if(selectedPattern==='FullHouse'){
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

                      else if(currentIndex===1){
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

                      else if(currentIndex===2){
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

                      else if(currentIndex===3){
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

                      else if(currentIndex===4){
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

                      else if(currentIndex===5){
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
                    
                      
    
    }
    else if(selectedPattern==='anyTwoHorizontal'){

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

    }

    else if(selectedPattern==='anyTwoVertical'){
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
      
    }
  
else {
//do nothing for now
 
}
        // Add more conditions for other patterns here

        setGridState(newGridState);
        currentIndex++;
        if (currentIndex === 6) {
          currentIndex = 0; // Reset the index to start from the beginning
        }
      }, 2000);
    };

    startAnimation();
    return () => {
      clearInterval(intervalIdRef.current);
  };
} , [selectedPattern,selectedPattern2]);


   

   
    // else{

    // switch (selectedPattern) {
    //   case "anyhorizontal":
    //     intervalId = setInterval(() => {
    //       const newGridState = Array(25).fill(false);
    //       for (let i = 0; i < 5; i++) {
    //         newGridState[currentIndex * 5 + i] = true; // Activate the current row
    //       }
    //       setGridState(newGridState);
    //       currentIndex++;
    //       if (currentIndex === 5) {
    //         currentIndex = 0; // Reset the index to start from the beginning
    //       }
    //     }, 2000); // Adjust speed here (1000ms = 1 second)
    //     break;

    //   case "anyvertical":
    //     intervalId = setInterval(() => {
    //       const newGridState = Array(25).fill(false);
    //       for (let i = 0; i < 5; i++) {
    //         newGridState[currentIndex + i * 5] = true; // Activate the current column
    //       }
    //       setGridState(newGridState);
    //       currentIndex++;
    //       if (currentIndex === 5) {
    //         currentIndex = 0; // Reset the index to start from the beginning
    //       }
    //     }, 2000); // Adjust speed here
    //     break;
    //     case "anyTwoVertical":
    //       intervalId = setInterval(() => {
    //         const newGridState = Array(25).fill(false);
    //         if (currentIndex === 0) {
    //         for (let i = 0; i < 5; i++) {
    //           newGridState[i*5] = true;
    //           newGridState[(i *5)+2] = true; 
    //         }}
    //         else if(currentIndex === 1){
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[(i*5)+1] = true;
    //             newGridState[(i*5)+3] = true;
    //           }

    //         }
    //         else if(currentIndex === 2){
    //           for (let i = 0; i < 5; i++) {
               
    //             newGridState[(i *5)+2] = true; 
    //             newGridState[(i *5)+4] = true; 
    //           }

    //         }
    //         else if(currentIndex === 3){
    //           for (let i = 0; i < 5; i++) {
               
    //             newGridState[(i*5)+1] = true;
    //             newGridState[i*5] = true;
    //           }

    //         }
       
    //         setGridState(newGridState);
    //         currentIndex++;
    //         if (currentIndex ===4) {
    //           currentIndex = 0; // Reset the index to start from the beginning
    //         }
    //       }, 2000); // Adjust speed here
    //       break;
    //       case "anyTwoHorizontal":
    //         intervalId = setInterval(() => {
    //           const newGridState = Array(25).fill(false);
    //           if (currentIndex === 0) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i] = true;
    //             newGridState[i+5] = true; 
    //           }}
    //           else if(currentIndex === 1){
    //             for (let i = 0; i < 5; i++) {
    //               newGridState[10+i] = true;
    //               newGridState[15+i] = true;
    //             }
  
    //           }
    //           else if(currentIndex === 2){
    //             for (let i = 0; i < 5; i++) {
                 
    //               newGridState[i ] = true; 
    //               newGridState[i +10] = true; 
    //             }
  
    //           }
    //           else if(currentIndex === 3){
    //             for (let i = 0; i < 5; i++) {
                 
    //               newGridState[i+5] = true;
    //               newGridState[i+10] = true;
    //             }
  
    //           }
         
    //           setGridState(newGridState);
    //           currentIndex++;
    //           if (currentIndex ===4) {
    //             currentIndex = 0; // Reset the index to start from the beginning
    //           }
    //         }, 2000); // Adjust speed here
    //         break;
    //         case "letterA":
    //           intervalId = setInterval(() => {
    //             const newGridState = Array(25).fill(false);
    //             if (currentIndex === 0) {
                
    //               newGridState[15] = true;
    //               newGridState[20] = true; 
    //               newGridState[10] = true; 
    //               newGridState[5] = true; 
    //               newGridState[0] = true; 
    //               newGridState[1] = true; 
    //               newGridState[2] = true; 
    //               newGridState[3] = true; 
    //               newGridState[4] = true; 
    //               newGridState[9] = true; 
    //               newGridState[14] = true; 
                
                  
    //               newGridState[13] = true; 
    //               newGridState[12] = true; 
    //               newGridState[11] = true; 
             
    //               newGridState[19] = true; 
    //               newGridState[24] = true; 
                 
    //             }

    //             else if (currentIndex === 1) {
    //               newGridState[15] = true;
    //               newGridState[20] = true; 
    //               newGridState[10] = true; 
    //               newGridState[5] = true; 
    //               newGridState[0] = true; 
                  
    //               newGridState[4] = true; 
    //               newGridState[9] = true; 
    //               newGridState[14] = true; 
                
                  
    //               newGridState[13] = true; 
    //               newGridState[12] = true; 
    //               newGridState[11] = true; 
             
    //               newGridState[19] = true; 
    //               newGridState[24] = true; 
                   
    //             }
    //             else if (currentIndex === 2) {
                
    //               newGridState[15] = true;
    //               newGridState[20] = true; 
    //               newGridState[10] = true; 
    //               newGridState[5] = true; 
    //               newGridState[0] = true; 
    //               newGridState[1] = true; 
    //               newGridState[2] = true; 
    //               newGridState[3] = true; 
    //               newGridState[4] = true; 
    //               newGridState[9] = true; 
    //               newGridState[14] = true; 
                
                  
    //               newGridState[13] = true; 
    //               newGridState[12] = true; 
    //               newGridState[11] = true; 
             
    //               newGridState[19] = true; 
    //               newGridState[24] = true; 
                 
    //             }

    //           else  if (currentIndex === 3) {
                
    //               newGridState[15] = true;
    //               newGridState[20] = true; 
    //               newGridState[10] = true; 
    //               newGridState[5] = true; 
    //               newGridState[0] = true; 
    //               newGridState[1] = true; 
    //               newGridState[2] = true; 
    //               newGridState[3] = true; 
                   
    //               newGridState[9] = true; 
    //               newGridState[14] = true; 
                
    //               newGridState[19] = true; 
    //               newGridState[21] = true; 
    //               newGridState[22] = true; 
    //               newGridState[23] = true; 
               
                 
    //             }

                
    //           else  if (currentIndex === 4) {
                
    //             newGridState[15] = true;
    //             newGridState[20] = true; 
    //             newGridState[10] = true; 
    //             newGridState[5] = true; 
    //             newGridState[0] = true; 
            
                 
    //             newGridState[9] = true; 
    //             newGridState[14] = true; 
              
    //             newGridState[19] = true; 
    //             newGridState[21] = true; 
    //             newGridState[22] = true; 
    //             newGridState[23] = true; 
    //             newGridState[24] = true; 
    //             newGridState[4] = true; 
             
               
    //           }
           
    //             setGridState(newGridState);
    //             currentIndex++;
    //             if (currentIndex ===5) {
    //               currentIndex = 0; // Reset the index to start from the beginning
    //             }
    //           }, 2000); // Adjust speed here
    //           break;

    //           case "FMC":
    //             intervalId = setInterval(() => {
    //               const newGridState = Array(25).fill(false);
    //               if (currentIndex === 0) {
                  
    //                 newGridState[0] = true;
    //                 newGridState[6] = true; 
    //                 newGridState[20] = true; 
    //                 newGridState[16] = true; 
    //                 newGridState[18] = true; 
    //                 newGridState[24] = true; 
    //                 newGridState[8] = true; 
    //                 newGridState[4] = true; 
    //               }
                
                  

    //               setGridState(newGridState);
    //               currentIndex++;
    //               if (currentIndex ===1) {
    //                 currentIndex = 0; // Reset the index to start from the beginning
    //               }
    //             }, 2000); // Adjust speed here
    //             break;

    //             case "CS":
    //               intervalId = setInterval(() => {
    //                 const newGridState = Array(25).fill(false);
    //                 if (currentIndex === 0) {
                    
    //                   newGridState[0] = true;
                     
    //                   newGridState[20] = true; 
                     
    //                   newGridState[24] = true; 
                      
    //                   newGridState[4] = true; 
    //                 }
                  
                    
  
    //                 setGridState(newGridState);
    //                 currentIndex++;
    //                 if (currentIndex ===1) {
    //                   currentIndex = 0; // Reset the index to start from the beginning
    //                 }
    //               }, 2000); // Adjust speed here
    //               break;

    //               case "MS":
    //                 intervalId = setInterval(() => {
    //                   const newGridState = Array(25).fill(false);
    //                   if (currentIndex === 0) {
                      
                   
    //                     intervalId = setInterval(() => {
    //                       const newGridState = Array(25).fill(false);
    //                       if (currentIndex === 0) {
                          
    //                         for (let i = 0; i < 5; i++) {
    //                           newGridState[ i] = true;
    //                           newGridState[6] = true;
                                       
    //                           newGridState[8] = true; 
                             
    //                           newGridState[16] = true; 
                              
    //                           newGridState[18] = true;
                  
    //                         }
    //                       }
    //                       else if(currentIndex===1){
    //                         for (let i = 0; i < 5; i++) {
    //                           newGridState[10+ i] = true;
    //                           newGridState[6] = true;
                                       
    //                           newGridState[8] = true; 
                             
    //                           newGridState[16] = true; 
                              
    //                           newGridState[18] = true;
                  
    //                         }
                  
    //                       }
                        
                          
                  
    //                       setGridState(newGridState);
    //                       currentIndex++;
    //                       if (currentIndex ===2) {
    //                         currentIndex = 0; // Reset the index to start from the beginning
    //                       }
    //                     }, 2000);
                 
    //                   }
                    
                      
    
    //                   setGridState(newGridState);
    //                   currentIndex++;
    //                   if (currentIndex ===1) {
    //                     currentIndex = 0; // Reset the index to start from the beginning
    //                   }
    //                 }, 2000); // Adjust speed here
    //                 break;

                
    //           case "FullHouse":
    //             intervalId = setInterval(() => {
    //               const newGridState = Array(25).fill(false);
    //               if (currentIndex === 0) {
                  
    //                 newGridState[0] = true;
    //                 newGridState[1] = true; 
    //                 newGridState[2] = true; 
    //                 newGridState[3] = true; 
    //                 newGridState[4] = true; 
    //                 newGridState[5] = true; 
    //                 newGridState[6] = true; 
    //                 newGridState[7] = true; 
                    
    //                 newGridState[8] = true;
    //                 newGridState[9] = true; 
    //                 newGridState[10] = true; 
    //                 newGridState[11] = true; 
    //                 newGridState[12] = true; 
    //                 newGridState[13] = true; 
    //                 newGridState[14] = true; 
    //                 newGridState[15] = true; 

    //                 newGridState[16] = true;
    //                 newGridState[16] = true; 
    //                 newGridState[17] = true; 
    //                 newGridState[18] = true; 
    //                 newGridState[19] = true; 
    //                 newGridState[20] = true; 
    //                 newGridState[21] = true; 
    //                 newGridState[22] = true; 
    //                 newGridState[23] = true; 
    //                 newGridState[24] = true; 
    //               }
                
                  

    //               setGridState(newGridState);
    //               currentIndex++;
    //               if (currentIndex ===1) {
    //                 currentIndex = 0; // Reset the index to start from the beginning
    //               }
    //             }, 2000); // Adjust speed here
    //             break;

    //   case "anydiagonal":
    //     intervalId = setInterval(() => {
    //       const newGridState = Array(25).fill(false);
    //       if (currentIndex === 0) {
    //         for (let i = 0; i < 5; i++) {
    //           newGridState[i * 6] = true; // Main diagonal
    //         }
    //       } else if (currentIndex === 1) {
    //         for (let i = 0; i < 5; i++) {
    //           newGridState[i * 4 + 4] = true; // Secondary diagonal
    //         }
    //       }
    //       setGridState(newGridState);
    //       currentIndex++;
    //       if (currentIndex === 2) {
    //         currentIndex = 0; // Reset the index to start from the beginning
    //       }
    //     }, 2000); // Adjust speed here
    //     break;
    //     case "anyTwoLines":
    //       intervalId = setInterval(() => {
    //         const newGridState = Array(25).fill(false);
    //         if (currentIndex < 2) {
    //           // Activate two horizontal lines
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[currentIndex * 5 + i] = true; // Activate row
    //             newGridState[(currentIndex * 5 + i)+5] = true; // Activate row
    //           }
    //         } else if (currentIndex ===2) {
    //           // Activate two vertical lines
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[ i * 5] = true; // Activate column
    //             newGridState[ (i * 5)+1] = true; // Activate column
    //           }
    //         }
    //         else if (currentIndex ===3) {
    //           // Activate two vertical lines
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[ (i * 5)+2] = true; // Activate column
    //             newGridState[ (i * 5)+3] = true; // Activate column
    //           }
    //         }
    //         else if (currentIndex === 4) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i * 5] = true;
    //             newGridState[10+i] = true; 
    //           }
    //         } 
    //         else if (currentIndex === 5) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i] = true;
    //             newGridState[(5*i)+2] = true; 
    //           }
    //         } 

    //         else if (currentIndex === 6) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i * 6] = true;
    //             newGridState[(5*i)+2] = true; 
    //           }
    //         } 


    //        else if (currentIndex === 7) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i * 6] = true;
    //             newGridState[i * 4 + 4] = true; // Main diagonal
    //           }
    //         } 
    //         else if (currentIndex === 8) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[2+(i*5)] = true;
    //             newGridState[i +10] = true; 
    //           }
    //         }
    //         else if (currentIndex === 9) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i] = true;
    //             newGridState[i +10] = true; 
    //           }
    //         }
    //         else if (currentIndex === 10) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i+5] = true;
    //             newGridState[i +15] = true; 
    //           }
    //         }
    //         else if (currentIndex === 11) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i*5] = true;
    //             newGridState[(i *5)+2] = true; 
    //           }
    //         }
    //         else if (currentIndex === 12) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[(i*5)+1] = true;
    //             newGridState[(i*5)+3] = true; 
    //           }
    //         }
    //         else if (currentIndex === 13) {
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i*5] = true;
    //             newGridState[i*6] = true; // Main diagonal
    //           }
    //         }
          
    //         setGridState(newGridState);
    //         currentIndex++;
    //         if (currentIndex === 14) {
    //           currentIndex = 0; // Reset the index to start from the beginning
    //         }
    //       }, 1000); // Adjust speed here
    //       break;

    //     case "defaultPattern":
    //       intervalId = setInterval(() => {
    //         const newGridState = Array(25).fill(false);
    //         if (currentIndex < 5) {
    //           // Activate rows
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[currentIndex * 5 + i] = true; // Activate row
    //           }
    //         } else if (currentIndex >= 5 && currentIndex < 10) {
    //           // Activate columns
    //            for (let i = 0; i < 5; i++) {
    //         newGridState[(currentIndex + i * 5)-5] = true; // Activate the current column
    //       }
    //         } else if (currentIndex === 10) {
    //           // Main diagonal
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i * 6] = true; // Main diagonal
    //           }
    //         } else if (currentIndex === 11) {
    //           // Secondary diagonal
    //           for (let i = 0; i < 5; i++) {
    //             newGridState[i * 4 + 4] = true; // Secondary diagonal
                
    //           }
    //         }
    //         setGridState(newGridState);
    //         currentIndex++;
    //         if (currentIndex === 12) {
    //           currentIndex = 0; // Reset the index to start from the beginning
    //         }
    //       }, 2000); // Adjust speed here
    //       break;
    //     }

    

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