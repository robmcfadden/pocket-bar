import React from 'react';
import Select from 'react-select';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://cms.pocketbar.app/api',
});

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      options: [],
      selectedOption: null,
    };
  }

  componentDidMount() {
    client.query({
      query: gql`
        {
          entries(section: "ingredients") {
            id
            title
          }
        }
      `
    })
    .then(result => {
      this.setState({
        options: result.data.entries.map((entry) => {
          return {
            value: entry.id,
            label: entry.title,
          }
        }),
      });
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onFilterChange(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <form>
        <label>
          <div className="block text-gray-700 text-sm font-bold mb-2">Find Drinks Based on Ingredients I Have</div>
          <Select
            value={this.props.filterValue ? selectedOption : ''}
            onChange={this.handleChange}
            options={this.state.options}
            placeholder="Add ingredients..."
            isMulti
          />
        </label>
      </form>
    );
  }
}

export default Filter;
