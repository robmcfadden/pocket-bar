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
    let ingredients = this.props.entry.ingredients.map((ingredient) => {
      return <div>{ingredient.quantity[0].quantity} {ingredient.quantity[0].unit} {ingredient.ingredients[0].title}</div>;
    });

    return (
      <div>
        <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={this.handleClick}>Make this Drink</button>
        <button
          class="block w-full z-10 fixed inset-0 bg-black opacity-50"
          type="button"
          style={{display: this.state.isOpen ? 'block' : 'none'}}
          onClick={this.handleCloseClick}
        >
          Close
        </button>
        <div
          class="bg-white shadow-md rounded-md overflow-hidden fixed z-20 inset-auto transform -translate-x-1/2 -translate-y-1/2"
          style={{
            display: this.state.isOpen ? 'block' : 'none',
            left: '50%',
            top: '50%',
            width: '20rem',
          }}
        >
          <img className="w-full h-64 object-cover" src={this.props.entry.imageUrl} alt={this.props.entry.title} />
          <div class="p-6">
            <h3 className="font-bold text-xl mb-2">{this.props.entry.title}</h3>
            <h4 className="font-bold text-base text-gray-600">Peparation Instructions</h4>
            <p className="text-gray-700 text-base mb-2">{this.props.entry.preparation}</p>
            <h4 className="font-bold text-base text-gray-600">Ingredients</h4>
            {ingredients}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
