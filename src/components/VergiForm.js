import React, { Component } from 'react';
import '../styles/VergiForm.css';

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
    const { tasks } = this.state;
    return (
      <div>
      <form>
        <label>
          KDV'siz gunluk gelir:
          <input type="number" onChange={this.handleChangeGelirGunluk} />
        </label>
        <label>
          KDV'siz aylik gelir:
          <input type="number" onChange={this.handleChangeGelirAylik} />
        </label>
        <label>
          KDV'siz yillik gelir:
          <input type="number" onChange={this.handleChangeGelirYillik} />
        </label>
        <label>
          Aylık KDV'siz gider:
          <input type="number" onChange={this.handleChangeGider} />
        </label>
        <br></br>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
        <span> Yıllık Gelir: {this.state.gelirKdvli}</span>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}
export default VergiForm;