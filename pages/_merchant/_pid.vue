<template>
  <div class="v-main__wrap" v-if="donemount">
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />

    <meta name="theme-color" :content="theme_color" />
    <div class="container fill-height container--fluid">
      <!-- <div class="layout justify-center"> -->
        <v-row justify="center">
          <v-col cols="12" xl="6" lg="6" md="8">
        <div class="w-full">
          <div class="d-flex py-3">
            <div>
              <!-- <div class="display-1" style="font-size:33px!important">{{ product_name }}</div> -->
            
            </div>
            <v-spacer></v-spacer>
            <NuxtLink :to="'/'+$route.params.merchant"><v-btn @click="vibrate()" :color="s_color" :dark="s_dark" style="font-size:14px">
             {{$t('return-main-shop')}}
            </v-btn></NuxtLink>
      
          </div>
         
          <div class="pa-3 v-card v-card--flat v-sheet theme--light">
            <div class="row">
              
              <div class="col-md-6 col-12">
                <v-card>
                <div class="d-flex">
                  <div class="mr-2 ml-2"    v-if="product_image_gallery.length>0">
                     <div
                  
                        class="v-card v-card--link v-sheet theme--light mt-2"
                         @click="selected_image=product_image"
                      >
                        <div
                          class="v-image v-responsive rounded  mb-2 theme--light"
                          style="height: 80px; width: 80px"
                        >
                          <div
                            class="v-responsive__sizer"
                            style="padding-bottom: 100%"
                          ></div>

                          <div 
                            class="v-image__image v-image__image--cover"
                           
                            :style="{
                              'background-image':
                                'url(' +
                                domain +
                                '/product/image.php?type=banner&im=' +
                                product_image +
                                ')',
                                'background-position': 'center center;'
                                
                            }"
                          ></div>
                          <div
                            class="v-responsive__content"
                            style="width: 1000px"
                          ></div>
                        </div>
                      </div>
                    <template
                      v-for="(image_galley, index) in product_image_gallery"
                    >
                      <div
                        :key="index"
                        class="v-card v-card--link v-sheet theme--light"
                        @click="selected_image=image_galley.image"
                      >
                        <div
                          class="v-image v-responsive rounded mb-2 theme--light"
                          style="height: 80px; width: 80px"
                        >
                          <div
                            class="v-responsive__sizer"
                            style="padding-bottom: 100%"
                          ></div>

                          <div
                            class="v-image__image v-image__image--cover"
                           
                            :style="{
                              'background-image':
                                'url(' +
                                domain +
                                '/product/image.php?im=' +
                                image_galley.image +
                                ')',
                                'background-position': 'center center;'
                                
                            }"
                          ></div>
                          <div
                            class="v-responsive__content"
                            style="width: 1000px"
                          ></div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="d-flex align-center flex-grow-1 justify-center">
                    <img
                      :src="selected_image?domain +
                                '/product/image.php?im=' +
                                 selected_image:domain +
                                '/product/image.php?im=' +
                                product_image"
                      class="rounded ma-1"
                      style="max-width: 100%; max-height: 460px"
                    />
                  </div>
                </div>
                </v-card>
              </div>
              <div class="col-md-6 col-12">
                <div class="d-flex"></div>
                <div class="font-weight-bold text-h5" style="font-size:24px!important;line-height:32px;">
                  {{ product_name }}
                </div>

                <hr
                  role="separator"
                  aria-orientation="horizontal"
                  class="my-2 v-divider theme--light"
                />
                <div class="d-flex align-center text-h6" style="font-size:19px!important;line-height:32px;">
                  <div> {{$t('product-price')}}:</div>
                  <span
                    class="text-decoration-line-through mx-1 font-weight-regular"
                  ></span
                  ><span>RM{{ product_price }}</span>
                </div>
                <!-- <div class="mt-3 text-body-1"  v-html="product_description">
                </div> -->
                <hr
                  role="separator"
                  aria-orientation="horizontal"
                  class="my-2 v-divider theme--light"
                />
                <div class="font-weight-bold mb-1">{{$t('about-item')}}</div>
                <div
                  class="mt-3 text-body-1" style="font-size:16px!important;line-height:32px;"
                  v-html="product_description"
                ></div>
              </div>
            </div>

            <hr
              role="separator"
              aria-orientation="horizontal"
              class="my-3 v-divider theme--light"
            />
            <div class="col-md-12 col-12" v-if="product_variation.length > 0">
              <div class="pa-2 v-card v-sheet v-sheet--outlined theme--light">
                <div class="d-flex flex-column">
                  <div class="text-body-1 font-weight-bold" style="font-size:16px!important">{{$t('product-option')}}</div>
                  <!-- <div class="text-body-1">Free Shipping</div>
                    <div class="text-h6 success--text my-3">In Stock</div> -->
                  <div class="product-variations">
                    <div>
                      <!-- product variation -->
                      <div
                        class="product-topping-list js-variation-selector"
                        
                      >
                        <template v-for="(variant, index) in product_variation">
                          <div :key="index">
                            <h3 class="product-topping-list-title">
                              <span class="product-topping-list-title-text" style="font-size:20.8px!important">{{
                                variant.group_name
                              }}</span>

                              <span
                                class="product-topping-list-tag required-list"
                                v-if="variant.option == 1"
                              >
                                {{$t('product-option-required')}}
                              </span>
                              <span
                                class="product-topping-list-tag"
                                v-if="variant.option == 0"
                              >
                                {{$t('product-option-optional')}}
                              </span>
                            </h3>
                            <p
                              class="product-topping-list-indication"
                              v-if="variant.type == 1"
                            >
                              {{$t('product-option-select-one')}}
                            </p>
                            <p
                              class="product-topping-list-indication"
                              v-if="variant.type == 0"
                            >
                            {{$t('product-option-select-multiple')}}
                              {{ variant.variation.length }}
                              {{$t('product-option-select-multiple-quantifier')}}
                            </p>
                            <v-row
                              align="center"
                              justify="center"
                              style="margin: -18px !important"
                            >
                              <v-col cols="10">
                                <!-- <v-radio-group :multiple="variant.type==0?true:false">
                              <rad
                                v-for="(vari,idx) in variant.variation"
                                :key="idx"
                                :truefalse="(vari.quantity?true:false)" 
                                :namee="vari.name" 
                                :pricee="vari.price"

                                @change="add_on_change(index,idx)"
                                class="radio-box">
                               
                              </rad>
                            </v-radio-group> -->
                                <rad
                                  :array="variant.variation"
                                  :multiple="variant.type == 0 ? true : false"
                                  :optional="variant.option == 0 ? true : false"
                                >
                                </rad>
                              </v-col>
                            </v-row>
                          </div>
                        </template>
                      </div>
                      <!-- end product variation -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="text-h6" style="font-size:20px!important;line-height:32px;" >{{$t('note')}}</div>
              <v-textarea
                v-model="remark"
                placeholder="No onion"
                outlined
              ></v-textarea>
            </div>
            <hr
              role="separator"
              aria-orientation="horizontal"
              class="my-3 v-divider theme--light"
            />
          </div>
        </div>
        </v-col>
        </v-row>
      <!-- </div> -->
    </div>
    <footer
      class="v-footer v-sheet theme--light v-footer--inset product-add-to-cart"
      style="left: 0px; right: 0px; bottom: 0px; height:58px; position:fixed;"
    >
      <div class="spacer"></div>
      <NumberInputSpinner
        v-if="donemount"
        :min="0"
        :max="product_stock"
        :step="1"
        @change="vibrate()"
        style="align-self: center"
        :integerOnly="true"
        v-model="add_to_card_qty"
      />  
      <div class="stock_available">&nbsp;
      {{(product_stock < 100) ? product_stock+' available':''}}

      </div>
      <v-spacer></v-spacer>
      <v-btn :color="p_color" :dark="p_dark" v-if="product_stock>0" tile width="45%" @click="add_to_cart(),vibrate()" style="font-size:15px;align-self: center;">
        {{$t('add-to-cart')}}
      </v-btn>
      <v-btn :color="p_color" v-if="product_stock<=0" tile width="45%" disabled style="font-size:15px;align-self: center;" >
        {{$t('add-to-cart')}}

      </v-btn>
    </footer>
    <input type="hidden" v-model="refresh"/>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { BASEURL } from "@/api/baseurl";
