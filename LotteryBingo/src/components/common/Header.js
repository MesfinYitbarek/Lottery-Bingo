import React from 'react'

const Header = () => {
  return (
    <div>
       <header>
          <div className="container row align-center">
            <div className="col shrink">
              <Link to="/">
                <img src={logoImage} alt="Let's Play Bingo!" className="logo" />
              </Link>
            </div>
            <div className="col grow padding-md no-text-wrap text-right">
              <ul className="menu">
                {/* <li>
                  <Link to="/">Play</Link>
                </li> */}
                {/* <li>
                  <Link to="/generator">Cards</Link>
                </li> */}
                {/* <li>
                  <Link to="/help">Help</Link>
                </li> */}
                {/* <li>
                  <Link to="/about">About / Donate</Link>
                </li> */}
                {/* <li>
                  <a href="https://letsplaybingo.io" target="_blank" rel="noreferrer">
                    Latest Edition
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="col shrink text-right margin-left-lg">
              <div id="google_translate_element"></div>
            </div>
          </div>
        </header>
    </div>
  )
}

export default Header
