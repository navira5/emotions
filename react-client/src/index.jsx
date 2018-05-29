import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Nav from './components/Nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      emotion: [],
      inputValue:'',
      all: [],
      user: '',
      entries: [],
      options: ['Select User']
    }
    this.submitEntry = this.submitEntry.bind(this)
  }

  submitEntry() {

    var user = this.state.user;
    var entry = this.state.inputValue;
  

    $.post({
      url: '/entry',
      data: {entry: entry, user: user},
      success: (data) => {
        console.log('success!', data)
        let options = [...this.state.options]
        if (!this.state.options.includes(user)) {
          options.push(user)
        }
        this.setState({
          emotion: data.tones,
          options
        })

        console.log('state after request', this.state)
        //set-up get request $.get(path...)
        //set up helper function that will set the state with the new data
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

  userChangedHandler(e) {
    console.log('user changed', e, e.target.value)
    this.setState({
      user: e.target.value
    })
  }

  onUserSelected(e) {
    console.log('user selected', e, e.target.value)
    $.ajax({
      type: 'get',
      url: '/items/' + this.state.user,
      data: {
        user: this.state.user
      },
      success: (data) => {
        console.log('success', data)
        this.setState({
          entries: data.entries
        })
      },
      error: err => {
        console.log('error', err)
      }
    })
  }

  render () {
    const emotions = this.state.emotion.map((emotion, index) => {
      return (<p key={index}>{Math.floor(100 * emotion.score)} {emotion.tone_name} <br/></p>)
    })

    const entries = this.state.entries.map((entry, index) => {
      return (
        <div key={index}>
          Entry: {entry.entry}
          Tones: {entry.tone.map((emotion, index) => {
            
            return (<p key={index}> {emotion.tone_name} {Math.floor(100 * emotion.score)}<br /></p>)
          })}
        </div>
      )
    })
    return (
    <div>
        <h2>EMOTIONS DIARY</h2>
        <input
          className="name_input"
          type='text'
          placeholder='Enter your name' value={this.state.user} onChange={this.userChangedHandler.bind(this)} />
        
        <div className="ta-center">
          <textarea
            className="text_box"
            name="message"
            rows="20"
            cols="50"
            placeholder='How was your day?'
            value={this.state.inputValue}
            onChange={this.changeHandler.bind(this)} />
          <button className="submit_button" onClick={this.submitEntry}>Submit</button>
          <h4>Emotion Analysis {emotions}</h4>
        </div>
        <div className="header_name">
          <Nav onUserSelected={this.onUserSelected.bind(this)} options={this.state.options} />
        </div>
      <div className="entries">
        {entries}
      </div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));