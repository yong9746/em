(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{370:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var o="https://cp.emenu.com.my/"},570:function(t,e,r){var content=r(678);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(11).default)("f4e9259a",content,!0,{sourceMap:!1})},677:function(t,e,r){"use strict";r(570)},678:function(t,e,r){var o=r(10)(!1);o.push([t.i,'.product-add-to-cart{box-shadow:0 2px 28px 0 rgb(0 0 0/12%)!important;background:#fff!important}.vnis__button{-webkit-appearance:none;transition:background .5s ease;border:0;color:#000!important;cursor:pointer;float:left;font-size:20px;margin:0;width:30px!important;height:30px!important;background:transparent!important}.vnis__input{height:30px!important;width:calc(100% - 60px)!important}.product-topping-list .product-topping-list-tag{font-size:.8rem!important}.product-topping-list .product-topping-list-title{font-size:1.3rem!important}.required-list{background:#4caf50!important;color:#fff!important}.product-topping-list .product-topping-list-tag{background-color:rgb(178 189 255);color:#fff}.product-topping-list .product-topping-list-indication{font-size:.9rem!important}.stock_available{font-size:12px!important;color:#757575;font-weight:400;align-self:center}.close{position:absolute;right:32px;top:32px;width:32px;height:32px;opacity:.6}.close:hover{opacity:1}.close:after,.close:before{position:absolute;left:15px;content:" ";height:33px;width:2px;background-color:#fff}.close:before{transform:rotate(45deg)}.close:after{transform:rotate(-45deg)}',""]),t.exports=o},714:function(t,e,r){"use strict";r.r(e);var o=r(22),n=(r(78),r(228),r(12),r(38),r(42),r(27),r(58),r(29),r(13),r(50),r(230),r(41),r(92),r(40),r(57),r(370)),c=(r(88),r(409)),d=r.n(c),l=r(153),_={transition:"slide",components:{NumberInputSpinner:d.a,rad:l.default},data:function(){return{domain:n.a,remark:"",donemount:!1,number_refresh:!0,selected_image:"",selected_image_index:0,add_to_card_qty:1,refresh:0,unsavedChanges:!0,dialog_image_slider:!1,selected_slider:0}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,o,n,c,d,l,_,v,h,m,f,y,x,k;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,o=t.$axios,(n=new URLSearchParams).append("url","".concat(r.merchant)),n.append("product_id","".concat(r.pid)),n.append("get_product","get_product"),e.next=7,o.$post("product/index.php",n);case 7:if(c=e.sent,console.log(c),"1"===c.status){e.next=12;break}return window.location.href="https://emenu.com.my/"+"".concat(r.merchant),e.abrupt("return");case 12:return(d=new URLSearchParams).append("url","".concat(r.merchant)),d.append("read","date"),e.next=17,o.$post("form/index.php",d);case 17:if((l=e.sent).form_function[0].color?(_=JSON.parse(l.form_function[0].color),v=_.primary_color,h=_.second_color):(v="#000000",h="#666f7b"),"1"!=c.status){e.next=30;break}if(m=[],""!==c.read[0].variation&&(m=JSON.parse(c.read[0].variation)),f=[],""!==c.read[0].image_gallery&&(f=JSON.parse(c.read[0].image_gallery)),y=[],x=c.read[0].price,""!==c.read[0].variant&&"1"==c.read[0].type){for(y=JSON.parse(c.read[0].variant),x=y[0].price,k=0;k<y.length;k++)Object.assign(y[k],{selected:!1});y[0].selected=!0}return e.abrupt("return",{merchant_url:"".concat(r.merchant),merchant_id:l.form_function[0].merchant_id,theme_color:l.form_function[0].form_color,default_language:l.form_function[0].default_language,product_id:c.read[0].product_id,product_name:c.read[0].name,product_image:c.read[0].image,product_image_gallery:f,product_description:c.read[0].description.replace(/\n/g,"<br/>"),product_price:x,product_category_id:c.read[0].category_id,product_item_code:c.read[0].item_code,product_variation:m,product_type:c.read[0].type,product_variant:y,stock:c.read[0].stock,p_color:v,s_color:h,add_to_cart_loading:!1,selected_variant_id:""});case 30:window.location.href="https://emenu.com.my/"+"".concat(r.merchant);case 31:case"end":return e.stop()}}),e)})))()},head:function(){return{title:this.product_name}},computed:{slider_array:function(){var t=[],e={image:this.product_image};t.push(e);for(var i=0;i<this.product_image_gallery.length;i++)t.push({image:this.product_image_gallery[i].image});return t},language:function(){return this.$store.state.locale},product_stock:function(){if("0"==this.product_type){if(""==this.stock)return 9999;var t=this.$store.getters.product_used_stock(this.product_id,this.product_type,this.selected_variant_id);return parseFloat((parseFloat(this.stock)-parseFloat(t)).toFixed(0))}for(var i=0;i<this.product_variant.length;i++)if(this.product_variant[i].id==this.selected_variant_id){if(""==this.product_variant[i].stock)return 9999;t=this.$store.getters.product_used_stock(this.product_id,this.product_type,this.selected_variant_id);return parseFloat((parseFloat(this.product_variant[i].stock)-parseFloat(t)).toFixed(0))}return 9999},p_dark:function(){return this.text_color_auto(this.p_color)},s_dark:function(){return this.text_color_auto(this.s_color)},selected_product_variant:function(){if("0"==this.product_type)return[];for(var i=0;i<this.product_variant.length;i++)this.product_variant[i].id==this.selected_variant_id?this.product_variant[i].selected=!0:this.product_variant[i].selected=!1;return this.product_variant}},watch:{product_stock:function(t){var e=this;console.log(t),t<this.add_to_card_qty&&(this.number_refresh=!1,this.$nextTick((function(){e.number_refresh=!0,e.add_to_card_qty=t})))},language:function(){this.$i18n.locale=this.language},selected_variant_id:function(t){for(var i=0;i<this.product_variant.length;i++)t==this.product_variant[i].id&&(this.product_price=this.product_variant[i].price)}},created:function(){this.$store.dispatch("fetchCart",this.merchant_url),this.$store.dispatch("fetchlocale",this.default_language)},mounted:function(){this.donemount=!0,this.history_length=window.history.length,window.scroll(0,0)},methods:{add_on_change:function(t,e){1==this.product_variation[t].variation[e].quantity?this.product_variation[t].variation[e].quantity=0:this.product_variation[t].variation[e].quantity=1,console.log(JSON.stringify(this.product_variation))},radio_onchage:function(){},add_to_cart:function(){if(!(this.add_to_card_qty<1)){var t=this.product_price;this.add_to_cart_loading=!0;var e=this.$store.state.cart;console.log(JSON.stringify(e));for(var i=0;i<e.length;i++)if(e[i].product_id==this.product_id&&e[i].product_name==this.product_name&&e[i].product_price==t&&e[i].remark==this.remark&&JSON.stringify(e[i].product_variation)==JSON.stringify(this.product_variation)&&JSON.stringify(e[i].variant)==JSON.stringify(this.selected_product_variant))return console.log("update"),console.log(i),this.$store.commit("updateCart",{index:i,quantity:this.add_to_card_qty}),this.$router.push("/"+this.merchant_url),this.add_to_cart_loading=!1,this.add_to_card_qty=0,void(this.remark="");var r={product_id:this.product_id,item_code:this.product_item_code,product_name:this.product_name,product_price:t,product_variation:this.product_variation,type:this.product_type,variant:this.selected_product_variant,remark:this.remark,quantity:this.add_to_card_qty,stock:this.stock};this.$store.commit("pushCart",r),this.$router.push("/"+this.merchant_url),this.add_to_card_qty=1,this.remark=""}},shop_button:function(){this.$router.push("/"+this.merchant_url)},text_color_auto:function(t){return"#"===t.slice(0,1)&&(t=t.slice(1)),3===t.length&&(t=t.split("").map((function(t){return t+t})).join("")),!((299*parseInt(t.substr(0,2),16)+587*parseInt(t.substr(2,2),16)+114*parseInt(t.substr(4,2),16))/1e3>=128)},vibrate:function(){window.navigator.vibrate&&window.navigator.vibrate(25)}}},v=(r(677),r(21)),h=r(62),m=r.n(h),f=r(572),y=r(379),x=r(718),k=r(720),C=r(701),w=r(719),S=r(710),$=r(711),z=r(579),O=r(337),N=r(708),component=Object(v.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.donemount?r("div",{staticClass:"v-main__wrap"},[r("meta",{attrs:{name:"viewport",content:"width=device-width, user-scalable=no"}}),t._v(" "),r("meta",{attrs:{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}}),t._v(" "),r("meta",{attrs:{name:"theme-color",content:t.theme_color}}),t._v(" "),r("div",{staticClass:"container fill-height container--fluid"},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"12",xl:"6",lg:"6",md:"8"}},[r("div",{staticClass:"w-full"},[r("div",{staticClass:"d-flex py-3"},[r("div"),t._v(" "),r("v-spacer"),t._v(" "),r("NuxtLink",{attrs:{to:"/"+t.$route.params.merchant}},[r("v-btn",{staticStyle:{"font-size":"14px"},attrs:{color:t.s_color,dark:t.s_dark},on:{click:function(e){return t.vibrate()}}},[t._v("\n           "+t._s(t.$t("return-main-shop"))+"\n          ")])],1)],1),t._v(" "),r("div",{staticClass:"pa-3 v-card v-card--flat v-sheet theme--light"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 col-12"},[r("v-card",[r("div",{staticClass:"d-flex"},[t.product_image_gallery.length>0?r("div",{staticClass:"mr-2 ml-2"},[r("div",{staticClass:"v-card v-card--link v-sheet theme--light mt-2",on:{click:function(e){t.selected_image=t.product_image,t.selected_image_index=0}}},[r("div",{staticClass:"v-image v-responsive rounded  mb-2 theme--light",staticStyle:{height:"80px",width:"80px"}},[r("div",{staticClass:"v-responsive__sizer",staticStyle:{"padding-bottom":"100%"}}),t._v(" "),r("div",{staticClass:"v-image__image v-image__image--cover",style:{"background-image":"url("+t.domain+"/product/image.php?m="+t.merchant_id+"&type=product&im="+t.product_image+")","background-position":"center center;"}}),t._v(" "),r("div",{staticClass:"v-responsive__content",staticStyle:{width:"1000px"}})])]),t._v(" "),t._l(t.product_image_gallery,(function(e,o){return[r("div",{key:o,staticClass:"v-card v-card--link v-sheet theme--light",on:{click:function(r){t.selected_image=e.image,t.selected_image_index=o+1}}},[r("div",{staticClass:"v-image v-responsive rounded mb-2 theme--light",staticStyle:{height:"80px",width:"80px"}},[r("div",{staticClass:"v-responsive__sizer",staticStyle:{"padding-bottom":"100%"}}),t._v(" "),r("div",{staticClass:"v-image__image v-image__image--cover",style:{"background-image":"url("+t.domain+"/product/image.php?m="+t.merchant_id+"&type=product&im="+e.image+")","background-position":"center center;"}}),t._v(" "),r("div",{staticClass:"v-responsive__content",staticStyle:{width:"1000px"}})])])]}))],2):t._e(),t._v(" "),r("div",{staticClass:"d-flex align-center flex-grow-1 justify-center",on:{click:function(e){t.selected_slider=t.selected_image_index,t.dialog_image_slider=!0}}},[r("img",{staticClass:"rounded ma-1",staticStyle:{"max-width":"100%","max-height":"460px"},attrs:{src:t.selected_image?t.domain+"/product/image.php?m="+t.merchant_id+"&type=product&im="+t.selected_image:t.domain+"/product/image.php?m="+t.merchant_id+"&type=product&im="+t.product_image}})])])])],1),t._v(" "),r("div",{staticClass:"col-md-6 col-12"},[r("div",{staticClass:"d-flex"}),t._v(" "),r("div",{staticClass:"font-weight-bold text-h5",staticStyle:{"font-size":"24px!important","line-height":"32px"}},[t._v("\n                "+t._s(t.product_name)+"\n              ")]),t._v(" "),r("hr",{staticClass:"my-2 v-divider theme--light",attrs:{role:"separator","aria-orientation":"horizontal"}}),t._v(" "),r("div",{staticClass:"d-flex align-center text-h6",staticStyle:{"font-size":"19px!important","line-height":"32px"}},[r("div",[t._v(" "+t._s(t.$t("product-price"))+":")]),t._v(" "),r("span",{staticClass:"text-decoration-line-through mx-1 font-weight-regular"}),r("span",[t._v("RM"+t._s(t.product_price))])]),t._v(" "),r("hr",{staticClass:"my-2 v-divider theme--light",attrs:{role:"separator","aria-orientation":"horizontal"}}),t._v(" "),r("div",{staticClass:"font-weight-bold mb-1"},[t._v(t._s(t.$t("about-item")))]),t._v(" "),r("div",{staticClass:"mt-3 text-body-1",staticStyle:{"font-size":"16px!important","line-height":"32px"},domProps:{innerHTML:t._s(t.product_description)}})])]),t._v(" "),r("hr",{staticClass:"my-3 v-divider theme--light",attrs:{role:"separator","aria-orientation":"horizontal"}}),t._v(" "),t.product_variant.length>0?r("div",{staticClass:"col-md-12 col-12"},[r("div",{staticClass:"pa-2 v-card v-sheet v-sheet--outlined theme--light"},[r("div",{staticClass:"d-flex flex-column"},[r("div",{staticClass:"text-body-1 font-weight-bold mt-2",staticStyle:{"font-size":"16px!important"}},[t._v(t._s(t.$t("product-variant")))]),t._v(" "),r("div",{staticClass:"product-variations"},[r("div",[r("div",{staticClass:"product-topping-list js-variation-selector"},[r("v-radio-group",{staticClass:"ml-4 mr-4",attrs:{mandatory:""},model:{value:t.selected_variant_id,callback:function(e){t.selected_variant_id=e},expression:"selected_variant_id"}},t._l(t.product_variant,(function(e){return r("v-radio",{key:e.id,staticClass:"mb-4",attrs:{value:e.id,disabled:""!==e.stock&&e.stock<1||"1"==e.status},scopedSlots:t._u([{key:"label",fn:function(){return[r("v-row",{staticClass:"ml-4 mr-4"},[r("span",{staticClass:"radio-text",staticStyle:{"font-size":"13px !important","font-weight":"500"}},[r("b",[t._v(t._s(e.name)+t._s(""!==e.stock&&e.stock<1||"1"==e.status?"(Out of stock)":""))])]),r("v-spacer"),t._v(" "),r("span",{staticClass:"radio-text",staticStyle:{"font-size":"13px !important","font-weight":"500"}},[r("b",[t._v("RM"+t._s(parseFloat(e.price).toFixed(2)))])])],1)]},proxy:!0}],null,!0)})})),1)],1)])])])])]):t._e(),t._v(" "),t.product_variation.length>0?r("div",{staticClass:"col-md-12 col-12"},[r("div",{staticClass:"pa-2 v-card v-sheet v-sheet--outlined theme--light"},[r("div",{staticClass:"d-flex flex-column"},[r("div",{staticClass:"text-body-1 font-weight-bold",staticStyle:{"font-size":"16px!important"}},[t._v(t._s(t.$t("product-option")))]),t._v(" "),r("div",{staticClass:"product-variations"},[r("div",[r("div",{staticClass:"product-topping-list js-variation-selector"},[t._l(t.product_variation,(function(e,o){return[r("div",{key:o},[r("h3",{staticClass:"product-topping-list-title"},[r("span",{staticClass:"product-topping-list-title-text",staticStyle:{"font-size":"20.8px!important"}},[t._v(t._s(e.group_name))]),t._v(" "),1==e.option?r("span",{staticClass:"product-topping-list-tag required-list"},[t._v("\n                              "+t._s(t.$t("product-option-required"))+"\n                            ")]):t._e(),t._v(" "),0==e.option?r("span",{staticClass:"product-topping-list-tag"},[t._v("\n                              "+t._s(t.$t("product-option-optional"))+"\n                            ")]):t._e()]),t._v(" "),1==e.type?r("p",{staticClass:"product-topping-list-indication"},[t._v("\n                            "+t._s(t.$t("product-option-select-one"))+"\n                          ")]):t._e(),t._v(" "),0==e.type?r("p",{staticClass:"product-topping-list-indication"},[t._v("\n                          "+t._s(t.$t("product-option-select-multiple"))+"\n                            "+t._s(e.variation.length)+"\n                            "+t._s(t.$t("product-option-select-multiple-quantifier"))+"\n                          ")]):t._e(),t._v(" "),r("v-row",{staticStyle:{margin:"-18px !important"},attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"10"}},[r("rad",{attrs:{array:e.variation,multiple:0==e.type,optional:0==e.option}})],1)],1)],1)]}))],2)])])])])]):t._e(),t._v(" "),r("div",[r("div",{staticClass:"text-h6",staticStyle:{"font-size":"20px!important","line-height":"32px"}},[t._v(t._s(t.$t("note")))]),t._v(" "),r("v-textarea",{attrs:{placeholder:"",outlined:""},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),r("hr",{staticClass:"my-3 v-divider theme--light",attrs:{role:"separator","aria-orientation":"horizontal"}})])])])],1)],1),t._v(" "),r("footer",{staticClass:"v-footer v-sheet theme--light v-footer--inset product-add-to-cart",staticStyle:{left:"0px",right:"0px",bottom:"0px",height:"58px",position:"fixed"}},[r("div",{staticClass:"spacer"}),t._v(" "),t.donemount&&t.number_refresh?r("NumberInputSpinner",{staticStyle:{"align-self":"center"},attrs:{min:0,max:t.product_stock,step:1,integerOnly:!0},on:{change:function(e){return t.vibrate()}},model:{value:t.add_to_card_qty,callback:function(e){t.add_to_card_qty=e},expression:"add_to_card_qty"}}):t._e(),t._v(" "),r("div",{staticClass:"stock_available"},[t._v(" \n    "+t._s(t.product_stock<100?t.product_stock+" available":"")+"\n\n    ")]),t._v(" "),r("v-spacer"),t._v(" "),t.product_stock>0?r("v-btn",{staticStyle:{"font-size":"15px","align-self":"center"},attrs:{color:t.p_color,dark:t.p_dark,loading:t.add_to_cart_loading,width:"45%"},on:{click:function(e){t.add_to_cart(),t.vibrate()}}},[t._v("\n      "+t._s(t.$t("add-to-cart"))+"\n    ")]):t._e(),t._v(" "),t.product_stock<=0?r("v-btn",{staticStyle:{"font-size":"15px","align-self":"center"},attrs:{color:t.p_color,tile:"",width:"45%",disabled:""}},[t._v("\n      "+t._s(t.$t("add-to-cart"))+"\n\n    ")]):t._e()],1),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.refresh,expression:"refresh"}],attrs:{type:"hidden"},domProps:{value:t.refresh},on:{input:function(e){e.target.composing||(t.refresh=e.target.value)}}}),t._v(" "),r("v-dialog",{attrs:{fullscreen:""},model:{value:t.dialog_image_slider,callback:function(e){t.dialog_image_slider=e},expression:"dialog_image_slider"}},[r("a",{staticClass:"close",attrs:{href:"#"}}),t._v(" "),r("v-card",{staticStyle:{"background-color":"black",width:"100%",height:"100%","border-radius":"0px"},attrs:{align:"center",justify:"center"},on:{click:function(e){t.dialog_image_slider=!1}}},[r("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){t.dialog_image_slider=!1}}}),t._v(" "),r("v-carousel",{staticClass:"ma-auto",attrs:{height:"100%"},model:{value:t.selected_slider,callback:function(e){t.selected_slider=e},expression:"selected_slider"}},t._l(t.slider_array,(function(e,i){return r("v-carousel-item",{key:i,attrs:{src:t.domain+"/product/image.php?m="+t.merchant_id+"&type=product&im="+e.image,contain:""}})})),1)],1)],1)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;m()(component,{VBtn:f.a,VCard:y.a,VCarousel:x.a,VCarouselItem:k.a,VCol:C.a,VDialog:w.a,VRadio:S.a,VRadioGroup:$.a,VRow:z.a,VSpacer:O.a,VTextarea:N.a})}}]);