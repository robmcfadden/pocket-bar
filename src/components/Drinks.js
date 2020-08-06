import React from 'react';

function Drinks(props) {
  let orderedDrinks = props.drinks;
  if (props.filterValue) {
    orderedDrinks = props.drinks.sort(function(a, b) {
      let aRemaining = a.ingredients.filter((item) => {
        return !props.filterValue.includes(item.ingredients[0].id);
      });
      let bRemaining = b.ingredients.filter((item) => {
        return !props.filterValue.includes(item.ingredients[0].id);
      });

      return aRemaining.length - bRemaining.length;
    });
  }

  return orderedDrinks.map((entry) => {
    let remaining = entry.ingredients.filter((item) => {
      return !props.filterValue.includes(item.ingredients[0].id);
    });

    return (
      <div key={entry.id}>
        <div className="max-w-sm h-full mx-auto rounded overflow-hidden shadow-lg bg-white relative">
          {remaining.length > 0 ? <div className="bg-teal-500 text-white absolute right-0 top-0 rounded-b px-3 py-1 mr-2 text-xs">{remaining.length} more needed</div> : ''}
          <img className="w-full h-48 object-cover" src={entry.imageUrl} alt={entry.title} />
          <div className="px-6 py-4">
            <h3 className="font-bold text-xl mb-2">{entry.title}</h3>
            <p className="text-gray-700 text-base">{entry.description}</p>
            <button type="button">Make this Drink</button>
          </div>

          {/* <div style={{display: this.state.popupVisible ? 'block' : 'none'}}>
            popup
            <div className="max-w-sm h-full rounded overflow-hidden shadow-lg bg-white relative">
              <img className="w-full h-48 object-cover" src={props.entry.imageUrl} alt={props.entry.title} />
              <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2">{props.entry.title}</h3>
                <p className="text-gray-700 text-base">{props.entry.description}</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  });
}

export default Drinks;
