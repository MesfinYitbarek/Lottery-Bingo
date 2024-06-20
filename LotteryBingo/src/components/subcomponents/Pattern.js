/*
 *  Pattern Class
 *  Karol Brennan
 *  4.19.2020
 *  This class is used to display and control the game pattern.
 */
import React from 'react';


const nDots = document.querySelectorAll('.n0, .n1, .n2, .n3, .n4');
const iDots = document.querySelectorAll('.i0, .i1, .i2, .i3, .i4');

// Function to hide the n dots after the i dots finish
function hideNDots() {
  nDots.forEach(dot => dot.classList.add('hidden'));
}

// Function to show the n dots after a 5-second delay
function showNDots() {
  setTimeout(() => {
    nDots.forEach(dot => dot.classList.remove('hidden'));
  }, 5000); 
}

// Event listener to trigger hiding the n dots after i dots finish
iDots.forEach(dot => {
  dot.addEventListener('animationend', hideNDots);
});

// Event listener to trigger showing the n dots after 5 seconds
iDots.forEach(dot => {
  dot.addEventListener('animationend', showNDots); 
});



class Pattern extends React.Component {

  /*
   *  Render Pattern Function
   *  This will display a bingo card where the user can create their own pattern
   *  Or choose a pattern from the searchable drop down
   */
  
  render() {
    const pattern = JSON.parse(JSON.stringify(this.props.pattern.pattern));
    

    return (
      <div id="bingopattern" className="notranslate">
        {Object.keys(pattern).map((letter, index) => {
          return(
            <div key={letter + index} className="row vertical-row text-center">
              <div className="col dark-bg white-text2"><span>{letter}</span></div>
              {Object.keys(pattern[letter]).map((number, index) => {
                return(
                  <div key={letter + number} className={pattern[letter][number] ? 'selected col' : 'col'}>
                     
                      {/* onClick={(e) => this.props.update(pattern, letter, index, pattern[letter][number])} */}
                  
                      {letter === "N" && index === 2 ? <section className="free">Free</section> :null}
                      {letter === "N" && index === 0 ? <nav className="loading-dot n0"></nav> :null}
                      {letter === "N" && index === 1 ? <nav className="loading-dot n1"></nav> :null}
                      {/* {letter === "N" && index === 2 ? <nav className=" loading-dot n2"></nav> :null} */}
                      {letter === "N" && index === 3 ? <nav className="loading-dot n3"></nav> :null}
                      {letter === "N" && index === 4 ? <nav className="loading-dot n4"></nav> :null}


                      {letter === "B" && index === 2 ? <nav className="loading-dot n5"></nav> :null}
                      {letter === "I" && index === 2 ? <nav className="loading-dot n6"></nav> :null}
                      {letter === "G" && index === 2 ? <nav className="loading-dot n7"></nav> :null}
                      {letter === "O" && index === 2 ? <nav className="loading-dot n8"></nav> :null}

                      {letter === "B" && index === 4 ? <aside className=" loading-dot i0"></aside> :null}
                      {letter === "I" && index === 3 ? <aside className="loading-dot i1"></aside> :null}
                      {/* {letter === "N" && index === 2 ? <aside className="loading-dot i2"></aside> :null} */}
                      {letter === "G" && index === 1 ? <aside className="loading-dot i3"></aside> :null}
                      {letter === "O" && index === 0? <aside className=" loading-dot i4"></aside> :null}



                      {letter === "B" && index === 0? <aside className=" loading-dot i5"></aside> :null}
                      {letter === "I" && index === 1? <aside className=" loading-dot i6"></aside> :null}
                      {letter === "G" && index === 3? <aside className=" loading-dot i7"></aside> :null}
                      {letter === "O" && index === 4? <aside className=" loading-dot i8"></aside> :null}

                    
                   </div>
                    
                      
                )
                
              })}
              
            </div>
          )
        })}
      </div>
    );
  }
  
}




export default Pattern;