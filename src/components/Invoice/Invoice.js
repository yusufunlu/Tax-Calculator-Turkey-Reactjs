import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import roundTo from 'round-to'
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@material-ui/core/Switch';
import styles from './mystyle.module.css'; 

class Invoice extends Component {
  
  render() {
    const { gelirVergisiYillik,gelirKdvsizYillik,giderKdvYillik,giderKdvAylik } = this.props.results;
    return (
      <div>
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
          <li className={styles.bigblue}>
            Aylik Vergisi Verilmis KDV Geri Odemesi Alinmis:
            {(gelirKdvsizYillik - gelirVergisiYillik) / 12 + giderKdvAylik}
          </li>
        </ul>
      </div>
    );
  }
}
export default Invoice;