(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{423:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o="https://cp.emenu.com.my/"},731:function(e,t,n){"use strict";n.r(t);n(271),n(20),n(36),n(39);var o=n(423),r=n(100),m=n.n(r),d={data:function(){return{domain:o.a,ipay_merchant_code:"",ipay_invoice_id:"",ipay_amount:"",ipay_username:"",ipay_email:"",ipay_contact:"",ipay_signature:"",ipay_response_url:"",ipay_backend_url:""}},mounted:function(){},created:function(){this.$route.query.ipay_redirect?this.$route.query.ipay_redirect&&(this.ipay_merchant_code=this.$route.query.ipay_merchant_code,this.ipay_invoice_id=this.$route.query.ipay_invoice_id,this.ipay_amount=this.$route.query.ipay_amount,this.ipay_username=decodeURIComponent(this.$route.query.ipay_username),this.ipay_email=decodeURIComponent(this.$route.query.ipay_email),this.ipay_contact=decodeURIComponent(this.$route.query.ipay_contact),this.ipay_signature=decodeURIComponent(this.$route.query.ipay_signature),this.ipay_response_url=decodeURIComponent(this.$route.query.ipay_response_url),this.ipay_backend_url=decodeURIComponent(this.$route.query.ipay_backend_url)):window.location.href="https://emenu.com.my/"},methods:{send_whatsapp_notification_customer:function(e){console.log(e),console.log("noti_customer");var t=new URLSearchParams;t.append("message_customer","1"),t.append("id",e),m()({method:"post",url:this.domain+"/whatsapp/index.php",data:t}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},send_whatsapp_notification_merchant:function(e){console.log(e),console.log("noti_mercgabt");var t=new URLSearchParams;t.append("message_merchant","1"),t.append("id",e),m()({method:"post",url:this.domain+"/whatsapp/index.php",data:t}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}}},c=n(22),component=Object(c.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",{ref:"ePayment",attrs:{method:"post",action:"https://payment.ipay88.com.my/ePayment/entry.asp"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_merchant_code,expression:"ipay_merchant_code"}],attrs:{type:"hidden",name:"MerchantCode"},domProps:{value:e.ipay_merchant_code},on:{input:function(t){t.target.composing||(e.ipay_merchant_code=t.target.value)}}}),e._v(" "),n("input",{attrs:{type:"hidden",name:"PaymentId",value:""}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_invoice_id,expression:"ipay_invoice_id"}],attrs:{type:"hidden",name:"RefNo"},domProps:{value:e.ipay_invoice_id},on:{input:function(t){t.target.composing||(e.ipay_invoice_id=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_amount,expression:"ipay_amount"}],attrs:{type:"hidden",name:"Amount"},domProps:{value:e.ipay_amount},on:{input:function(t){t.target.composing||(e.ipay_amount=t.target.value)}}}),e._v(" "),n("input",{attrs:{type:"hidden",name:"Currency",value:"MYR"}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_invoice_id,expression:"ipay_invoice_id"}],attrs:{type:"hidden",name:"ProdDesc"},domProps:{value:e.ipay_invoice_id},on:{input:function(t){t.target.composing||(e.ipay_invoice_id=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_username,expression:"ipay_username"}],attrs:{type:"hidden",name:"UserName"},domProps:{value:e.ipay_username},on:{input:function(t){t.target.composing||(e.ipay_username=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_email,expression:"ipay_email"}],attrs:{type:"hidden",name:"UserEmail"},domProps:{value:e.ipay_email},on:{input:function(t){t.target.composing||(e.ipay_email=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_contact,expression:"ipay_contact"}],attrs:{type:"hidden",name:"UserContact"},domProps:{value:e.ipay_contact},on:{input:function(t){t.target.composing||(e.ipay_contact=t.target.value)}}}),e._v(" "),n("input",{attrs:{type:"hidden",name:"Remark",value:""}}),e._v(" "),n("input",{attrs:{type:"hidden",name:"Lang",value:"UTF-8"}}),e._v(" "),n("input",{attrs:{type:"hidden",name:"SignatureType",value:"SHA256"}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_signature,expression:"ipay_signature"}],attrs:{type:"hidden",name:"Signature"},domProps:{value:e.ipay_signature},on:{input:function(t){t.target.composing||(e.ipay_signature=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_response_url,expression:"ipay_response_url"}],attrs:{type:"hidden",name:"ResponseURL"},domProps:{value:e.ipay_response_url},on:{input:function(t){t.target.composing||(e.ipay_response_url=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipay_backend_url,expression:"ipay_backend_url"}],attrs:{type:"hidden",name:"BackendURL"},domProps:{value:e.ipay_backend_url},on:{input:function(t){t.target.composing||(e.ipay_backend_url=t.target.value)}}}),e._v(" "),n("input",{ref:"submit",staticStyle:{display:"none!important"},attrs:{type:"submit",value:"Proceed with Payment"}})])])}),[],!1,null,null,null);t.default=component.exports}}]);