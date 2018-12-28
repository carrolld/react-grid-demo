import React, { Component } from 'react';
import './App.scss';
import Grid from './Grid';

class App extends Component {
  model_a = { "data": Array.from({length: 50}).map((row, i) => [i + "-1", i + "-2", i + "-3", i + "-4"])};
  model_b = { "data": [
    ["Bacon", "ipsum", "dolor"],
    ["Bacon ipsum dolor amet tri-tip hamburger ham hock, ham capicola biltong brisket frankfurter. Buffalo shankle andouille tail ball tip, picanha fatback shoulder boudin strip steak filet mignon tenderloin ham hock rump. Ham frankfurter corned beef boudin shankle pork tail jerky strip steak kevin spare ribs ham hock shank rump pork loin. Turkey pig pancetta, venison bacon flank hamburger short ribs biltong spare ribs prosciutto porchetta strip steak pork belly.", "lorem", "ipsum"],
    ["Bacon", "ipsum", "dolor"],
  ]};

  render() {
    return (
      <div className="App">
        <Grid 
          columns={["Column 1", "Column 2", "Column 3", "Column 4"]} 
          rows={this.model_a.data}
        />
        <Grid 
          columns={["Column 1", "Column 2", "Column 3"]} 
          rows={this.model_b.data}
        />
      </div>
    );
  }
}

export default App;