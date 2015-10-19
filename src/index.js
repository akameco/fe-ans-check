import React from 'react'
import ReactDOM from 'react-dom'

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  _onChange(e) {
    let j = e.target.checked ? 1 : -1;
    this.setState({ count: this.state.count + j });
  }

  render() {
    let tds = this.props.data.map(e => {
      return (
        <tr key={e.num}>
          <td>
            <input type="checkbox" name={e.num} value={e.ans} onChange={this._onChange.bind(this)} />
          </td>
          <td>{e.num}</td>
          <td>{e.ans}</td>
        </tr>
      );
    });

    let point = this.state.count * 100 / 80.0;

    return (
      <div>
        <div>
          {this.state.count} / 80
        </div>
        <div>
          {point}点
        </div>
        <table>
          <tbody>
            {tds}
          </tbody>
        </table>
      </div>
    );
  }
}

let fe = require('../data/fe.json');
ReactDOM.render(<Table data={ fe }/>, document.getElementById('app'));
