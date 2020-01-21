import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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