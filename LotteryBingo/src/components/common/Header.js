import React from 'react'

const Header = () => {
  return (
    <div>
       <header>
          <div className="tw-container tw-row tw-align-center">
            <div className="tw-col tw-shrink">
              <Link to="/">
                <img src={logoImage} alt="Let's Play Bingo!" className="logo" />
              </Link>
            </div>
            <div className="tw-col tw-grow tw-padding-md tw-no-text-wrap tw-text-right">
              <ul className="tw-menu">
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
            <div className="tw-col tw-shrink tw-text-right tw-margin-left-lg">
              <div id="google_translate_element"></div>
            </div>
          </div>
        </header>
    </div>
  )
}

export default Header
