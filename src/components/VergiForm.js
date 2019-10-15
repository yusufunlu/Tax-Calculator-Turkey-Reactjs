import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '40%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 450,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    };

    this.handleChangeGelirGunluk = this.handleChangeGelirGunluk.bind(this);
    this.handleChangeGelirAylik = this.handleChangeGelirAylik.bind(this);
    this.handleChangeGelirYillik = this.handleChangeGelirYillik.bind(this);
    this.handleChangeGider = this.handleChangeGider.bind(this);
    this.gelirVergisiHesapla = this.gelirVergisiHesapla.bind(this);
  }

  gelirVergisiHesapla() {
    var vergi = 0;
    if(this.state.yillikNetkar > dilimler[0].limit) {
      vergi += dilimler[0].limit * dilimler[0].oran;
    } else {
      vergi += (this.state.yillikNetkar)  * dilimler[0].oran;
      this.setState({gelirVergisiYillik:vergi});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[1].limit) {
      vergi += (dilimler[1].limit - dilimler[0].limit)  * dilimler[1].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[0].limit)  * dilimler[1].oran;
      this.setState({gelirVergisiYillik:vergi});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[2].limit) {
      vergi += (dilimler[2].limit - dilimler[1].limit)  * dilimler[2].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[1].limit)  * dilimler[2].oran;
      this.setState({gelirVergisiYillik:vergi});
      return ;
    }
    if(this.state.yillikNetkar > dilimler[3].limit) {
      vergi += (dilimler[3].limit - dilimler[2].limit)  * dilimler[3].oran;
    } else {
      vergi += (this.state.yillikNetkar - dilimler[2].limit)  * dilimler[3].oran;
      this.setState({gelirVergisiYillik:vergi});
      return ;
    }
    this.setState({gelirVergisiYillik:vergi});
  }

  handleChangeGelirGunluk(event) {
    this.setState({gelirKdvsizGunluk: parseInt(event.target.value)}, 
    async () => { //callback
      await this.setState({gelirKdvGunluk: this.state.gelirKdvsizGunluk*0.18});
      await this.setState({gelirKdvliGunluk: this.state.gelirKdvsizGunluk+ this.state.gelirKdvGunluk});
      
      await this.setState({gelirKdvsizAylik: this.state.gelirKdvsizGunluk * this.state.aylikCalismaGunSayisi});
      await this.setState({gelirKdvAylik: this.state.gelirKdvsizAylik*0.18});
      await this.setState({gelirKdvliAylik: this.state.gelirKdvsizAylik+ this.state.gelirKdvAylik});

      await this.setState({gelirKdvsizYillik: this.state.gelirKdvsizAylik * 12});
      await this.setState({gelirKdvYillik: this.state.gelirKdvsizYillik*0.18});
      await this.setState({gelirKdvliYillik: this.state.gelirKdvsizYillik+ this.state.gelirKdvYillik});
      await this.setState({yillikNetkar: this.state.gelirKdvsizYillik - this.state.giderKdvsizYillik})
      this.gelirVergisiHesapla();
    });
  }
  handleChangeGelirAylik(event) {
    this.setState({gelirKdvsizGunluk: parseInt(event.target.value)}, 
    () => { //callback
      this.setState({gelirKdvGunluk: this.state.gelirKdvsizGunluk*0.18});
      this.setState({gelirKdvliGunluk: this.state.gelirKdvsizGunluk+ this.state.gelirKdvGunluk});
    });
  }
  handleChangeGelirYillik(event) {
    this.setState({gelirKdvsizGunluk: parseInt(event.target.value)}, 
    () => { //callback
      this.setState({gelirKdvGunluk: this.state.gelirKdvsizGunluk*0.18});
      this.setState({gelirKdvliGunluk: this.state.gelirKdvsizGunluk+ this.state.gelirKdvGunluk});
    });
  }
  handleChangeGider(event) {
    this.setState({giderKdvsizAylik: parseInt(event.target.value)}, 
    async () => { //callback
      await this.setState({giderKdvAylik: this.state.giderKdvsizAylik*0.18});
      await this.setState({giderKdvliAylik: this.state.giderKdvsizAylik+ this.state.giderKdvAylik});

      await this.setState({giderKdvsizYillik: this.state.giderKdvsizAylik * 12});
      await this.setState({giderKdvYillik: this.state.giderKdvAylik * 12});
      await this.setState({giderKdvliYillik: this.state.giderKdvliAylik * 12});
      await this.setState({yillikNetkar: this.state.gelirKdvsizYillik - this.state.giderKdvsizYillik})
      this.gelirVergisiHesapla();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>       
              KDV'siz gunluk gelir: <input type="number" value={this.state.gelirKdvsizGunluk} onChange={this.handleChangeGelirGunluk} />
            </TableCell>
            <TableCell >          
              KDV'siz aylik gelir:<input type="number" value={this.state.gelirKdvsizAylik} onChange={this.handleChangeGelirAylik}/>
            </TableCell>
            <TableCell >          
              KDV'siz yillik gelir: <input type="number" value={this.state.gelirKdvsizYillik} onChange={this.handleChangeGelirYillik} />
            </TableCell>
            <TableCell >          
              Aylık KDV'siz gider: <input type="number" value={this.state.giderKdvsizAylik} onChange={this.handleChangeGider} />
            </TableCell>
            <TableCell >          
              Yıllık KDV'siz gider: <input type="number" value={this.state.giderKdvsizYillik} onChange={this.handleChangeGider} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>       
              Günlük gelir KDV : {this.state.gelirKdvGunluk} 
            </TableCell>
            <TableCell >          
              Aylık gelir KDV: {this.state.gelirKdvAylik}
            </TableCell>
            <TableCell >          
              Yıllık gelir KDV: {this.state.gelirKdvYillik}
            </TableCell>
            <TableCell >          
              Aylık Gider KDV: {this.state.giderKdvAylik}
            </TableCell>
            <TableCell >          
              Yıllık Gider KDV: {this.state.giderKdvYillik}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>       
              Günlük gelir KDVli : {this.state.gelirKdvliGunluk} 
            </TableCell>
            <TableCell >          
              Aylık gelir KDVli: {this.state.gelirKdvliAylik}
            </TableCell>
            <TableCell >          
              Yıllık gelir KDVli: {this.state.gelirKdvliYillik}
            </TableCell>
            <TableCell >          
              Aylık Gider KDVli: {this.state.giderKdvliAylik}
            </TableCell>
            <TableCell >          
              Yıllık Gider KDVli: {this.state.giderKdvliYillik}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
      Yıllık Gelir Vergisi : {this.state.gelirVergisiYillik}
    </div>
    );
  }
}
export default withStyles(useStyles)(VergiForm);