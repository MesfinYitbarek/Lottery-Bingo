import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer>
          <div className="tw-container tw-row tw-three-cols tw-align-center">
            {/* <div className="col">For entertainment purposes only.</div> */}
            <div className="tw-col tw-text-center">
              &copy; 2024 - {new Date().getFullYear()} <a>lottery-bingo</a>
            </div>
            <div className="tw-col tw-text-right">
              {/* <Link to="/releases">Release Notes</Link> | <Link to="/terms">Terms of Use</Link> |{" "}
              <Link to="/privacy">Cookies &amp; Privacy Policy</Link> */}
              contact : +251 964983544
            </div>
          </div>
		  </footer>
    </div>
  )
}

export default Footer
