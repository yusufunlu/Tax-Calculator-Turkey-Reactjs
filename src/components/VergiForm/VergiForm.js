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
import Invoice from '../Invoice/Invoice';
import LineChart from '../LineChart/LineChart'

const useStyles = makeStyles({
  root: {
    width: '40%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 450,
  },
});


const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const dilimler = [
  {
    limit : 18000,
    oran : 0.15
  },
  {
    limit : 40000,
    oran : 0.20
  },
  {
    limit : 148000,
    oran : 0.27
  },
  {
    limit : 500000,
    oran : 0.35
  },
]


class VergiForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      aylikCalismaGunSayisi : 21,
      odenecekKdvYillik: 0,

      gelirKdvsizGunluk: 0,
      gelirKdvGunluk: 0,
      gelirKdvliGunluk: 0,
      gelirKdvsizAylik: 0,
      gelirKdvAylik: 0,
      gelirKdvliAylik: 0,
      gelirKdvsizYillik: 0,
      gelirKdvYillik: 0,
      gelirKdvliYillik: 0,

      giderKdvsizAylik: 0,
      giderKdvAylik: 0,
      giderKdvliAylik: 0,
      giderKdvsizYillik: 0,
      giderKdvYillik: 0,
      giderKdvliYillik: 0,

      gelirVergisiYillik: 0,
      yillikNetkar: 0,
      aylikNetkar: 0,
      firmaTipi: 'sahis'
    };

    this.handleChangeGelirGunluk = this.handleChangeGelirGunluk.bind(this);
    this.handleChangeGelirAylik = this.handleChangeGelirAylik.bind(this);
    this.handleChangeGelirYillik = this.handleChangeGelirYillik.bind(this);
    this.handleChangeGiderAylik = this.handleChangeGiderAylik.bind(this);
    this.handleChangeGiderYillik = this.handleChangeGiderYillik.bind(this);
    this.gelirVergisiSahisHesapla = this.gelirVergisiSahisHesapla.bind(this);
    this.gelirVergisiLimitedHesapla = this.gelirVergisiLimitedHesapla.bind(this);
    this.gelirKDVHesapla = this.gelirKDVHesapla.bind(this);
    this.giderKDVHesapla = this.giderKDVHesapla.bind(this);
    this.handleFirmaTipi = this.handleFirmaTipi.bind(this);
  }

  handleFirmaTipi(event) {
    
    if(event.target.checked != this.state.firmaTipi) {
      this.setState({firmaTipi: event.target.checked ? "limited":"sahis"},
        async () => {
          this.gelirKDVHesapla();
          this.gelirVergisiHesapla();
        });
    }
  }

  gelirVergisiHesapla() {
    if(this.state.firmaTipi == 'sahis') {
      this.gelirVergisiSahisHesapla();
    } else {
      this.gelirVergisiLimitedHesapla();
    }
  }

  gelirVergisiLimitedHesapla() {
    this.setState({yillikNetkar : 
      Math.round(this.state.gelirKdvsizYillik - this.state.giderKdvsizYillik)
    });
    this.setState({gelirVergisiYillik:this.state.yillikNetkar * 0.22});
  }

  gelirVergisiSahisHesapla() {
    var vergi = 0;
    this.setState({yillikNetkar : Math.round(this.state.gelirKdvsizYillik - this.state.giderKdvsizYillik)});

    if(this.state.yillikNetkar > dilimler[0].limit) {
      vergi += dilimler[0].limit * dilimler[0].oran;
    } else {
      vergi += (this.state.yillikNetkar)  * dilimler[0].oran;
      this.setState({gelirVergisiYillik:Math.round(vergi)});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[1].limit) {
      vergi += (dilimler[1].limit - dilimler[0].limit)  * dilimler[1].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[0].limit)  * dilimler[1].oran;
      this.setState({gelirVergisiYillik:Math.round(vergi * 10) / 10});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[2].limit) {
      vergi += (dilimler[2].limit - dilimler[1].limit)  * dilimler[2].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[1].limit)  * dilimler[2].oran;
      this.setState({gelirVergisiYillik:Math.round(vergi)});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[3].limit) {
      vergi += (dilimler[3].limit - dilimler[2].limit)  * dilimler[3].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[2].limit)  * dilimler[3].oran;
      this.setState({gelirVergisiYillik:Math.round(vergi)});
      return ;
    }
    this.setState({gelirVergisiYillik:vergi});
  }

  gelirKDVHesapla () {
    this.setState({gelirKdvGunluk: roundTo(this.state.gelirKdvsizGunluk *0.18,2)});
    this.setState({gelirKdvliGunluk: roundTo(this.state.gelirKdvsizGunluk+ this.state.gelirKdvGunluk,2)});
    this.setState({gelirKdvAylik: roundTo(this.state.gelirKdvsizAylik*0.18,2)});
    this.setState({gelirKdvliAylik: roundTo(this.state.gelirKdvsizAylik+ this.state.gelirKdvAylik,2)});
    this.setState({gelirKdvYillik: roundTo(this.state.gelirKdvsizYillik*0.18,2)});
    this.setState({gelirKdvliYillik: roundTo(this.state.gelirKdvsizYillik+ this.state.gelirKdvYillik,2)});  
  }

  giderKDVHesapla () {
    this.setState({giderKdvAylik: this.state.giderKdvsizAylik*0.18});
    this.setState({giderKdvliAylik: this.state.giderKdvsizAylik+ this.state.giderKdvAylik});
    this.setState({giderKdvYillik: this.state.giderKdvAylik * 12});
    this.setState({giderKdvliYillik: this.state.giderKdvliAylik * 12});
  }

  handleChangeGelirGunluk(event) {
    this.setState({gelirKdvsizGunluk: parseInt(event.target.value)}, 
    async () => {
      await this.setState({gelirKdvsizYillik: this.state.gelirKdvsizGunluk * 249});
      await this.setState({gelirKdvsizAylik: this.state.gelirKdvsizYillik / 12});
      
      this.gelirKDVHesapla();
      this.gelirVergisiHesapla();
    });
  }
  
  handleChangeGelirAylik(event) {
    this.setState({gelirKdvsizAylik: parseInt(event.target.value)}, 
    async () => { 
      await this.setState({gelirKdvsizYillik: this.state.gelirKdvsizAylik * 12});
      await this.setState({gelirKdvsizGunluk: this.state.gelirKdvsizYillik / 249});

      this.gelirKDVHesapla();
      this.gelirVergisiHesapla();
    });
  }
  handleChangeGelirYillik(event) {
    this.setState({gelirKdvsizYillik: parseInt(event.target.value)}, 
    async () => { 
      await this.setState({gelirKdvsizAylik: this.state.gelirKdvsizYillik / 12});
      await this.setState({gelirKdvsizGunluk: this.state.gelirKdvsizYillik / 249});

      this.gelirKDVHesapla();
      this.gelirVergisiHesapla();
    });
  }

  handleChangeGiderAylik(event) {
    this.setState({giderKdvsizAylik: parseInt(event.target.value)}, 
    async () => {
      await this.setState({giderKdvsizYillik: this.state.giderKdvsizAylik * 12});
      this.giderKDVHesapla();
      this.gelirVergisiHesapla();
    });
  }
  handleChangeGiderYillik(event) {
    this.setState({giderKdvsizAylik: parseInt(event.target.value) / 12}, 
    async () => {
      await this.setState({giderKdvsizYillik: this.state.giderKdvsizAylik * 12});
      this.giderKDVHesapla();
      this.gelirVergisiHesapla();
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
          <TableRow>
            Sahis
            <Switch
            checked={this.state.firmaTipi =="limited"}
            onChange={this.handleFirmaTipi}
            value={this.state.firmaTipi}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            /> 
            Limited
            <StyledTableCell>       
              Gunluk Gelir
            </StyledTableCell>
            <StyledTableCell>          
              Aylik Gelir
            </StyledTableCell>
            <StyledTableCell>          
              Yillik gelir
            </StyledTableCell>
            <StyledTableCell>          
              Aylık gider
            </StyledTableCell>
            <StyledTableCell>          
              Yıllık gider
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>Giriş</StyledTableCell>
            <TableCell>       
            <TextField
              id="standard-name"
              label="Gunluk KDV'siz Gelir"
              className={classes.textField}
              type="number"
              value ={this.state.gelirKdvsizGunluk}
              onChange={this.handleChangeGelirGunluk}
              margin="normal"
            />
            </TableCell>
            <TableCell> 
            <TextField
              id="standard-name"
              label="Aylık KDV'siz Gelir"
              className={classes.textField}
              type="number"
              value ={this.state.gelirKdvsizAylik}
              onChange={this.handleChangeGelirAylik}
              margin="normal"
            />
            </TableCell>
            <TableCell> 
            <TextField
              id="standard-name"
              label="Yıllık KDV'siz Gelir"
              className={classes.textField}
              type="number"
              value ={this.state.gelirKdvsizYillik}
              onChange={this.handleChangeGelirYillik}
              margin="normal"
            />
            </TableCell>
            <TableCell> 
            <TextField
              id="standard-name"
              label="Yıllık KDV'siz Gelir"
              className={classes.textField}
              type="number"
              value ={this.state.giderKdvsizAylik}
              onChange={this.handleChangeGiderAylik}
              margin="normal"
            />
            </TableCell>
            <TableCell> 
            <TextField
              id="standard-name"
              label="Yıllık KDV'siz Gelir"
              className={classes.textField}
              type="number"
              value ={this.state.giderKdvsizYillik}
              onChange={this.handleChangeGiderYillik}
              margin="normal"
            />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
          <StyledTableCell>KDV</StyledTableCell>
            <TableCell>       
              {this.state.gelirKdvGunluk} 
            </TableCell>
            <TableCell >          
              {this.state.gelirKdvAylik}
            </TableCell>
            <TableCell >          
              {this.state.gelirKdvYillik}
            </TableCell>
            <TableCell >          
              {this.state.giderKdvAylik}
            </TableCell>
            <TableCell >          
              {this.state.giderKdvYillik}
            </TableCell>
          </TableRow>
          <TableRow>
          <StyledTableCell className={styles.bigBlue}>KDV'li Toplam</StyledTableCell>
            <TableCell>       
              {this.state.gelirKdvliGunluk} 
            </TableCell>
            <TableCell >          
              {this.state.gelirKdvliAylik}
            </TableCell>
            <TableCell >          
              {this.state.gelirKdvliYillik}
            </TableCell>
            <TableCell >          
              {this.state.giderKdvliAylik}
            </TableCell>
            <TableCell className={styles.bigBlue}>          
              {this.state.giderKdvliYillik}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </Paper>
      <Invoice results={this.state}/>
      <LineChart/>
    </div>
    );
  }
}
export default withStyles(useStyles)(VergiForm);