import axios from "axios";
import NumberInputSpinner from "vue-number-input-spinner";
import rad from "@/components/radio";
export default {
   transition: 'slide',
  components: {
    NumberInputSpinner,
    rad,
  },
  data() {
    return {
      domain: BASEURL,
      remark: "",
      donemount: false,
      selected_image:'',
      add_to_card_qty:1,
      refresh:0,
      unsavedChanges:true,
    };
  },
  async asyncData({ params, $axios }) {
    const productData = new URLSearchParams();

    productData.append("url", `${params.merchant}`);
    productData.append("product_id", `${params.pid}`);
    productData.append("get_product", "get_product");

    let productResponse = await $axios.$post("product/index.php", productData);

     if (productResponse.status !== "1") {
      window.location.href = "https://emenu.com.my/"+`${params.merchant}`; 
      return;
    }

    const formData = new URLSearchParams();
    formData.append("url", `${params.merchant}`);
    formData.append("read", "date");
    let formResponse = await $axios.$post("form/index.php", formData);

    if (formResponse.form_function[0].color) {
        var color = JSON.parse(formResponse.form_function[0].color);
        var p_color = color.primary_color;
        var s_color = color.second_color;
      }else{
         var p_color = "#000000";
        var s_color = "#666f7b";
      }


    if (productResponse.status == "1") {
      var product_variation = [];
      if (productResponse.read[0].variation) {
        product_variation = JSON.parse(productResponse.read[0].variation);
      }
      var product_image_gallery = [];
      if (productResponse.read[0].image_gallery) {
        product_image_gallery = JSON.parse(productResponse.read[0].image_gallery);
      }

      return {
        merchant_url:`${params.merchant}`,
        theme_color: formResponse.form_function[0].form_color,
        default_language: formResponse.form_function[0].default_language,
        product_id: productResponse.read[0].product_id,
        product_name: productResponse.read[0].name,
        product_image: productResponse.read[0].image,
        product_image_gallery: product_image_gallery,

        // product_description: productResponse.read[0].description,
        product_description: productResponse.read[0].description.replace(/\n/g, "<br/>"),

        product_price: productResponse.read[0].price,
        product_category_id: productResponse.read[0].category_id,
        product_item_code: productResponse.read[0].item_code,
        product_variation: product_variation,
        stock: productResponse.read[0].stock,
        p_color:p_color,
        s_color:s_color,
      };
    } else {
      window.location.href = "https://emenu.com.my/"+`${params.merchant}`; 
    }

    // return{
    //   banner_status: formResponse.data.form_function[0].banner_status,
    //   banner_video_link: formResponse.data.form_function[0].banner_video_link,
    //   bank_details: formResponse.data.form_function[0].bank_details,
    //   theme_color: formResponse.data.form_function[0].form_color,
    //   form_image: formResponse.data.form_function[0].form_banner,
    //   form_title: formResponse.data.form_function[0].name,
    //   merchant_address: "Merchant address| 商家地址 : \n" + formResponse.data.form_function[0].address,
    //   self_collect: formResponse.data.form_function[0].self_collect == "0" ? true : false,
    //   delivery_date_option: formResponse.data.form_function[0].delivery_date_option == "0" ? true : false,
    //   delivery_time_option:  formResponse.data.form_function[0].delivery_time_option == "0"? true : false,
    //   email_option : formResponse.data.form_function[0].email_option == "0" ? true : false,
    //   form_description : formResponse.data.form_function[0].description,
    //   bank_transfer : formResponse.data.form_function[0].bank_transfer == "0" ? true: false,
    //   cash_on_delivery : formResponse.data.form_function[0].cash_on_delivery == "0" ? true : false,
    //   fpay_transfer : formResponse.data.form_function[0].fpay_transfer == "0" ? true: false,
    //   allow_discount : formResponse.data.form_function[0].allow_discount,
    //   order_min_day : formResponse.data.form_function[0].order_min_day,
    //   working_day : formResponse.data.form_function[0].working_day,
    //   note:formResponse.data.form_function[0].note_default_value,
    //   shipping_setting_status:formResponse.data.form_function[0].shipping_setting_status,
    //   tax_percent:formResponse.data.form_function[0].tax_percent,
    //   tax_name:formResponse.data.form_function[0].tax_name,
    //   json_promo_dialog:formResponse.data.form_function[0].promo_dialog,
    // }
  },
  head () {
    return {
      title: this.product_name,
    }
  },
  computed: {
    language(){
      return this.$store.state.locale;
    },
    product_stock(){
      if(this.stock==''){

        return 9999;
      }else{
        var used_stock=this.$store.getters.product_used_stock(this.product_id);
        
          return parseFloat((parseFloat(this.stock)-parseFloat(used_stock)).toFixed(0))

      }
      
    },

    p_dark:function () {
      return this.text_color_auto(this.p_color);
    },

    s_dark:function () {
      return this.text_color_auto(this.s_color);
    },
    
  },
  watch:{
    language(){
      this.$i18n.locale = this.language;
    },
  },
  created(){
    this.$store.dispatch("fetchCart",this.merchant_url);
    this.$store.dispatch("fetchlocale",this.default_language);
    

   
  },

  mounted() {
    this.donemount = true;
      this.history_length=window.history.length;

   

    
        //      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //   this.$router.push('/'+this.merchant_url); 
        // } else {
        //   console.info( "This page is not reloaded");
        // }
  },
  methods: {
    add_on_change(variation_index, variant_index) {
      this.product_variation[variation_index].variation[variant_index]
        .quantity == 1
        ? (this.product_variation[variation_index].variation[
            variant_index
          ].quantity = 0)
        : (this.product_variation[variation_index].variation[
            variant_index
          ].quantity = 1);
          console.log(JSON.stringify(this.product_variation));
    },

    reset() {

    },
    
    add_to_cart() {

        if(this.add_to_card_qty<1){
          return;
        }
          var cart_array=this.$store.state.cart;
          console.log(JSON.stringify(cart_array));
          for(var i=0; i<cart_array.length; i++){
            if (
                cart_array[i].product_id == this.product_id &&
                cart_array[i].product_name == this.product_name &&
                cart_array[i].product_price == this.product_price &&
                cart_array[i].remark == this.remark &&
                JSON.stringify(cart_array[i].product_variation) ==
                  JSON.stringify(this.product_variation)
              ) {
                //add quantity
                console.log('update');
                console.log(i);

                this.$store.commit('updateCart', {index:i,quantity:this.add_to_card_qty})
                this.$router.push('/'+this.merchant_url); 

                this.add_to_card_qty=0;
                this.remark='';
                return;
              }
          }
            var new_item = {product_id:this.product_id, item_code:this.product_item_code, product_name:this.product_name, product_price:this.product_price, product_variation:this.product_variation,remark:this.remark,quantity:this.add_to_card_qty
            ,stock:this.stock};
            this.$store.commit('pushCart', new_item);
            this.$router.push('/'+this.merchant_url); 
           this.add_to_card_qty=1;
                this.remark='';

    },
    shop_button(){
          // console.log(window.history.length);
          // if(window.history.length > 3){
          //     this.$router.back()


              // this.$store.commit('', e.target.value)
          // }else{
              this.$router.push('/'+this.merchant_url); 

          // }
    },
    text_color_auto(hexcolor) {
      // If a leading # is provided, remove it
      if (hexcolor.slice(0, 1) === "#") {
        hexcolor = hexcolor.slice(1);
      }

      // If a three-character hexcode, make six-character
      if (hexcolor.length === 3) {
        hexcolor = hexcolor
          .split("")
          .map(function (hex) {
            return hex + hex;
          })
          .join("");
      }

      // Convert to RGB value
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);

      // Get YIQ ratio
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;

      // Check contrast
      return yiq >= 128 ? false : true;
    },


    vibrate(){
      // window.navigator.vibrate(25); 
      const canVibrate = window.navigator.vibrate
      if (canVibrate) {window.navigator.vibrate(25)}
    }

  },
};
</script>
<style>
.product-add-to-cart {
  box-shadow: 0 2px 28px 0 rgb(0 0 0 / 12%) !important;

  background: #fff !important;
}
.vnis__button {
  -webkit-appearance: none;
  transition: background 0.5s ease;
  border: 0;
  color: #000 !important;
  cursor: pointer;
  float: left;
  font-size: 20px;
  margin: 0;
  width: 30px !important;
  height: 30px !important;
  background: transparent !important;
}

.vnis__input {
  height: 30px !important;
  width: calc(100% - 60px) !important;
}
.product-topping-list .product-topping-list-tag {
  font-size: 0.8rem !important;
}
.product-topping-list .product-topping-list-title {
  font-size: 1.3rem !important;
}
.required-list {
  background: #4caf50 !important;
  color: #ffffff !important;
}
.product-topping-list .product-topping-list-tag {
  background-color: rgb(178 189 255);
  color: #ffffff;
}
.product-topping-list .product-topping-list-indication {
  font-size: 0.9rem !important;
}
.stock_available{
  font-size: 12px !important;
  color: #757575;
  font-weight:400;
  align-self: center;
}


</style>