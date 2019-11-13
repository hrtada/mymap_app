(function(e){function t(t){for(var n,s,o=t[0],l=t[1],u=t[2],d=0,m=[];d<o.length;d++)s=o[d],r[s]&&m.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);c&&c(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},1:function(e,t){},2:function(e,t){},"22de":function(e,t,a){"use strict";var n=a("25be"),r=a.n(n);r.a},"25be":function(e,t,a){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("header",{staticClass:"hero is-primary"},[a("div",{staticClass:"hero-header"},[a("div",{staticClass:"container"},[a("div",{staticClass:"level"},[a("h1",{staticClass:"title"},[e._v("MyMapアプリ")]),a("div",{staticClass:"level-right"},[a("p",{staticClass:"navbar-item"},[e._v(e._s(this.$store.state.userName))]),a("button",{staticClass:"button is-outlined",attrs:{id:"logout"},on:{click:function(t){return e.logout()}}},[e._v("logout")])])])])])]),a("div",{attrs:{id:"content"}},[a("router-view")],1)])},i=[],s=(a("92c6"),a("8aa5")),o=a.n(s),l={name:"app",created:function(){console.log("app created")},mounted:function(){console.log("app mounted"),console.log(this.$store.state.userUid)},methods:{logout:function(){var e=this;o.a.auth().signOut().then(function(){e.$router.push({path:"/login"})}),this.$store.commit("setuserUid",{userUid:""}),this.$store.commit("setuserName",{userName:""})}},watch:{$route:function(e,t){e.path!==t.path&&(console.log("login check"),console.log(this.$store.state.userUid),this.$store.state.userUid||this.$router.push({path:"/login"}))}}},u=l,c=a("2877"),d=Object(c["a"])(u,r,i,!1,null,null,null),m=d.exports,p=a("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("body",{staticClass:"layout-default"},[n("section",{staticClass:"hero is-fullheight is-medium is-primary"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container"},[n("div",{staticClass:"columns is-centered"},[n("article",{staticClass:"card is-rounded"},[n("div",{staticClass:"card-content"},[n("h1",{staticClass:"is-size-4 has-text-weight-bold"},[e._v(" Login")]),n("button",{on:{click:function(t){return e.login()}}},[n("img",{attrs:{src:a("baed"),alt:"ログインする"}})])])])])])])])])])},g=[],f=(a("96cf"),a("3b8d")),v=a("59ca"),b=(a("e71f"),a("ea7b"),{apiKey:"AIzaSyAGOB6BSOtrSwkcAr8uA4HeIlZk29AdYsU",authDomain:"mtfirebaseproject-64e86.firebaseapp.com",databaseURL:"https://mtfirebaseproject-64e86.firebaseio.com",projectId:"mtfirebaseproject-64e86",storageBucket:"mtfirebaseproject-64e86.appspot.com",messagingSenderId:"969784300164",appId:"1:969784300164:web:fddc0f90fc2a0916"}),w=null;v["apps"].length||(w=v["initializeApp"](b));var k=w,x=a("d225"),y=a("b0b4"),C=a("bec2"),_="https://achieved-property.glitch.me/",L=function(){function e(){Object(x["a"])(this,e),this.storage=k.storage()}return Object(y["a"])(e,[{key:"getLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=[],a={url:_+"labelget",method:"GET",json:!0},e.prev=2,e.next=5,C.doRequest(a);case 5:for(n=e.sent,r=0;r<n.length;r++)t.push({id:n[r].labelId,name:n[r].labelName});return e.abrupt("return",t);case 10:throw e.prev=10,e.t0=e["catch"](2),e.t0;case 13:case"end":return e.stop()}},e,null,[[2,10]])}));function t(){return e.apply(this,arguments)}return t}()},{key:"updateLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={url:_+"labelupdate",method:"POST",timeout:5e3,form:{labelId:t,labelName:a}},e.prev=1,e.next=4,C.doRequest(n);case 4:return e.abrupt("return",!0);case 7:throw e.prev=7,e.t0=e["catch"](1),e.t0;case 10:case"end":return e.stop()}},e,null,[[1,7]])}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"addLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={url:_+"labeladd",method:"POST",timeout:5e3,form:{userId:a,labelName:t}},e.prev=1,e.next=4,C.doRequest(n);case 4:return e.abrupt("return",!0);case 7:throw e.prev=7,e.t0=e["catch"](1),e.t0;case 10:case"end":return e.stop()}},e,null,[[1,7]])}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getdelLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t){var a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a={url:_+"labeldelete",method:"POST",timeout:5e3,form:{labelId:t}},e.prev=1,e.next=4,C.doRequest(a);case 4:return n=e.sent,e.abrupt("return",n);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"searchByDelLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=[],a={url:_+"labeldelete",method:"GET",json:!0},e.prev=2,e.next=5,C.doRequest(a);case 5:for(n=e.sent,r=0;r<n.length;r++)t.push({id:n[r].id,imageUrl:n[r].imageUrl,imageName:n[r].imageName,userId:n[r].userId});return e.abrupt("return",t);case 10:throw e.prev=10,e.t0=e["catch"](2),e.t0;case 13:case"end":return e.stop()}},e,null,[[2,10]])}));function t(){return e.apply(this,arguments)}return t}()},{key:"deleteLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t={url:_+"labeldeleterun",method:"POST",timeout:5e3},e.prev=1,e.next=4,C.doRequest(t);case 4:return e.abrupt("return",!0);case 7:throw e.prev=7,e.t0=e["catch"](1),e.t0;case 10:case"end":return e.stop()}},e,null,[[1,7]])}));function t(){return e.apply(this,arguments)}return t}()}]),e}(),R=a("bec2"),N="https://achieved-property.glitch.me/",U=function(){function e(){Object(x["a"])(this,e)}return Object(y["a"])(e,[{key:"sendtoUser",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a={url:N,method:"POST",timeout:5e3,form:{userUid:t}},e.prev=1,e.next=4,R.doRequest(a);case 4:return e.abrupt("return",!0);case 7:throw e.prev=7,e.t0=e["catch"](1),e.t0;case 10:case"end":return e.stop()}},e,null,[[1,7]])}));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),O={data:function(){return{}},methods:{login:function(){var e=this;k.auth().onAuthStateChanged(function(e){e&&console.log(e)}),this.provider=new v["auth"].GoogleAuthProvider,this.provider.addScope("https://www.googleapis.com/auth/contacts.readonly"),k.auth().signInWithPopup(this.provider).then(function(t){var a=t.user,n=a.uid,r=a.displayName;e.$store.commit("setuserUid",{userUid:n}),e.$store.commit("setuserName",{userName:r}),console.log(e.$store.state.userUid);var i=new U;i.sendtoUser(n),e.getLabellist(),e.$router.push({path:"/"})}).catch(function(e){var t=e.code,a=e.message;console.log(t+" : "+a)})},getLabellist:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=new L,e.next=3,t.getLabel();case 3:a=e.sent,this.$store.commit("setlabel",{label:a}),console.log(a);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},j=O,$=Object(c["a"])(j,h,g,!1,null,null,null),I=$.exports,P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("nav",{staticClass:"uk-navbar-container",attrs:{"uk-navbar":""}},[a("div",{staticClass:"uk-navbar-left"},[a("ul",{staticClass:"uk-navbar-nav"},[a("li",[a("a",{attrs:{href:"#"}},[e._v("条件指定")]),a("div",{staticClass:"uk-navbar-dropdown"},[a("ul",{staticClass:"uk-nav uk-navbar-dropdown-nav uk-list"},[a("p",{staticClass:"has-text-weight-bold"},[e._v("ラベルの選択")]),e._l(e.label,function(t){return a("li",{key:t.id},[a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"radio",name:"label"},domProps:{value:t.id,checked:e._q(e.checked,t.id)},on:{change:function(a){e.checked=t.id}}}),e._v("\n                  "+e._s(t.name)+"\n                ")])])}),a("p",{staticClass:"has-text-weight-bold"},[e._v("日付")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.startDate,expression:"startDate"}],staticClass:"input is-small",attrs:{type:"date"},domProps:{value:e.startDate},on:{input:function(t){t.target.composing||(e.startDate=t.target.value)}}}),e._v("\n              ～\n              "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.endDate,expression:"endDate"}],staticClass:"input is-small",attrs:{type:"date"},domProps:{value:e.endDate},on:{input:function(t){t.target.composing||(e.endDate=t.target.value)}}}),a("button",{staticClass:"button is-link is-small",on:{click:function(t){return e.show()}}},[e._v("表示")])],2)])]),a("li",[a("a",{attrs:{href:"#"}},[e._v("ラベル編集")]),a("div",{staticClass:"uk-navbar-dropdown uk-navbar-dropdown-width-2"},[a("ul",{staticClass:"uk-nav uk-navbar-dropdown-nav"},[a("label-mnt")],1)])])])])]),a("div",{attrs:{id:"map"}}),a("div",{attrs:{id:"iw_wrapper"}},[a("div",{attrs:{id:"infowindw_new"}},[a("button",{on:{click:function(t){return e.create()}}},[e._v("新規登録")])]),a("div",{attrs:{id:"infowindw_get"}},[a("button",{on:{click:function(t){return e.edit()}}},[e._v("詳細表示")])])])])},M=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hero is-primary"},[a("div",{staticClass:"hero-header"})])}],D=function(){function e(t){Object(x["a"])(this,e),this.el=t;var a=new google.maps.LatLng(35.708194,139.808565);this.map=new google.maps.Map(t,{center:a,zoom:15,maxZoom:15,streetViewControl:!1,mapTypeControl:!1,fullscreenControl:!1}),this.bounds=new google.maps.LatLngBounds}return Object(y["a"])(e,[{key:"getMapInstance",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.map);case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"setCurrentPosition",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:navigator.geolocation.getCurrentPosition(function(e){var a={lat:e.coords.latitude,lng:e.coords.longitude};t.map.setCenter(a)});case 1:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}()},{key:"makeMaker",value:function(e){var t=e.lat,a=e.lng,n=e.clickFunction,r=new google.maps.LatLng(t,a),i=new google.maps.Marker({position:r,map:this.map,animation:google.maps.Animation.DROP});return this.bounds.extend(i.position),i.addListener("click",function(){n(i)}),i}}]),e}(),S=a("8323"),F=a.n(S),T=a("263c"),E=a.n(T),q=(a("8be8"),a("30b0"),a("bec2")),A="https://achieved-property.glitch.me/",G=function(){function e(){Object(x["a"])(this,e),this.storage=k.storage()}return Object(y["a"])(e,[{key:"create",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={url:A+"pointcreate",method:"POST",timeout:5e3,form:{id:a.id,lat:a.lat,lng:a.lng,labelId:a.label,date:a.date,memo:a.memo,imageUrl:a.imageUrl,imageName:a.imageName,userId:t}},e.prev=1,e.next=4,q.doRequest(n);case 4:return r=e.sent,e.abrupt("return",r);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"update",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={url:A+"pointupdate",method:"POST",timeout:5e3,form:{id:a.id,lat:a.lat,lng:a.lng,labelId:a.label,date:a.date,memo:a.memo,imageUrl:a.imageUrl,imageName:a.imageName,userId:t}},e.prev=1,e.next=4,q.doRequest(n);case 4:return r=e.sent,e.abrupt("return",r);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"delete",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t){var a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a={url:A+"pointdelete",method:"POST",timeout:5e3,form:{id:t}},e.prev=1,e.next=4,q.doRequest(a);case 4:return n=e.sent,e.abrupt("return",n);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"sendtoLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a,n,r){var i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i={url:A+"pointserch",method:"POST",timeout:5e3,form:{checkedLabel:t,userId:a,startDate:n,endDate:r}},e.prev=1,e.next=4,q.doRequest(i);case 4:return s=e.sent,e.abrupt("return",s);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t,a,n,r){return e.apply(this,arguments)}return t}()},{key:"searchByLabel",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=[],a={url:A+"pointserch",method:"GET",json:!0},e.prev=2,e.next=5,q.doRequest(a);case 5:for(n=e.sent,r=0;r<n.length;r++)t.push({id:n[r].id,lat:n[r].lat,lng:n[r].lng,label:n[r].labelId,date:n[r].date,memo:n[r].memo,imageUrl:n[r].imageUrl,imageName:n[r].imageName});return e.abrupt("return",t);case 10:throw e.prev=10,e.t0=e["catch"](2),e.t0;case 13:case"end":return e.stop()}},e,null,[[2,10]])}));function t(){return e.apply(this,arguments)}return t}()},{key:"sendtoLatlng",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(t,a,n){var r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r={url:A+"pointdetail",method:"POST",timeout:5e3,form:{userId:t,lat:a,lng:n}},e.prev=1,e.next=4,q.doRequest(r);case 4:return i=e.sent,e.abrupt("return",i);case 8:throw e.prev=8,e.t0=e["catch"](1),e.t0;case 11:case"end":return e.stop()}},e,null,[[1,8]])}));function t(t,a,n){return e.apply(this,arguments)}return t}()},{key:"showPointDetail",value:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=[],a={url:A+"pointdetail",method:"GET",json:!0},e.prev=2,e.next=5,q.doRequest(a);case 5:for(n=e.sent,r=0;r<n.length;r++)t.push({id:n[r].id,lat:n[r].lat,lng:n[r].lng,label:n[r].labelId,date:n[r].date,memo:n[r].memo,imageUrl:n[r].imageUrl,imageName:n[r].imageName});return e.abrupt("return",t);case 10:throw e.prev=10,e.t0=e["catch"](2),e.t0;case 13:case"end":return e.stop()}},e,null,[[2,10]])}));function t(){return e.apply(this,arguments)}return t}()},{key:"uploadImage",value:function(e,t,a){return new Promise(function(n,r){var i=k.storage().ref(),s=i.child("".concat(e,"/").concat(t)),o="";s.put(a).then(function(e){e.ref.getDownloadURL().then(function(e){o=e}).then(function(){console.log("success upload image"),n(o)}).catch(function(){console.error("Error upload image"),r()})})})}},{key:"deleteImage",value:function(e,t){try{var a=k.storage().ref(),n=a.child("".concat(e,"/").concat(t));n.delete(),console.log("Success Delete image")}catch(r){console.log("Error Delete Image")}}}]),e}(),B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("p",{staticClass:"has-text-weight-bold"},[e._v("ラベルの追加")]),a("div",{staticClass:"field is-grouped"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.addLabelName,expression:"addLabelName"}],staticClass:"input is-small",attrs:{type:"text",placeholder:"ラベルを入力してください"},domProps:{value:e.addLabelName},on:{input:function(t){t.target.composing||(e.addLabelName=t.target.value)}}}),a("button",{staticClass:"button is-link is-small",on:{click:function(t){return e.add()}}},[e._v("追加")])]),a("p",{staticClass:"has-text-weight-bold"},[e._v("ラベルの編集・削除")]),a("div",{staticClass:"field is-grouped"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.editLabelName,expression:"editLabelName"}],staticClass:"input is-small",attrs:{type:"text",placeholder:"選択したラベルを表示"},domProps:{value:e.editLabelName},on:{input:function(t){t.target.composing||(e.editLabelName=t.target.value)}}}),a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link is-small",on:{click:function(t){return e.entry()}}},[e._v("変更")])]),a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link is-small",on:{click:function(t){return e.del()}}},[e._v("削除")])])]),a("ul",{staticClass:"uk-list"},e._l(e.label,function(t,n){return a("li",{key:t.id},[e._v("\n               "+e._s(t.name)+"\n              "),a("button",{staticClass:"button is-small is-rounded is-outlined",on:{click:function(t){return e.edit(n)}}},[e._v("選択")])])}),0)])},z=[];a("7f7f");F.a.use(E.a);var J={name:"label-mnt",data:function(){return{editLabelName:"",editLabelId:"",addLabelName:""}},computed:{label:function(){return this.$store.getters.label}},mounted:function(){this.getLabellist()},methods:{getLabellist:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=new L,e.next=3,t.getLabel();case 3:a=e.sent,this.$store.commit("setlabel",{label:a}),console.log(a);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""!=this.addLabelName){e.next=4;break}alert("名前を入力してください"),e.next=9;break;case 4:return t=new L,e.next=7,t.addLabel(this.addLabelName,this.$store.state.userUid);case 7:a=e.sent,1==a?(this.getLabellist(),this.addLabelName=""):alert("登録できませんでした");case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),edit:function(e){this.editLabelName=this.label[e].name,this.editLabelId=this.label[e].id},entry:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""!=this.editLabelName){e.next=4;break}alert("名前を入力してください"),e.next=9;break;case 4:return t=new L,e.next=7,t.updateLabel(this.editLabelId,this.editLabelName);case 7:a=e.sent,1==a?(this.getLabellist(),this.editLabelName=""):alert("登録できませんでした");case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),del:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r,i,s,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=new L,a=new G,e.next=4,t.getdelLabel(this.editLabelId);case 4:return e.next=6,t.searchByDelLabel();case 6:if(n=e.sent,!(n.length>0)){e.next=16;break}if(r=confirm("このラベルを使用したポイントが存在します。\n削除してもよろしいですか。"),!r){e.next=14;break}return e.next=12,t.deleteLabel();case 12:if(i=e.sent,1==i)for(this.getLabellist(),this.editLabelName="",s=0;s<n.length;s++)""!=n[s].imageName&&a.deleteImage(n[s].userId,n[s].imageName);case 14:e.next=20;break;case 16:return e.next=18,t.deleteLabel();case 18:o=e.sent,1==o&&(this.getLabellist(),this.editLabelName="");case 20:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),chancel:function(){this.$router.push({path:"/"})}}},W=J,Z=Object(c["a"])(W,B,z,!1,null,null,null),H=Z.exports;F.a.use(E.a);var K={data:function(){return{myGoogleMap:null,map:null,bounds:null,Makers:[],checked:null,startDate:null,endDate:null}},components:{LabelMnt:H},computed:{lat:function(){return this.$store.getters.lat},lng:function(){return this.$store.getters.lng},label:function(){return this.$store.getters.label}},created:function(){console.log(this.$store.state.userUid)},mounted:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.myGoogleMap=new D(document.getElementById("map")),e.next=3,this.myGoogleMap.getMapInstance();case 3:this.map=e.sent,this.myGoogleMap.setCurrentPosition(),this.map.addListener("click",function(e){t.myGoogleMap.makeMaker({lat:e.latLng.lat(),lng:e.latLng.lng(),clickFunction:t.markerClick})});case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{create:function(){this.$router.push({path:"/pointcreate"})},edit:function(){this.$router.push({path:"/pointedit"})},show:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(null!=this.checked){e.next=4;break}alert("ラベルを選択してください。"),e.next=11;break;case 4:return t=new G,e.next=7,t.sendtoLabel(this.checked,this.$store.state.userUid,this.startDate,this.endDate);case 7:return e.next=9,t.searchByLabel();case 9:if(a=e.sent,0==a.length)alert("表示するデータがありません");else{if(this.Makers.length>0){for(n=0;n<this.Makers.length;n++)this.Makers[n].setMap(null);this.Makers=[]}for(r=0;r<a.length;r++)i=this.myGoogleMap.makeMaker({lat:a[r].lat,lng:a[r].lng,clickFunction:this.markerClick}),this.Makers.push(i),this.map.fitBounds(this.bounds)}case 11:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),markerClick:function(e){var t=new google.maps.InfoWindow({content:document.getElementById("infowindw_get")});t.open(this.map,e);var a=e.getPosition().lat(),n=e.getPosition().lng();this.$store.commit("setlat",{lat:a}),this.$store.commit("setlng",{lng:n})},labelMnt:function(){this.$router.push({path:"/labelmnt"})}}},V=K,Y=(a("22de"),Object(c["a"])(V,P,M,!1,null,null,null)),Q=Y.exports,X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"columns"},[a("div",{staticClass:"column is-4 is-offset-4"},[a("p",{staticClass:"title is-4"},[e._v("新しいポイントの作成")]),a("div",{staticClass:"field"},[e._m(0),a("div",{staticClass:"control"},[a("div",{staticClass:"select"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.setLabel,expression:"setLabel"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.setLabel=t.target.multiple?a:a[0]}}},e._l(e.label,function(t){return a("option",{key:t.id,domProps:{value:t.id}},[e._v(" "+e._s(t.name)+"\n                ")])}),0)])])]),a("div",{staticClass:"field"},[e._m(1),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.date,expression:"date"}],staticClass:"input",attrs:{type:"date"},domProps:{value:e.date},on:{input:function(t){t.target.composing||(e.date=t.target.value)}}})])]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("メモ")]),a("div",{staticClass:"control"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.memo,expression:"memo"}],staticClass:"textarea",attrs:{placeholder:"メモ"},domProps:{value:e.memo},on:{input:function(t){t.target.composing||(e.memo=t.target.value)}}})])]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("写真")]),a("div",{staticClass:"control"},[a("input",{attrs:{type:"file",accept:"image/*"},on:{change:function(t){return e.onFileChange(t)}}}),e.imageUrl?a("img",{attrs:{src:e.imageUrl}}):e._e()])]),a("div",{staticClass:"field is-grouped"},[a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link",on:{click:function(t){return e.entry()}}},[e._v("登録")])]),a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link",on:{click:function(t){return e.chancel()}}},[e._v("ｷｬﾝｾﾙ")])])])])])])},ee=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"label"},[e._v("ラベル"),a("span",{staticClass:"has-text-danger is-size-7"},[e._v(" 必須")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"label"},[e._v("日付"),a("span",{staticClass:"has-text-danger is-size-7"},[e._v(" 必須")])])}],te=function e(t,a,n,r,i,s,o,l){Object(x["a"])(this,e),this.id=t,this.lat=a,this.lng=n,this.label=r,this.date=i,this.memo=s,this.imageUrl=o,this.imageName=l},ae={data:function(){return{setLabel:"",date:"",memo:"",imageName:"",imageUrl:"",imageFile:""}},computed:{label:function(){return this.$store.getters.label}},methods:{open:function(){this.$router.push({path:"/picture"})},chancel:function(){this.$router.push({path:"/"})},onFileChange:function(e){var t=this,a=new Date,n=a.toISOString(),r=e.target.files;if(r.length>0){this.imageFile=r[0],this.imageName=n;var i=new FileReader;i.onload=function(e){t.imageUrl=e.target.result},i.readAsDataURL(this.imageFile)}else this.imageName="",this.imageUrl="",this.imageFile=""},entry:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""!=this.setLabel){e.next=4;break}alert("必須項目が未入力です"),e.next=17;break;case 4:if(""!=this.date){e.next=8;break}alert("必須項目が未入力です"),e.next=17;break;case 8:if(t=new G,!(this.imageUrl.length>0)){e.next=14;break}return e.next=12,t.uploadImage(this.$store.state.userUid,this.imageName,this.imageFile);case 12:a=e.sent,this.imageUrl=a;case 14:n=new te(0,this.$store.state.lat,this.$store.state.lng,this.setLabel,this.date,this.memo,this.imageUrl,this.imageName),t.create(this.$store.state.userUid,n),this.$router.push({path:"/"});case 17:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},ne=ae,re=Object(c["a"])(ne,X,ee,!1,null,null,null),ie=re.exports,se=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"columns"},[a("div",{staticClass:"column is-4 is-offset-4"},[a("p",{staticClass:"title is-4"},[e._v("ポイント詳細")]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("ラベル")]),a("div",{staticClass:"control"},[a("div",{staticClass:"select"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.setLabel,expression:"setLabel"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.setLabel=t.target.multiple?a:a[0]}}},e._l(e.label,function(t){return a("option",{key:t.id,domProps:{value:t.id}},[e._v(" "+e._s(t.name)+"\n                ")])}),0)])])]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("日付")]),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.date,expression:"date"}],staticClass:"input",attrs:{type:"date"},domProps:{value:e.date},on:{input:function(t){t.target.composing||(e.date=t.target.value)}}})])]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("メモ")]),a("div",{staticClass:"control"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.memo,expression:"memo"}],staticClass:"textarea",attrs:{placeholder:"メモ"},domProps:{value:e.memo},on:{input:function(t){t.target.composing||(e.memo=t.target.value)}}})])]),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("写真")]),a("div",{staticClass:"control"},[a("input",{attrs:{type:"file",accept:"image/*"},on:{change:function(t){return e.onFileChange(t)}}}),e.imageUrl?a("img",{attrs:{src:e.imageUrl}}):e._e()])]),a("div",{staticClass:"field is-grouped"},[a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link",attrs:{input:"",type:"reset"},on:{click:function(t){return e.entry()}}},[e._v("登録")])]),a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link",on:{click:function(t){return e.chancel()}}},[e._v("ｷｬﾝｾﾙ")])]),a("div",{staticClass:"control"},[a("button",{staticClass:"button is-link",on:{click:function(t){return e.dell()}}},[e._v("削除")])])])])])])},oe=[],le={data:function(){return{setLabel:"",date:"",memo:"",lat:"",lng:"",imageName:"",imageUrl:"",imageFile:"",imageName_old:"",id:""}},computed:{label:function(){return this.$store.getters.label}},mounted:function(){var e=this,t=function(){var t=Object(f["a"])(regeneratorRuntime.mark(function t(){var a,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=new G,t.next=3,a.sendtoLatlng(e.$store.state.userUid,e.$store.state.lat,e.$store.state.lng);case 3:return t.next=5,a.showPointDetail();case 5:n=t.sent,console.log("リスト",n),e.setLabel=n[0].label,e.memo=n[0].memo,e.date=n[0].date,e.lat=n[0].lat,e.lng=n[0].lng,e.imageUrl=n[0].imageUrl,e.imageUrl_old=n[0].imageUrl,e.imageName=n[0].imageName,e.imageName_old=n[0].imageName,e.id=n[0].id;case 17:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();t()},methods:{open:function(){this.$router.push({path:"/picture"})},chancel:function(){this.$router.push({path:"/"})},onFileChange:function(e){var t=this,a=e.target.files,n=new Date,r=n.toISOString();if(a.length>0){this.imageFile=a[0],this.imageName=r;var i=new FileReader;i.onload=function(e){t.imageUrl=e.target.result},i.readAsDataURL(this.imageFile)}else this.imageName="",this.imageUrl="",this.imageFile=""},entry:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""!=this.setLabel){e.next=4;break}alert("必須項目が未入力です"),e.next=25;break;case 4:if(""!=this.date){e.next=8;break}alert("必須項目が未入力です"),e.next=25;break;case 8:if(t=new G,!(this.imageUrl.length>0&&this.imageUrl!=this.imageUrl_old&&""!=this.imageUrl_old)){e.next=17;break}return e.next=12,t.uploadImage(this.$store.state.userUid,this.imageName,this.imageFile);case 12:a=e.sent,this.imageUrl=a,t.deleteImage(this.$store.state.userUid,this.imageName_old),e.next=22;break;case 17:if(!(this.imageUrl.length>0&&""==this.imageUrl_old)){e.next=22;break}return e.next=20,t.uploadImage(this.$store.state.userUid,this.imageName,this.imageFile);case 20:n=e.sent,this.imageUrl=n;case 22:r=new te(this.id,this.lat,this.lng,this.setLabel,this.date,this.memo,this.imageUrl,this.imageName),t.update(this.$store.state.userUid,r),this.$router.push({path:"/"});case 25:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),dell:function(){var e=Object(f["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=new G,t.delete(this.id),t.deleteImage(this.$store.state.userUid,this.imageName),this.$router.push({path:"/"});case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},ue=le,ce=Object(c["a"])(ue,se,oe,!1,null,null,null),de=ce.exports;n["a"].use(p["a"]);var me=new p["a"]({routes:[{path:"/login",name:"login",component:I},{path:"/",name:"main",component:Q},{path:"/pointcreate",name:"pointcreate",component:ie},{path:"/pointedit",name:"pointedit",component:de},{path:"/labelmnt",name:"labelmnt",component:H}]}),pe=a("2f62");n["a"].use(pe["a"]);var he=new pe["a"].Store({state:{label:null,lat:0,lng:0,checked:null,userUid:null,userName:null},getters:{lat:function(e){return e.lat},lng:function(e){return e.lng},label:function(e){return e.label}},mutations:{setlat:function(e,t){e.lat=t.lat},setlng:function(e,t){e.lng=t.lng},setlabel:function(e,t){e.label=t.label},setchecked:function(e,t){e.checked=t.checked},setuserUid:function(e,t){e.userUid=t.userUid},setuserName:function(e,t){e.userName=t.userName}},actions:{}}),ge=he;n["a"].config.productionTip=!1,new n["a"]({router:me,store:ge,render:function(e){return e(m)}}).$mount("#app")},baed:function(e,t,a){e.exports=a.p+"img/btn_google_signin.9523da15.png"},bec2:function(e,t,a){var n=a("30dc");function r(e){return new Promise(function(t,a){n(e,function(e,n,r){e||200!=n.statusCode?a(e):t(r)})})}e.exports={doRequest:r}}});
//# sourceMappingURL=app.65aadb61.js.map