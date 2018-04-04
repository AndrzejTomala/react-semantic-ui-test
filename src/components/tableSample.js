import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Pagination } from 'semantic-ui-react';

class TableSample extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      direction: null,
      column: null,
      totalRecords: 0,
      activePage: 1,
      totalPages: 0,
      itemsPerPage: 20
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        console.log(res.data)
        this.setState({data: res.data, totalRecords: res.data.length, totalPages: res.data.length/this.state.itemsPerPage })
      });
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { column, data, direction, activePage, totalPages, itemsPerPage } = this.state

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'id' ? direction : null} onClick={this.handleSort('id')}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')}>
              Age
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'link' ? direction : null} onClick={this.handleSort('link')}>
              Gender
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage), ({ id, title, url }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{url}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={this.handlePaginationChange} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default TableSample;