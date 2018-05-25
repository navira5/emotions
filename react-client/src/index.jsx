import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Nav from './components/Nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      emotion: 'My Emotion Will Display Here',
      inputValue:'',
      all: []
    }
    this.submitEntry = this.submitEntry.bind(this)
  }

  submitEntry() {
  
    var entry = this.state.inputValue;
    console.log(entry)

    $.post({
      url: '/entry',
      data: {entry: entry},
      success: (data) => {
        console.log('entry submitted', data)
      },
      error: (err) => {
        console.log('error: ', err);
      }
    })
  }

  changeHandler(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

//life cycle hook right after info get rendered to the DOM, then below gets called, which is an AJAX call
  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  render () {
    return (
    <div>
        <Nav/>
        <textarea name="message" rows="10" cols="30" placeholder='Enter your diary entry' value={this.state.inputValue} onChange={this.changeHandler.bind(this)}/>
        <button onClick={this.submitEntry}>Submit</button>
        <h2>Your Emotion Analysis: {this.state.emotion}</h2>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));