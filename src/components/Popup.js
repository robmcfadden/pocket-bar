import React from 'react';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  escFunction(event){
    if (event.keyCode === 27) {
      this.setState({isOpen: false});
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleClick() {
    this.setState({isOpen: true});
  }

  handleCloseClick() {
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div>
        <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={this.handleClick}>Make this Drink</button>
        <button
          class="block w-full z-10 fixed inset-0 bg-black opacity-25"
          type="button"
          style={{display: this.state.isOpen ? 'block' : 'none'}}
          onClick={this.handleCloseClick}
        >
          Close
        </button>
        <div
          class="bg-white rounded-lg p-8 fixed z-20 inset-auto transform -translate-x-1/2 -translate-y-1/2"
          style={{
            display: this.state.isOpen ? 'block' : 'none',
            left: '50%',
            top: '50%',
          }}
        >
          Popup
        </div>
      </div>
    );
  }
}

export default Popup;
