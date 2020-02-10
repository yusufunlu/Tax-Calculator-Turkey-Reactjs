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
        <StyledTableCell>Yıllık Gelir Vergisi</StyledTableCell>
        <StyledTableCell>{gelirVergisiYillik}</StyledTableCell>
        <StyledTableCell>Yıllık Gelir Vergisi</StyledTableCell>
        <StyledTableCell>{gelirKdvsizYillik - gelirVergisiYillik}</StyledTableCell>
        <StyledTableCell>Yıllık Gelir Vergisi</StyledTableCell>
        <StyledTableCell>{(gelirKdvsizYillik - gelirVergisiYillik) / 12}</StyledTableCell>
        <StyledTableCell>Yıllık Gelir Vergisi</StyledTableCell>
        <StyledTableCell>{gelirKdvsizYillik - gelirVergisiYillik + giderKdvYillik}</StyledTableCell>
        <ul>
          <li>
            Yıllık Gelir Vergisi : {gelirVergisiYillik}
          </li>
          <li>
            Yillik Vergisi Verilmis : {gelirKdvsizYillik - gelirVergisiYillik}
          </li>
          <li>
            Aylik Vergisi Verilmis : {(gelirKdvsizYillik - gelirVergisiYillik) / 12}
          </li>
          <li>
            Yillik Vergisi Verilmis KDV Geri Odemesi Alinmis: 
            {gelirKdvsizYillik - gelirVergisiYillik + giderKdvYillik}
          </li>
          <li>
            Aylik Vergisi Verilmis KDV Geri Odemesi Alinmis:
            {(gelirKdvsizYillik - gelirVergisiYillik) / 12 + giderKdvAylik}
          </li>
        </ul>
      </div>
    );
  }
}
export default Invoice;