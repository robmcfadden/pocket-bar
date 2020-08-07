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
        <div
          class="fixed z-10 inset-0 flex items-center justify-center"
          style={{
            display: this.state.isOpen ? 'flex' : 'none',
          }}
        >
          <button
            class="block w-full z-10 fixed inset-0 bg-black opacity-50 overflow-auto"
            type="button"
            style={{display: this.state.isOpen ? 'block' : 'none'}}
            onClick={this.handleCloseClick}
          >
            Close
          </button>
          <div
            class="bg-white shadow-md rounded-md overflow-hidden relative z-20"
            style={{
              width: '18rem',
            }}
          >
            <div className="relative">
              <button className="absolute top-0 right-0 mr-4 px-3 pb-1 rounded-b bg-teal-600 text-white text-2xl" type="button" onClick={this.handleCloseClick}>&times;</button>
              <img className="w-full h-54 object-cover" src={this.props.entry.imageUrl} alt={this.props.entry.title} />
            </div>
            <div class="p-6 overflow-auto" style={{ maxHeight: '360px' }}>
              <h3 className="font-bold text-xl mb-2">{this.props.entry.title}</h3>
              <h4 className="font-bold text-base text-gray-600">Peparation Instructions</h4>
              <p className="text-gray-700 text-base mb-2">{this.props.entry.preparation}</p>
              <h4 className="font-bold text-base text-gray-600">Ingredients</h4>
              {ingredients}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
