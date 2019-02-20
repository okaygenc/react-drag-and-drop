import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    left: [
      { color: "Green", active: false },
      { color: "Pink", active: false },
      { color: "Yellow", active: false }
    ],
    right: [
      { color: null, active: false },
      { color: null, active: false },
      { color: null, active: false }
    ]
  } 

  onDragStart(e, side, i) {
    e.dataTransfer.setData("text/id", i);
    e.dataTransfer.setData("text/side", side);
  }

  onDrop(e, targetSide, targetI) {
    const sourceI = e.dataTransfer.getData("text/id");
    const sourceSide = e.dataTransfer.getData("text/side");
    
    this.setState(state => {
      const oldTargetColor = state[targetSide][targetI].color;
      state[targetSide][targetI].color = state[sourceSide][sourceI].color;
      state[targetSide][targetI].active = false;
      state[sourceSide][sourceI].color = oldTargetColor;

      return state;
    });
  }

  onDragOver(e, side, i) {
    e.preventDefault();

    this.setState(state => {
      state[side][i].active = true;
      return state;  
    });
  }

  onDragLeave(e, side, i) {
    e.preventDefault();

    this.setState(state => {
      state[side][i].active = false;
      return state;  
    });
  }

  render() {
    return (
      <div className="App">
       <div className="Left">
          {this.state.left.map((box, i) => { return (
            <div key={i} 
              className={box.active ? "bgGrey bgActive" : "bgGrey"} 
              onDragLeave={e => this.onDragLeave(e, "left", i)} 
              onDragOver={e => this.onDragOver(e, "left", i)} 
              onDrop={e => this.onDrop(e, "left", i)}>
              
              {box.color !== null && (
                <div className={"Box Box" + box.color} 
                  draggable
                  onDragStart={e => this.onDragStart(e, "left", i)}
                  ></div>
              )}

            </div>
          )})}
       </div>
       
       <div className="Right">
          {this.state.right.map((box, i) => { return (
            <div key={i} className={box.active ? "bgGrey bgActive" : "bgGrey"} onDragLeave={e => this.onDragLeave(e, "right", i)} onDragOver={e => this.onDragOver(e, "right", i)} onDrop={e => this.onDrop(e, "right", i)}>
              {box.color !== null && <div className={"Box Box" + box.color} 
                draggable
                onDragStart={e => this.onDragStart(e, "right", i)}
                ></div>}
            </div>
          )})}
       </div>
       
      </div>
    );
  }
}

export default App;
