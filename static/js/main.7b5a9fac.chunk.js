(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{34:function(e,i,t){e.exports=t(48)},48:function(e,i,t){"use strict";t.r(i);var l=t(0),a=t.n(l),r=t(15),s=t.n(r),n=t(9),d=t.n(n),g=t(13),u=t(26),k=t(18),h=t(27),c=t(28),v=t(6),o=t(30),m=t(77),K=t(4),p=t(79),y=t(82),Y=t(78),V=t(80),E=t(81),b=t(84),G=t(14),A=t.n(G),z=t(83),f=t(86),S=t(85),C=Object(m.a)({root:{width:"40%",overflowX:"auto"},table:{minWidth:450}}),D=Object(K.a)((function(e){return{head:{fontSize:16,backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14,backgroundColor:e.palette.common.black,color:e.palette.common.white}}}))(Y.a),H=[{limit:18e3,oran:.15},{limit:4e4,oran:.2},{limit:148e3,oran:.27},{limit:5e5,oran:.35}],O=function(e){function i(e){var t;return Object(u.a)(this,i),(t=Object(h.a)(this,Object(c.a)(i).call(this,e))).handleChange=function(e){t.setValue(e.target.value)},t.state={aylikCalismaGunSayisi:21,odenecekKdvYillik:0,gelirKdvsizGunluk:0,gelirKdvGunluk:0,gelirKdvliGunluk:0,gelirKdvsizAylik:0,gelirKdvAylik:0,gelirKdvliAylik:0,gelirKdvsizYillik:0,gelirKdvYillik:0,gelirKdvliYillik:0,giderKdvsizAylik:0,giderKdvAylik:0,giderKdvliAylik:0,giderKdvsizYillik:0,giderKdvYillik:0,giderKdvliYillik:0,gelirVergisiYillik:0,yillikNetkar:0,aylikNetkar:0,firmaTipi:"sahis"},t.handleChangeGelirGunluk=t.handleChangeGelirGunluk.bind(Object(v.a)(t)),t.handleChangeGelirAylik=t.handleChangeGelirAylik.bind(Object(v.a)(t)),t.handleChangeGelirYillik=t.handleChangeGelirYillik.bind(Object(v.a)(t)),t.handleChangeGiderAylik=t.handleChangeGiderAylik.bind(Object(v.a)(t)),t.handleChangeGiderYillik=t.handleChangeGiderYillik.bind(Object(v.a)(t)),t.gelirVergisiSahisHesapla=t.gelirVergisiSahisHesapla.bind(Object(v.a)(t)),t.gelirVergisiLimitedHesapla=t.gelirVergisiLimitedHesapla.bind(Object(v.a)(t)),t.gelirKDVHesapla=t.gelirKDVHesapla.bind(Object(v.a)(t)),t.giderKDVHesapla=t.giderKDVHesapla.bind(Object(v.a)(t)),t.handleFirmaTipi=t.handleFirmaTipi.bind(Object(v.a)(t)),t}return Object(o.a)(i,e),Object(k.a)(i,[{key:"handleFirmaTipi",value:function(e){var i=this;this.setState({firmaTipi:e.target.value},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.gelirKDVHesapla(),i.gelirVergisiHesapla();case 2:case"end":return e.stop()}}),e)}))))}},{key:"gelirVergisiHesapla",value:function(){"sahis"==this.state.firmaTipi?this.gelirVergisiSahisHesapla():this.gelirVergisiLimitedHesapla()}},{key:"gelirVergisiLimitedHesapla",value:function(){this.setState({yillikNetkar:Math.round(this.state.gelirKdvsizYillik-this.state.giderKdvsizYillik)}),this.setState({gelirVergisiYillik:.22*this.state.yillikNetkar})}},{key:"gelirVergisiSahisHesapla",value:function(){var e=0;return this.setState({yillikNetkar:Math.round(this.state.gelirKdvsizYillik-this.state.giderKdvsizYillik)}),this.state.yillikNetkar>H[0].limit?(e+=H[0].limit*H[0].oran,this.state.yillikNetkar>H[1].limit?(e+=(H[1].limit-H[0].limit)*H[1].oran,this.state.yillikNetkar>H[2].limit?(e+=(H[2].limit-H[1].limit)*H[2].oran,this.state.yillikNetkar>H[3].limit?(e+=(H[3].limit-H[2].limit)*H[3].oran,void this.setState({gelirVergisiYillik:e})):(e+=(this.state.yillikNetkar-H[2].limit)*H[3].oran,void this.setState({gelirVergisiYillik:Math.round(e)}))):(e+=(this.state.yillikNetkar-H[1].limit)*H[2].oran,void this.setState({gelirVergisiYillik:Math.round(e)}))):(e+=(this.state.yillikNetkar-H[0].limit)*H[1].oran,void this.setState({gelirVergisiYillik:Math.round(10*e)/10}))):(e+=this.state.yillikNetkar*H[0].oran,void this.setState({gelirVergisiYillik:Math.round(e)}))}},{key:"gelirKDVHesapla",value:function(){this.setState({gelirKdvGunluk:A()(.18*this.state.gelirKdvsizGunluk,2)}),this.setState({gelirKdvliGunluk:A()(this.state.gelirKdvsizGunluk+this.state.gelirKdvGunluk,2)}),this.setState({gelirKdvAylik:A()(.18*this.state.gelirKdvsizAylik,2)}),this.setState({gelirKdvliAylik:A()(this.state.gelirKdvsizAylik+this.state.gelirKdvAylik,2)}),this.setState({gelirKdvYillik:A()(.18*this.state.gelirKdvsizYillik,2)}),this.setState({gelirKdvliYillik:A()(this.state.gelirKdvsizYillik+this.state.gelirKdvYillik,2)})}},{key:"giderKDVHesapla",value:function(){this.setState({giderKdvAylik:.18*this.state.giderKdvsizAylik}),this.setState({giderKdvliAylik:this.state.giderKdvsizAylik+this.state.giderKdvAylik}),this.setState({giderKdvYillik:12*this.state.giderKdvAylik}),this.setState({giderKdvliYillik:12*this.state.giderKdvliAylik})}},{key:"handleChangeGelirGunluk",value:function(e){var i=this;this.setState({gelirKdvsizGunluk:parseInt(e.target.value)},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.setState({gelirKdvsizYillik:249*i.state.gelirKdvsizGunluk});case 2:return e.next=4,i.setState({gelirKdvsizAylik:i.state.gelirKdvsizYillik/12});case 4:i.gelirKDVHesapla(),i.gelirVergisiHesapla();case 6:case"end":return e.stop()}}),e)}))))}},{key:"handleChangeGelirAylik",value:function(e){var i=this;this.setState({gelirKdvsizAylik:parseInt(e.target.value)},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.setState({gelirKdvsizYillik:12*i.state.gelirKdvsizAylik});case 2:return e.next=4,i.setState({gelirKdvsizGunluk:i.state.gelirKdvsizYillik/249});case 4:i.gelirKDVHesapla(),i.gelirVergisiHesapla();case 6:case"end":return e.stop()}}),e)}))))}},{key:"handleChangeGelirYillik",value:function(e){var i=this;this.setState({gelirKdvsizYillik:parseInt(e.target.value)},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.setState({gelirKdvsizAylik:i.state.gelirKdvsizYillik/12});case 2:return e.next=4,i.setState({gelirKdvsizGunluk:i.state.gelirKdvsizYillik/249});case 4:i.gelirKDVHesapla(),i.gelirVergisiHesapla();case 6:case"end":return e.stop()}}),e)}))))}},{key:"handleChangeGiderAylik",value:function(e){var i=this;this.setState({giderKdvsizAylik:parseInt(e.target.value)},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.setState({giderKdvsizYillik:12*i.state.giderKdvsizAylik});case 2:i.giderKDVHesapla(),i.gelirVergisiHesapla();case 4:case"end":return e.stop()}}),e)}))))}},{key:"handleChangeGiderYillik",value:function(e){var i=this;this.setState({giderKdvsizAylik:parseInt(e.target.value)/12},Object(g.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.setState({giderKdvsizYillik:12*i.state.giderKdvsizAylik});case 2:i.giderKDVHesapla(),i.gelirVergisiHesapla();case 4:case"end":return e.stop()}}),e)}))))}},{key:"componentDidUpdate",value:function(e,i){}},{key:"render",value:function(){var e=this.props.classes;return a.a.createElement("div",null,a.a.createElement(b.a,{className:e.root},a.a.createElement(p.a,{className:e.table,"aria-label":"simple table"},a.a.createElement(V.a,null,a.a.createElement(E.a,null,a.a.createElement(f.a,{"aria-label":"gender",name:"gender1",value:this.state.firmaTipi,onChange:this.handleFirmaTipi},a.a.createElement(S.a,{value:"sahis",control:a.a.createElement(z.a,null),label:"sahis"}),a.a.createElement(S.a,{value:"limited",control:a.a.createElement(z.a,null),label:"limited"})),a.a.createElement(D,null,"Gunluk Gelir"),a.a.createElement(D,null,"Aylik Gelir"),a.a.createElement(D,null,"Yillik gelir"),a.a.createElement(D,null,"Ayl\u0131k gider"),a.a.createElement(D,null,"Y\u0131ll\u0131k gider"))),a.a.createElement(y.a,null,a.a.createElement(E.a,null,a.a.createElement(D,null,"Giri\u015f"),a.a.createElement(Y.a,null,a.a.createElement(Y.a,null,a.a.createElement("input",{type:"number",value:this.state.gelirKdvsizGunluk,onChange:this.handleChangeGelirGunluk}))),a.a.createElement(Y.a,null,a.a.createElement("input",{type:"number",value:this.state.gelirKdvsizAylik,onChange:this.handleChangeGelirAylik})),a.a.createElement(Y.a,null,a.a.createElement("input",{type:"number",value:this.state.gelirKdvsizYillik,onChange:this.handleChangeGelirYillik})),a.a.createElement(Y.a,null,a.a.createElement("input",{type:"number",value:this.state.giderKdvsizAylik,onChange:this.handleChangeGiderAylik})),a.a.createElement(Y.a,null,a.a.createElement("input",{type:"number",value:this.state.giderKdvsizYillik,onChange:this.handleChangeGiderYillik})))),a.a.createElement(y.a,null,a.a.createElement(E.a,null,a.a.createElement(D,null,"KDV"),a.a.createElement(Y.a,null,"G\xfcnl\xfck gelir KDV : ",this.state.gelirKdvGunluk),a.a.createElement(Y.a,null,"Ayl\u0131k gelir KDV: ",this.state.gelirKdvAylik),a.a.createElement(Y.a,null,"Y\u0131ll\u0131k gelir KDV: ",this.state.gelirKdvYillik),a.a.createElement(Y.a,null,"Ayl\u0131k Gider KDV: ",this.state.giderKdvAylik),a.a.createElement(Y.a,null,"Y\u0131ll\u0131k Gider KDV: ",this.state.giderKdvYillik)),a.a.createElement(E.a,null,a.a.createElement(D,null,"KDV'li Toplam"),a.a.createElement(Y.a,null,"G\xfcnl\xfck gelir KDVli : ",this.state.gelirKdvliGunluk),a.a.createElement(Y.a,null,"Ayl\u0131k gelir KDVli: ",this.state.gelirKdvliAylik),a.a.createElement(Y.a,null,"Y\u0131ll\u0131k gelir KDVli: ",this.state.gelirKdvliYillik),a.a.createElement(Y.a,null,"Ayl\u0131k Gider KDVli: ",this.state.giderKdvliAylik),a.a.createElement(Y.a,null,"Y\u0131ll\u0131k Gider KDVli: ",this.state.giderKdvliYillik))))),a.a.createElement("ul",null,a.a.createElement("li",null,"Y\u0131ll\u0131k Gelir Vergisi : ",this.state.gelirVergisiYillik),a.a.createElement("li",null,"Yillik Vergisi Verilmis : ",this.state.gelirKdvsizYillik-this.state.gelirVergisiYillik),a.a.createElement("li",null,"Aylik Vergisi Verilmis : ",(this.state.gelirKdvsizYillik-this.state.gelirVergisiYillik)/12),a.a.createElement("li",null,"Yillik Vergisi Verilmis KDV Geri Odemesi Alinmis:",this.state.gelirKdvsizYillik-this.state.gelirVergisiYillik+this.state.giderKdvYillik),a.a.createElement("li",null,"Aylik Vergisi Verilmis KDV Geri Odemesi Alinmis:",(this.state.gelirKdvsizYillik-this.state.gelirVergisiYillik)/12+this.state.giderKdvAylik)))}}]),i}(l.Component),j=Object(K.a)(C)(O);var w=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(j,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(w,null),document.getElementById("app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.7b5a9fac.chunk.js.map