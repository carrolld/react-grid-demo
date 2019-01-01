import React, { Component } from 'react';
import './App.scss';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid
          columns={[
            { name: "column1", label: "Column 1" },
            { name: "column2", label: "Column 2" },
            { name: "column3", label: "Column 3" },
            { name: "column4", label: "Column 4" },
          ]}
          data={Array.from({length: 50}).map((row, i) => [i + "-1", i + "-2", i + "-3", i + "-4"])}
        />
        <Grid
          columns={[
            { name: "column1", label: "Distance" },
            { name: "column2", label: "Name" },
            { name: "column3", label: "Moons" },
          ]}
          data={[
            ["1", "Mercury", "0"],
            ["2", "Venus", "0"],
            ["3", "Earth", "1"],
            ["4", "Mars", "2"],
            ["5", "Jupiter", "4"],
            ["6", "Saturn", "8"],
            ["7", "Uranus", "5"],
            ["8", "Neptune", "1"],
            ["9", "Pluto", "1"],
          ]}
        />
      </div>
    );
  }
}

export default App;