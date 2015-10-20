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
        <div className='result'>
          {this.state.count} / 80
        </div>
        <div className='result'>
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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>基本情報点数チェッカー</h1>
        <div className='desc'>
          <p>2015年秋期基本情報技術者試験の点数確認ができます。
          データ取得元は以下のIPAのホームページです。
          スマホで見るか、タブで移動しスペースで選択していくのが速いと思います。
          </p>
          <a href="https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2015h27.html#27aki">IPA解答例（2015、平成27年）</a>
        </div>
        <Table data={this.props.data} />
        <footer>© 2015 akameco</footer>
      </div>
    );
  }
}

let fe = require('../data/fe.json');
ReactDOM.render(<App data={ fe }/>, document.getElementById('app'));
