import React from 'react';

import Drinks from './components/Drinks';
import Filter from './components/Filter';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://cms.pocketbar.app/api',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = {
      drinks: [],
      filteredDrinks: [],
      searchValue: '',
      filterValue: '',
    };
  }

  handleFilterChange(filterValue) {
    const values = filterValue ? filterValue.map((item) => item.value) : [];
    this.setState({
      filterValue: values,
      searchValue: '',
      filteredDrinks: filterValue ? this.state.drinks.filter(drink => {
        let hit = false;
        drink.remaining = 999;
        drink.ingredients.forEach((item) => {
          if (values.includes(item.ingredients[0].id)) {
            hit = true;
          }
        });
        return hit;
      }) : this.state.drinks,
    });
  }

  componentDidMount() {
    client.query({
      query: gql`
        {
          entries (section: "drinks", limit: null, orderBy: "title asc") {
            title
            id
            ... on drinks_drinks_Entry {
              imageUrl
              description
              preparation
              ingredients {
                ... on ingredients_ingredient_BlockType {
                  quantity {
                    quantity
                    unit
                  }
                  ingredients {
                    title
                    id
                  }
                }
              }
            }
          }
        }
      `
    })
    .then(result => this.setState({
      drinks: result.data.entries,
      filteredDrinks: result.data.entries,
    }));
  }

  render() {
    return (
      <div>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <svg height="27" viewBox="0 0 218 27" width="218" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="0%" y1="49.877%" y2="50%"><stop offset="0" stopColor="#38b2ac"/><stop offset="1" stopColor="#2c7a7b"/></linearGradient><path id="b" d="m2.768 26v-7.956h6.768c3.216 0 5.736-.762 7.56-2.286s2.736-3.63 2.736-6.318-.912-4.8-2.736-6.336-4.344-2.304-7.56-2.304h-9.432v25.2zm6.696-10.296h-6.696v-12.6h6.696c2.496 0 4.404.546 5.724 1.638s1.98 2.658 1.98 4.698c0 1.992-.66 3.534-1.98 4.626s-3.228 1.638-5.724 1.638zm25.504 10.512c2.496 0 4.746-.552 6.75-1.656s3.582-2.634 4.734-4.59 1.728-4.146 1.728-6.57-.576-4.614-1.728-6.57-2.73-3.486-4.734-4.59-4.254-1.656-6.75-1.656-4.758.558-6.786 1.674-3.612 2.646-4.752 4.59-1.71 4.128-1.71 6.552.57 4.608 1.71 6.552 2.724 3.474 4.752 4.59 4.29 1.674 6.786 1.674zm0-2.376c-1.992 0-3.798-.45-5.418-1.35s-2.892-2.148-3.816-3.744-1.386-3.378-1.386-5.346.462-3.75 1.386-5.346 2.196-2.844 3.816-3.744 3.426-1.35 5.418-1.35 3.792.45 5.4 1.35 2.868 2.148 3.78 3.744 1.368 3.378 1.368 5.346-.456 3.75-1.368 5.346-2.172 2.844-3.78 3.744-3.408 1.35-5.4 1.35zm28.132 2.376c1.872 0 3.606-.318 5.202-.954s2.946-1.554 4.05-2.754l-1.692-1.692c-1.944 2.016-4.428 3.024-7.452 3.024-1.992 0-3.804-.456-5.436-1.368s-2.91-2.16-3.834-3.744-1.386-3.36-1.386-5.328.462-3.744 1.386-5.328 2.202-2.832 3.834-3.744 3.444-1.368 5.436-1.368c3 0 5.484.996 7.452 2.988l1.692-1.692c-1.104-1.2-2.448-2.112-4.032-2.736s-3.312-.936-5.184-.936c-2.496 0-4.752.552-6.768 1.656s-3.594 2.634-4.734 4.59-1.71 4.146-1.71 6.57.57 4.614 1.71 6.57 2.712 3.486 4.716 4.59 4.254 1.656 6.75 1.656zm15.104-.216v-6.624l5.148-5.22 10.296 11.844h3.168l-11.664-13.788 10.908-11.412h-3.06l-14.796 15.228v-15.228h-2.664v25.2zm38.752 0v-2.304h-15.156v-9.36h13.032v-2.268h-13.032v-8.964h14.616v-2.304h-17.28v25.2zm13.824 0v-22.896h8.856v-2.304h-20.376v2.304h8.856v22.896zm24.52 0c3.288 0 5.79-.594 7.506-1.782s2.574-2.886 2.574-5.094c0-1.56-.408-2.874-1.224-3.942s-1.944-1.83-3.384-2.286c1.056-.552 1.878-1.308 2.466-2.268s.882-2.052.882-3.276c0-2.016-.822-3.612-2.466-4.788s-4.002-1.764-7.074-1.764h-12.312v25.2zm-1.44-14.868h-5.796v-5.94h5.796c1.44 0 2.532.246 3.276.738s1.116 1.23 1.116 2.214-.372 1.728-1.116 2.232-1.836.756-3.276.756zm1.008 10.476h-6.804v-6.228h6.804c3.096 0 4.644 1.044 4.644 3.132 0 1.056-.39 1.836-1.17 2.34s-1.938.756-3.474.756zm16.604 4.392 2.232-5.4h11.7l2.232 5.4h6.12l-11.268-25.2h-5.76l-11.232 25.2zm12.096-9.828h-7.992l3.996-9.648zm17.648 9.828v-7.02h5.364l4.86 7.02h6.264l-5.652-8.1c1.656-.72 2.934-1.758 3.834-3.114s1.35-2.97 1.35-4.842-.444-3.492-1.332-4.86-2.154-2.424-3.798-3.168-3.582-1.116-5.814-1.116h-10.908v25.2zm4.752-11.664h-4.752v-8.784h4.752c1.752 0 3.084.378 3.996 1.134s1.368 1.842 1.368 3.258c0 1.392-.456 2.472-1.368 3.24s-2.244 1.152-3.996 1.152z"/></defs><g fill="none"><use fill="#4e4e4e" xlinkHref="#b"/><use fill="url(#a)" xlinkHref="#b"/></g></svg>
          <div className="flex my-10">
            {/* <div className="flex-1">
              <Search searchValue={this.state.searchValue} onSearchChange={this.handleSearchChange} />
            </div>
            <div className="px-10 flex flex-col items-center">
              <div className="flex-1 border-l"></div>
              <div className="uppercase font-bold">or</div>
              <div className="flex-1 border-l"></div>
            </div> */}
            <div className="flex-1">
              <Filter filterValue={this.state.filterValue} onFilterChange={this.handleFilterChange} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Drinks drinks={this.state.filteredDrinks} filterValue={this.state.filterValue} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
