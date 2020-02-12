import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Invoice.css'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Invoice extends Component {
  
  render() {
    const { gelirVergisiYillik,gelirKdvsizYillik,giderKdvYillik,giderKdvAylik } = this.props.results;
    return (
      <div>
        <div> 
          <StyledTableCell>Yıllık Gelir Vergisi</StyledTableCell>
          <StyledTableCell>{gelirVergisiYillik}</StyledTableCell>
        </div>
        <div> 
          <StyledTableCell>Yillik Vergisi Verilmis </StyledTableCell>
          <StyledTableCell>{gelirKdvsizYillik - gelirVergisiYillik}</StyledTableCell>
        </div>
        <div> 
          <StyledTableCell>Aylik Vergisi Verilmis</StyledTableCell>
          <StyledTableCell>{(gelirKdvsizYillik - gelirVergisiYillik) / 12}</StyledTableCell>
        </div>
        <div> 
          <StyledTableCell>Yillik Vergisi Verilmis KDV Geri Odemesi Alinmis</StyledTableCell>
          <StyledTableCell>{gelirKdvsizYillik - gelirVergisiYillik + giderKdvYillik}</StyledTableCell>
        </div>
        <div> 
          <StyledTableCell>Aylik Vergisi Verilmis KDV Geri Odemesi Alinmis</StyledTableCell>
          <StyledTableCell>{(gelirKdvsizYillik - gelirVergisiYillik) / 12 + giderKdvAylik}</StyledTableCell>
        </div>
      </div>
    );
  }
}
export default Invoice;