import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ReviewTables extends React.Component {

  renderTableRows = (data) => {
    let tableRows = Object.keys(data).map((key, i) => {
      return (
        <TableRow key={key} selectable={false}>
          <TableRowColumn>{key}</TableRowColumn>
          <TableRowColumn>{data[key]}</TableRowColumn>
        </TableRow>
      )
    });

    return tableRows;
  }

  render () {
    return (
      <div className="review-table">
        <h3 className="spacer-small">{this.props.title}</h3>
        <FlatButton label="Edit"
                    onTouchTap={() => this.props.handleEdit(this.props.step)} />
        <Table>
          <TableHeader className="hide" displaySelectAll={false}>
            <TableRow></TableRow>
          </TableHeader>
          <TableBody stripedRows={true}>
            {this.renderTableRows(this.props.data)}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ReviewTables;
