import React, { Component } from 'react';
import '../styles/VergiForm.css';
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


class VergiForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      aylikCalismaGunSayisi : 21,
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
      odenecekKdvYillik: 0,
    };
    this.handleChangeGelirGunluk = this.handleChangeGelirGunluk.bind(this);
    this.handleChangeGelirAylik = this.handleChangeGelirAylik.bind(this);
    this.handleChangeGelirYillik = this.handleChangeGelirYillik.bind(this);
    this.handleChangeGider = this.handleChangeGider.bind(this);
  }

  handleChangeGelirGunluk(event) {
    this.setState({gelirKdvsizGunluk: parseInt(event.target.value)}, 
    () => { //callback
      this.setState({gelirKdvGunluk: this.state.gelirKdvsizGunluk*0.18});
      this.setState({gelirKdvliGunluk: this.state.gelirKdvsizGunluk+ this.state.gelirKdvGunluk});
      
      this.setState({gelirKdvsizAylik: this.state.gelirKdvsizGunluk * this.state.aylikCalismaGunSayisi});
      this.setState({gelirKdvAylik: this.state.gelirKdvsizAylik*0.18});
      this.setState({gelirKdvliAylik: this.state.gelirKdvsizAylik+ this.state.gelirKdvAylik});

      this.setState({gelirKdvsizYillik: this.state.gelirKdvsizGunluk * 12});
      this.setState({gelirKdvYillik: this.state.gelirKdvsizYillik*0.18});
      this.setState({gelirKdvliYillik: this.state.gelirKdvsizYillik+ this.state.gelirKdvYillik});
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
    this.setState({giderKdvsiz: parseInt(event.target.value) * 12}, 
    () => { //callback
      this.setState({giderKdv: this.state.giderKdvsiz*0.18});
      this.setState({giderKdvli: this.state.giderKdvsiz+ this.state.giderKdv});
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
              KDV'siz gunluk gelir: <input type="number" onChange={this.handleChangeGelirGunluk} />
            </TableCell>
            <TableCell >          
            KDV'siz aylik gelir:<input type="number" onChange={this.handleChangeGelirAylik} />
          </TableCell>
            <TableCell >          
              KDV'siz yillik gelir: <input type="number" onChange={this.handleChangeGelirYillik} />
          </TableCell>
            <TableCell >          
              Aylık KDV'siz gider: <input type="number" onChange={this.handleChangeGider} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.calories}</TableCell>
              <TableCell >{row.fat}</TableCell>
              <TableCell >{row.carbs}</TableCell>
              <TableCell >{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
      <form>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
      </form>
    </div>
    );
  }
}
export default withStyles(useStyles)(VergiForm);