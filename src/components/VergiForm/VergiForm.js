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
import Invoice from '../Invoice/Invoice';
import LineChart from '../LineChart/LineChart';
import commonStyles from '../../styles/App.css'; 
import './VergiForm.css'; 

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
    if(event.target.checked !== this.state.firmaTipi) {
      this.setState({firmaTipi: event.target.checked ? "limited":"sahis"},
        async () => {
          this.gelirKDVHesapla();
          this.gelirVergisiHesapla();
        });
    }
  }

  gelirVergisiHesapla() {
    if(this.state.firmaTipi === 'sahis') {
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
    this.setState({gelirKdvsizGunluk: roundTo(parseInt(event.target.value),2)}, 
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
    return (

  <div >
  <div class="container-fluid">
  <div class="row">
    <div class="col-md-4 col-sm-12">
    <Paper>
        <Table aria-label="simple table" className="input-form">
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
              </TableRow>

              <TableRow> 
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Giriş</StyledTableCell>
                <StyledTableCell>KDV</StyledTableCell>
                <StyledTableCell>KDV'li Toplam</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <StyledTableCell>       
                  Gunluk Gelir
                </StyledTableCell>
                <TableCell>       
                <TextField
                  id="standard-name"
                  label="Gunluk KDV'siz Gelir"
                  type="number"
                  value ={this.state.gelirKdvsizGunluk}
                  onChange={this.handleChangeGelirGunluk}
                  margin="normal"
                />
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvGunluk} 
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvliGunluk} 
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>       
                  Aylık Gelir
                </StyledTableCell>
                <TableCell>       
                <TextField
                  id="standard-name"
                  label="Aylık KDV'siz Gelir"
                  type="number"
                  value ={this.state.gelirKdvsizAylik}
                  onChange={this.handleChangeGelirAylik}
                  margin="normal"
                />
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvAylik} 
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvliAylik} 
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>       
                  Yıllık Gelir
                </StyledTableCell>
                <TableCell>       
                <TextField
                  id="standard-name"
                  label="Yıllık KDV'siz Gelir"
                  type="number"
                  value ={this.state.gelirKdvsizYillik}
                  onChange={this.handleChangeGelirYillik}
                  margin="normal"
                />
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvYillik} 
                </TableCell>
                <TableCell>       
                  {this.state.gelirKdvliYillik} 
                </TableCell>
              </TableRow>


              <TableRow>
                <StyledTableCell>          
                  Aylık gider
                </StyledTableCell>
                <TableCell> 
                  <TextField
                    id="standard-name"
                    label="Aylık KDV'siz Gider"
                    type="number"
                    value ={this.state.giderKdvsizAylik}
                    onChange={this.handleChangeGiderAylik}
                    margin="normal"
                  />
                </TableCell>
                <TableCell >          
                  {this.state.giderKdvliAylik}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
              <StyledTableCell>          
                  Yıllık gider
                </StyledTableCell>
                <TableCell> 
                <TextField
                  id="standard-name"
                  label="Yıllık KDV'siz Gelir"
                  type="number"
                  value ={this.state.giderKdvsizYillik}
                  onChange={this.handleChangeGiderYillik}
                  margin="normal"
                />
                </TableCell>
                <TableCell className={commonStyles.bigBlue}>          
                  {this.state.giderKdvliYillik}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        
    </div>
    <div class="col-md-4 col-sm-12">
    <Invoice results={this.state}/>
    </div>
    <div class="col-md-4 col-sm-12">
    <LineChart/>
    </div>
  </div>
</div>

        
    </div>
    );
  }
}
export default VergiForm;