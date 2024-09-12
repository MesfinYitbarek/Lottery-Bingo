import React from 'react';
import { FaHistory } from "react-icons/fa";
import CartelaModal from './CartelaModal';

class CallHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullCallHistory: false,
      showModal: false,
    };
  }

  renderFullHistory() {
    
    const ballHistory = [...this.props.calledBalls].reverse();
    if (this.state.showFullCallHistory) {
      return (
        <div>
          <div className="modal">
            <h4 className="margin-md">Full Call History</h4>
            <div className="x-small-text margin-bottom-lg">Most recent call listed first, left to right, top to bottom.</div>
            <div className="previous-calls notranslate">
              {ballHistory.map(call => (
                <div key={call.number} className={call.color}>
                  <span>{call.letter}{call.number}</span>
                </div>
              ))}
            </div>
            <p>
              <button onClick={() => this.setState({ showFullCallHistory: false })}>Close</button>
            </p>
          </div>
          <div className="modal-backdrop" onClick={(e) => { e.preventDefault(); }}></div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderPreviousCalls() {

    if (this.props.calledBalls && this.props.calledBalls.length > 0) {
      const previousCallList = [...this.props.calledBalls];
      const last5Calls = previousCallList.reverse().slice(1, 6);
      if (last5Calls.length > 0) {
        return (
          <div className="margin-vertical-xlg">
            <h6 className="text-center">Last 5 Calls</h6>
            <div className="previous-calls padding-vertical-xlg notranslate">
              {last5Calls.map(call => (
                <div key={call.number} className={call.color}>
                  <span>{call.letter}{call.number}</span>
                </div>
              ))}
            </div>
            <button className="textOnly x-small-text" onClick={() => this.setState({ showFullCallHistory: true })}>
              show full history <FaHistory />
            </button>
            {this.renderFullHistory()}
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return <div></div>;
    }
  }

  render() {
    
    return (
      <div className="text-center">
        {this.renderPreviousCalls()}
        
        {/* <button onClick={() => this.props.toggleModal()}>Check Cartela</button> */}
        {this.props.showModal  && (
          <CartelaModal
            calledBalls={this.props.calledBalls}
            onClose={() => this.props.toggleModal()} 
            onReset={()=>this.props.toggleEnd()}
            betAmount={this.props.betAmount}
            cardCount={this.props.cardCount}
            totalAmount={this.props.totalAmount}
            selectedCards={this.props.selectedCards}
            manualCut={this.props.manualCut}
            manualEnteredCut={this.props.manualEnteredCut}
            selectedPattern={this.props.selectedPattern}
            selectedPattern2={this.props.selectedPattern2}
 
  
          />
        )}
        
      </div>
    );
  }
}

export default CallHistory;