
import React from 'react';









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