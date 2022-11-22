<template>
  <v-app>
    <v-main>
      <v-navigation-drawer temporary v-model="sidebar" app 
         id="main"      
         class="blue-grey lighten-5" 
        :class="{'nav-drawer-width-lg': $vuetify.breakpoint. smAndUp, 'nav-drawer-width-sm':$vuetify.breakpoint. xs }">
        <div class="d-flex justify-space-between align-start pt-2">
          <h2 class="pl-5 pt-4">Menu</h2>
          <v-btn @click="sidebar = false" icon>
            <v-icon>mdi-close</v-icon> 
          </v-btn>
        </div>
        <!-- <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="@/assets/images/me.jpg">
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Jeremy Poh
              </v-list-item-title>
              <v-list-item-subtitle class="title">jeremypoh0205@gmail.com</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider> -->
        <br>
        <v-list nav>
          <div @click="openDialog(index)" 
             v-for="(navLink, index) in navLinks" 
             :key="index.title" 
             color="primary">
             <!--if the nav does not have sub menu, use v-list-item-->
              <v-list-item link @click="sidebar=false" 
                 v-if="!navLink.subLinks" 
                 class="nav-drawer-link">
                  <v-list-item-icon class="nav-link">
                    <v-icon 
                      :style="'color:' + system_color.primary_color" 
                      v-text="navLink.icon">
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content> 
                    <v-list-item-title class="nav-link"
                      :style="'color:' + system_color.primary_color">
                      {{ navLink.title }}
                    </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

           <div v-else>
           <!--else, use v-list-group to group the submenu-->

             <v-list-group
               :key="index.title" no-action :value="false">
               <template v-slot:activator >
                 <v-list-item class="nav-drawer-group-link">
                   <v-list-item-icon class="nav-link">
                     <v-icon 
                       :style="'color:' + system_color.primary_color" 
                       v-text="navLink.icon">
                     </v-icon>
                   </v-list-item-icon>
                   <v-list-item-content> 
                     <v-list-item-title 
                       class="nav-link" 
                       style="padding-top:10px" 
                       :style="'color:' + system_color.primary_color">
                       {{ navLink.title }}
                     </v-list-item-title>
                   </v-list-item-content>
                 </v-list-item>
               </template>
 
               <scrollactive :offset="140" :duration="2000" v-if="index==2">
                 <v-list>
                   <v-list-item link @click="sidebar=false"
                      v-for="(cat, i) in product_categories" 
                      :key="i"
                      :href="'#category-' + cat.category_id"
                      class="scrollactive-item nav-drawer-sub-link">
                      <v-list-item-content> 
                        <v-list-item-title class="sub-link"
                        :style="'color:' + system_color.second_color">
                        {{ cat.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                   </v-list-item>
                 </v-list>
               </scrollactive>
 
               <v-list v-if="index==4"> 
                 <v-list-item link 
                   @click="select_country(index); 
                   sidebar=false;"
                   v-for="(country, index) in navLink.subLinks"
                   :key="index"
                   class="nav-drawer-sub-link">
                    <v-img
                      class="sub-link" 
                      max-height="30" max-width="30" contain
                      :src="country.flag">
                    </v-img>
                   <v-list-item-title 
                    :style="'color:' + system_color.second_color"
                    class="pl-2 sub-link" 
                    v-text="country.lang">
                  </v-list-item-title>
                 </v-list-item>
               </v-list>
             </v-list-group>
           </div>
          </div>
        </v-list>

        <div class="d-flex justify-center align-end nav-icon">
          <NuxtLink :to="merchant_domain=='' ? '/'+ merchant_url : merchant_domain" >
            <v-img
              :src="form_data[0].company_logo==''?require('~/assets/images/emenu-logo.jpg'):
              'https://cp.emenu.com.my/product/image.php?m='+form_data[0].merchant_id+'&product_list&im=' + form_data[0].company_logo"
               max-height="60" max-width="120" contain>
            </v-img>
         </NuxtLink>
        </div>
      </v-navigation-drawer>

      <v-app-bar v-scroll-reveal="{ delay: 250, origin:'left', duration: 300}" 
        v-if="form_data[0].display_header == 1" 
        app color="#ECEFF1" height="80px" 
        hide-on-scroll elevation="4"
        :class="{'px-6': $vuetify.breakpoint.mdAndUp}"> 
       <span>
         <v-app-bar-nav-icon @click="sidebar = !sidebar"> 
           <v-icon size="35">mdi-menu</v-icon> 
         </v-app-bar-nav-icon>
       </span>

       <div class="ml-2">    
         <NuxtLink :to="merchant_domain=='' ? '/'+ merchant_url : merchant_domain" >
           <v-img v-if="!mobileNav" 
              :src="form_data[0].company_logo==''?require('~/assets/images/emenu-logo.jpg'):
              'https://cp.emenu.com.my/product/image.php?m='+form_data[0].merchant_id+'&product_list&im=' +form_data[0].company_logo"
                max-height="60" max-width="120" contain>
           </v-img>
         </NuxtLink>
       </div>

       <v-spacer></v-spacer>

       <v-toolbar-title>
        <div class="d-flex align-center">
          <NuxtLink :to="merchant_domain=='' ? '/'+ merchant_url : merchant_domain" >
            <v-img v-if="mobileNav" class="ml-4"  
              :src="form_data[0].company_logo==''?require('~/assets/images/emenu-logo.jpg'):
              'https://cp.emenu.com.my/product/image.php?m='+form_data[0].merchant_id+'&product_list&im=' +form_data[0].company_logo"
                max-height="60" max-width="120" contain>
             </v-img> 
          </NuxtLink>
        </div>
       </v-toolbar-title>
       <v-spacer></v-spacer>

       <!-- <v-btn @click="account_dialog=true" 
         class="hidden-sm-and-up" dark
         :style="'background-color:' + system_color.primary_color" style="border:2px solid white !important">
         Login
       </v-btn> -->
       
       <v-toolbar-items class="hidden-lg-and-down">
         <v-btn id="no-background-hover"
           text
           v-for="(navLink,index) in navLinks"
           :key="index.title">
           <v-icon left dark>{{ navLink.icon }}</v-icon>
           {{ navLink.title }}
         </v-btn>
       </v-toolbar-items>

       <v-menu offset-y open-on-hover transition="scale-transition">
         <template v-slot:activator="{ on, attrs }">
           <v-btn :class="{'body-1': $vuetify.breakpoint. xs, 'title mr-2': $vuetify.breakpoint. smAndUp}" dark 
              :style="'backgroundColor:' + system_color.primary_color" 
              v-bind="attrs" v-on="on">
               Languages
             <v-icon>mdi-menu-down</v-icon>
           </v-btn>
         </template>
         <v-list>
           <v-list-item link no-action
             v-for="(country, index) in countries"
             :key="index"
              @click="select_country(index)">
              <v-img max-height="30" max-width="30" contain
                :src="country.flag">
              </v-img>
              <v-list-item-title 
                 class="pl-2" 
                 v-text="country.lang">
              </v-list-item-title>
           </v-list-item>
         </v-list>
       </v-menu>


      </v-app-bar>
    
      <!-------------------- Dialog Box (when user account button has been clicked) ------------------------->
      <v-dialog v-model="account_dialog" 
        transition="dialog-top-transition" 
        persistent max-width="420px" min-width="360px">
        <template v-slot:default="dialog">
          <div class="d-flex justify-end white">
             <v-btn @click="dialog.value = false" icon >
               <v-icon>
                 mdi-close-circle
               </v-icon>
             </v-btn>
          </div>
          <!--Login Form-->
          <v-tabs v-model="tab" show-arrows >
            <v-tabs-slider :style="'color:' + system_color.primary_color"></v-tabs-slider>
              <v-tab style="width:100%;" :style="'backgroundColor:' + system_color.primary_color" v-if="tab==0" >
                <div class="d-flex flex-column title py-1 white--text">Login
                  <v-icon color="white">mdi-account-arrow-right</v-icon>
                </div>
              </v-tab>
              <v-tab style="width:100%; background-color: #F5F5F5;" v-if="tab==1" >
                <div class="d-flex flex-column title py-1" color="#78909C">Login
                  <v-icon color="#78909C">mdi-account-arrow-right</v-icon>
                </div>
              </v-tab>
                 <v-tab-item>
                   <v-card >
                      <v-card-text>
                        <v-form class="pa-6 caption" ref="loginForm">
                           <!-- <v-text-field outlined clearable
                             name="phoneNo"
                             label="Whatsapp Phone Number (+60)"
                             type="text" 
                             prepend-inner-icon="mdi-whatsapp"
                             required
                           ></v-text-field> -->
      
                           <vue-tel-input-vuetify dense
                              v-model="vueTelVuetifyLogin.phone" v-bind="vueTelVuetifyLogin.props">
                            </vue-tel-input-vuetify>
      
                           <v-text-field outlined dense
                             name="password"
                             label="Password"
                             prepend-inner-icon="mdi-lock-outline" 
                             :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                             :type="showPassword ? 'text' : 'password'"
                             hint="At least 8 characters"
                             @click:append="showPassword =! showPassword"
                             :rules="[rules.required, rules.passValidate]"
                           ></v-text-field>      
      
                           <div class="forgotPass">
                               <p class="body-2">Forget Password? <a href="#" class="text-decoration-none">Reset Now</a></p>
                           </div>                
      
                           <v-hover v-slot="{ hover }">
                             <v-btn @click="login" class="btn-transi white--text" 
                                 block elevation="2" large to="/" 
                                 :style="{ 'background-color': hover ? '#01579B' : '#0091EA' }"> 
                                 LOGIN
                             </v-btn>
                           </v-hover>
                           
                           <v-hover v-slot="{ hover }">
                             <v-btn class="btn-transi white--text mt-2" 
                                 block elevation="2" large to="/" 
                                 :style="{ 'background-color': hover ? '#EF6C00' : '#F57F17' }"> 
                                 CONTINUE AS GUEST
                             </v-btn>
                           </v-hover>
                       </v-form>
      
                       <div class="d-flex justify-center caption">
                           <p class="body-2">Don't have an account? <a href="#" class="text-decoration-none" @click="tab=1">Register Now!</a></p>
                       </div>
      
                     </v-card-text>
                   </v-card>
                 </v-tab-item>
      
             <!--Register Part-->     
             <v-tab v-if="tab==1"
               style="width:100%;" :style="'backgroundColor:' + system_color.primary_color">
               <div class="d-flex flex-column title py-1 white--text">Register
                 <v-icon color="white">mdi-account-plus</v-icon>
               </div>
             </v-tab>
      
             <v-tab v-if="tab==0"
               style="width:100%; background-color: #F5F5F5;">
               <div class="d-flex flex-column title py-1" color="#78909C">Register
                 <v-icon color="#78909C">mdi-account-plus</v-icon>
               </div>   
             </v-tab>
      
             <v-tab-item>
              <v-card>
               <v-card-text>
                  <v-form class="px-6 caption" ref="registerForm">
                    <v-text-field dense v-model="name" outlined clearable name="username" label="Username"
                       type="text"
                       prepend-inner-icon="mdi-account-outline"
                       :rules="[v => !!v || 'Please enter your name']"
                    ></v-text-field>        
                     
                    <v-text-field outlined clearable dense
                       name="email"
                       label="Email"
                       type="email" 
                       prepend-inner-icon="mdi-email-outline"
                       :rules="emailRules"
                     ></v-text-field>
                      
                     <!-- <v-text-field outlined clearable
                      name="phoneNo"
                      label="Whatsapp Phone Number (+60)"
                      type="password" 
                      prepend-inner-icon="mdi-whatsapp"
                      dense
                      required
                     ></v-text-field> -->

                     <v-text-field outlined clearable dense
                       name="password"
                       label="Password"
                       type="password" 
                       prepend-inner-icon="mdi-lock-outline"
                       :rules="[v => !!v || 'Please enter your password']"
                     ></v-text-field>
      
                     <vue-tel-input-vuetify dense
                       v-model="vueTelVuetifyRegister.phone" v-bind="vueTelVuetifyRegister.props">
                     </vue-tel-input-vuetify>
          
                     <v-checkbox input-value="1" class="d-flex align-start" 
                       :rules="[v => !!v || 'Please ensure you read the condition!']"> 
                       <template v-slot:label>
                         <div >
                           By ticking, you are confirming that you have understood and agree with our
                           <v-tooltip bottom>
                             <template v-slot:activator="{ on }">
                               <a target="_blank" href="https://vuetifyjs.com" @click.stop v-on="on">
                                 Terms & Conditions
                               </a>
                             </template>
                             Opens in new window
                           </v-tooltip>
                         </div>
                       </template>
                     </v-checkbox>
                   
                     <v-hover v-slot="{ hover }">
                       <v-btn @click="register" class="btn-transi white--text" 
                           block elevation="5" large to="/" 
                           :style="{ 'background-color': hover ? '#01579B' : '#0091EA' }"> 
                           REGISTER
                       </v-btn>
                     </v-hover>
                  </v-form>
                  <div class="d-flex justify-center caption pt-4">
                      <p class="body-2">If you are our member, <a href="#" class="text-decoration-none" @click="tab=0">Login Now!</a></p>
                  </div>
               </v-card-text>
             </v-card>
           </v-tab-item>
          </v-tabs>
        </template>
      </v-dialog>

      <!----------------------------------- Shipping Details Section (Dialog Box) ------------------------------>
      <v-dialog v-model="shipping_dialog" 
        content-class="my-custom-dialog"
        transition="fab-transition" 
        max-width="680">
        <template v-slot:default="dialog">
          <v-card class="pt-8 pb-4">
            <v-card-text class="shipping-dialog-box">
              <div class="shipping-title-wrap">
                <h1 
                  class="shipping-title font-weight-bold" 
                  :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
                 SHIPPING DETAILS
                </h1>
              </div>
   
              <div v-if="form_data[0].shipping_setting_status=='0'">
                <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
                  <div class="px-4 pb-2 text-grey">
                     <h4 class="font-weight-bold" :class="{'font-size-subtitle-1 text-center': $vuetify.breakpoint. xs }"> 
                        Delivery and Shipping Fee Calculation
                     </h4>
                     <div v-if="merchant_shipping_data[0].status=='0'" class="mt-4">
                       <div class="d-flex justify-center" style="margin-left: -12px"> 
                         <v-icon :style="'color:' + system_color.primary_color" class="quote-icon-font-size">
                           mdi-format-quote-open
                         </v-icon>
                         <div class="east-west-heading">
                           <h4 style="font-weight: bold; color: black"
                            :style="'color:' + system_color.primary_color" 
                            class="pb-2" 
                            :class="{'font-size-subtitle-2': $vuetify.breakpoint. xs}">
                              Western
                           </h4>
                         </div>
                       </div>
                       <span 
                          class="font-size-para">
                          The basic flat rate for west Malaysia is 
                          <strong :style="'color:' + system_color.primary_color">RM {{ merchant_shipping_data[0].first_fee }}</strong>.
                       </span>             
                       <div 
                         class="justify-center font-size-para" 
                         :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                         <v-icon size="20" color="red">mdi-information</v-icon>
                         <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">
                           If purchasing amount more than <strong :style="'color:' + system_color.primary_color">RM {{ merchant_shipping_data[0].price_point }}</strong>,
                           the flat rate will be <strong :style="'color:' + system_color.primary_color">RM {{ merchant_shipping_data[0].second_fee }}.</strong>
                        </span>
                       </div>
                     </div>
 
                     <div v-if="merchant_shipping_data[1].status=='0'" class="mt-10">
                       <div class="d-flex justify-center" style="margin-left: -12px"> 
                         <v-icon :style="'color:' + system_color.primary_color" class="quote-icon-font-size">
                           mdi-format-quote-open
                         </v-icon>
                         <div class="east-west-heading">
                           <h4 style="font-weight: bold; color: black"
                            :style="'color:' + system_color.primary_color" 
                            class="pb-2" 
                            :class="{'font-size-subtitle-2': $vuetify.breakpoint. xs}">
                              Eastern
                           </h4>
                         </div>
                       </div>
                       <span 
                         class="font-size-para">The basic flat rate for east Malaysia is <strong 
                         :style="'color:' + system_color.primary_color">RM {{ merchant_shipping_data[1].first_fee }}</strong>.
                       </span>             
                       <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                         <v-icon size="20" color="red">mdi-information</v-icon>
                         <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">
                           If purchasing amount more than <strong :style="'color:' + system_color.primary_color">RM {{merchant_shipping_data[1].price_point }}</strong>,
                           the flat rate will be <strong :style="'color:' + system_color.primary_color">RM {{ merchant_shipping_data[1].second_fee }}.</strong>
                        </span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              <!---------- Shipping Details According to Postcode ----------->
              <div class="dLogBoxInfo" v-if="form_data[0].shipping_setting_status=='1'" 
                :class="{'mt-4 text-center': $vuetify.breakpoint. xs, 'mt-8': $vuetify.breakpoint. smAndUp }">
                <h4 class="pb-2 font-weight-bold" :class="{'font-size-subtitle-1 text-center': $vuetify.breakpoint. xs }"> 
                  Delivery and Shipping Fee Calculation
                </h4>
                 <div class="pt-1 px-2 font-size-para" :class="{'d-flex justify-center align-center': $vuetify.breakpoint. xs }"
                    v-for="(postcode, i) in JSON.parse(form_data[0].shipping_by_postcode)" :key="i">
                    <ul :class="{'ml-2': $vuetify.breakpoint. smAndUp}">
                      <li style="list-style-type: disc;">  
                          <span :class="{'font-size-caption': $vuetify.breakpoint. xs }">
                             For postcode <strong>{{postcode.postcode_1}}</strong> to postcode <strong>{{postcode.postcode_2}}</strong>: 
                             Shipping fee is <strong>RM{{postcode.shipping_fee}}.</strong>
                          </span>
                            <div class="pt-2" v-for="(shippingCondition, i) in postcode.advanced_shipping_fee" :key="i.advanced_shipping_fee">
                              <div :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                                <v-icon size="20" color="red">mdi-information</v-icon>
                                <span class="pl-1" :class="{'font-size-caption': $vuetify.breakpoint. xs }"> 
                                  Amount spending between <strong>RM{{shippingCondition.total_fee_1}}</strong> - 
                                  <strong>RM{{shippingCondition.total_fee_2}}</strong>, 
                                  shipping fee would be <strong>RM{{shippingCondition.shipping_fee}}.</strong> 
                                </span>
                              </div>
                            </div>
                          <br>
                      </li>
                    </ul>               
                 </div>
              </div>
   
              <!---------- Shipping Details According to Distance ----------->
              <div class="dLogBoxInfo" v-if="form_data[0].shipping_setting_status=='2'" 
                :class="{'mt-4 text-center': $vuetify.breakpoint. xs, 'mt-8': $vuetify.breakpoint. smAndUp }">
                <h4 class="pb-2 font-weight-bold" :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs }"> 
                   Delivery and Shipping Fee Calculation
                </h4>
                <div class="pt-1 px-2 font-size-para" :class="{'d-flex justify-center align-center': $vuetify.breakpoint. xs }"
                   v-for="(distance, i) in JSON.parse(form_data[0].shipping_by_distance)" :key="i">
                   <ul :class="{'ml-2': $vuetify.breakpoint. smAndUp}">
                      <li style="list-style-type: disc;">  
                          <span :class="{'font-size-caption': $vuetify.breakpoint. xs }">For distance <strong>{{distance.distance_1}}</strong>
                            km to distance <strong>{{distance.distance_2}} km</strong>: Shipping fee 
                            is <strong>RM{{distance.shipping_fee}}.</strong>
                          </span>
                            <div class="pt-2" v-for="(distanceCondition, i) in distance.advanced_shipping_fee" :key="i.advanced_shipping_fee">
                              <div :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                                <v-icon class="pr-2" size="20" color="red">mdi-information</v-icon>
                                <span class="pl-1" :class="{'font-size-caption': $vuetify.breakpoint. xs }"> 
                                  Amount spending between <strong>RM{{distanceCondition.total_fee_1}}</strong> 
                                  - <strong>RM{{distanceCondition.total_fee_2}}</strong>: 
                                  Shipping fee would be <strong>RM{{distanceCondition.shipping_fee}}.</strong> 
                                </span>
                              </div>
                            </div>
                          <br>
                      </li>
                    </ul>               
                 </div>
              </div>
   
              <!---------- Shipping Details According to EasyParcel ----------->
              <div v-if="form_data[0].shipping_setting_status=='3'">
                <div class="mt-4 d-flex justify-center">
                  <v-img :src="require('~/assets/images/easyparcel-logo.jpg')"
                     max-height="60" max-width="160" contain>
                  </v-img> 
                </div>
             
                <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
                 <div class="px-4 pb-2">
                    <h4 v-if=" form_data[0].order_min_purchase > -1" class="font-weight-bold pb-2"
                      :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs, 'font-size-headline-2': $vuetify.breakpoint. smAndUp }"> 
                      * Minimum Spending: 
                       <span class="font-weight-regular red--text">RM{{form_data[0].order_min_purchase}}</span>
                    </h4>
                    <h4 class="font-weight-bold" :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs }"> 
                       Delivery and Shipping Fee Calculation
                    </h4>
                    <h5 class="font-weight-regular red--text font-size-para">(Rate will depand on EasyParcel)</h5>
                    <p class="pt-5 text-grey font-size-para">E.g. EasyParcel's free shipping is applied when purchasing more than <strong>RM{{form_data[0].easyparcel_free_shipping_range }}</strong>.</p>             
                    <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                      <v-icon size="20" color="red">mdi-information</v-icon>
                      <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">Check <a href="https://easyparcel.com/my/" 
                         target="_blank" class="text-decoration-none">here</a> to know more the shipping rate!
                      </span>
                    </div>
                 </div>
                </div>
              </div>
   
              <!---------- Shipping Details According to Lalamove ----------->
              <div v-if="form_data[0].shipping_setting_status=='4'">
                <div class="my-4 d-flex justify-center">
                 <v-img :src="require('~/assets/images/lalamove-logo.jpg')"
                    max-height="150" max-width="180" contain>
                 </v-img> 
                </div>
      
                <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
                  <div class="px-4 pb-2 text-grey">
                     <h4 v-if="form_function[0].order_min_purchase > 0" class="font-weight-bold pb-2" 
                       :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs, 'font-size-headline-2': $vuetify.breakpoint. smAndUp }"> 
                       * Minimum Spending: 
                        <span class="font-weight-regular red--text">RM{{form_function[0].order_min_purchase}}</span>
                     </h4>
                     <h4 class="font-weight-bold" :class="{'font-size-subtitle-1 text-center': $vuetify.breakpoint. xs }"> 
                        Delivery and Shipping Fee Calculation
                     </h4>
                     <h5 class="font-weight-regular red--text font-size-para">(Rate will depand on Lalamove)</h5>
                     <p class="pt-5 font-size-para">E.g. Lalamove's free shipping range is applied when purchasing more than <strong>RM{{form_data[0].lalamove_free_shipping_range }}</strong>.</p>             
                     <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                       <v-icon size="20" color="red">mdi-information</v-icon>
                       <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">Check <a href="https://www.lalamove.com/en-my/all-vehicle-pricing-detail" 
                         target="_blank" class="text-decoration-none">here</a> to know more the shipping rate!
                      </span>
                     </div>
                  </div>
                </div>
              </div>
      
            </v-card-text>
            <v-card-actions class="d-flex justify-end white">
              <v-btn class="pl-4" :style="'backgroundColor:' + system_color.primary_color" dark @click="dialog.value = false">Got It
                <v-icon left>
                    mdi-check-circle
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <!----------------- Terms & Condition and Privacy Policies (Dialog Box) ------------------>
      <v-dialog v-model="termsPrivacy_dialog" width="600px" height="400px">
        <template v-slot:default="dialog">
           <v-card class="tnc-section pa-2">
            <!---- Use Component tnc_dialog2 ---->
            <tnc_dialog2 :data_array="tnc_array()"></tnc_dialog2>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn depressed dark 
                 @click="dialog.value = false"
                 :style="'backgroundColor:' + system_color.primary_color">
                 Close
               </v-btn>
             </v-card-actions>
           </v-card>
         </template>
       </v-dialog>
      <!--xxxxxxxxxxxxxxx Terms & Condition and Privacy Policies (Dialog Box) xxxxxxxxxxxxxxxx-->

      <!---------------------- Scroll back To Top ------------------------->
      <scrollactive>
       <v-hover v-slot="{ hover }">        
         <a v-show="scrollUpIcon" href="#main" 
          class="scrollup scrollactive-item" >
          <v-icon :style="{ 'color': hover ? '#000000' : '#696969' }">
            mdi-arrow-up-circle
          </v-icon>
         </a>
       </v-hover>
      </scrollactive>
      <!--xxxxxxxxxxxxxxxxxxx Scroll back To Top xxxxxxxxxxxxxxxxxxxxxxxx-->
     <nuxt /> 
    </v-main>
  </v-app>
</template>


<script>
import tnc_dialog2 from '../components/tnc_dialog2.vue';

export default {
  components: { tnc_dialog2 },
  data () {
    return {
      navbar:false,
      sidebar:false,
      mobileNav:false,
      scrollUpIcon: 0,      
      navLinks:[
        { title: 'Home', icon: 'mdi-home'},
        { title: 'Shipping', icon: 'mdi-truck' },
        { 
          title: 'Categories', 
          icon: 'mdi-shape',
          subLinks: [
          ]
        },
        { title: 'Terms and Services', icon: 'mdi-file-document-check' },
        {
          title: 'Languages',
          icon: 'mdi-truck',
          subLinks: [
            {
              lang: "English",
              flag:
                "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png",
    
            },
            {
              lang: "Bahasa Melayu",
              flag: "https://cdn.countryflags.com/thumbs/malaysia/flag-800.png",
    
            },
            {
              lang: "Mandarin",
              flag: "https://cdn.countryflags.com/thumbs/china/flag-800.png",
            },
          ]
        }
        //{ title: 'Login/Register As Member', icon: 'mdi-account-plus' },        
      ],
      
      countries: [
        {
          lang: "English",
          prefix:'en',
          flag:
            "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png",

        },
        {
          lang: "BahasaMelayu",
          prefix:'ms',
          flag: "https://cdn.countryflags.com/thumbs/malaysia/flag-800.png",

        },
        {
          lang: "Mandarin",
          prefix:'zh',
          flag: "https://cdn.countryflags.com/thumbs/china/flag-800.png",
        },
      ],

      // ----- Account Login Register Section ----- //
      tab:0,
      name: '',
      email:'',
      password:'',
      showPassword: false,
      formHasErrors: false,
      emailRules: [
        value => !!value || "Please enter your email",
        value => /.+@.+\..+/.test(value) || "Email must be valid (e.g. jeremy14@gmail.com) "
      ],
      rules: {
         required: value => !!value || "Please enter your password",
         passValidate: (value) => (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) || 'Minimum 8 characters, One capital latter, Special charater, Number',
      },

      vueTelVuetifyLogin: {
        phone:'',
        props:{
          name:'phoneNo',
          mode: "international",
          outlined:true,
          autofocus: false,
          hint:'e.g. +60111223112 (MY)',
          label:'Enter your phone number',
          onlyCountries: ["MY", "SG"],
          fetchCountry: true,
          inputOptions: {
            showDialCode: true,
          },
        }
      },

      vueTelVuetifyRegister: {
        phone:'',
        props:{
          name:'phoneNo',
          mode: "international",
          outlined:true,
          autofocus: false,
          hint:'e.g. +60111223112 (MY)',
          label:'Enter your phone number',
          onlyCountries: ["MY", "SG"],          
          fetchCountry: true,
          inputOptions: {
            showDialCode: true,
          },
        }
      },
     // xxxxx Account Login Register Section xxxxx- //

      shipping_dialog:false,
      distance_dialog:false,
      lalamove_dialog:false,
      easyparcel_dialog:false,
      account_dialog:false,
      termsPrivacy_dialog:false,
    }
  },

  created() {
     window.addEventListener('resize', this.checkScreen);
     this.checkScreen();
   },

  mounted() {
      window.addEventListener('scroll', this.updateScroll)
   },

    computed:{    
      form_data(){
          return this.$store.state.form_data;
      },

      system_color(){
        return this.$store.state.system_color;
      },

      merchant_shipping_data(){
        return this.$store.state.merchant_east_west;
      },

      merchant_url(){
        return this.$store.state.merchant_url;
      },

      merchant_domain(){
        return this.$store.state.merchant_domain;
      },

      product_categories(){
        return this.$store.state.product_categories;
      },
    },

   methods:{
    //check the screen size for responsive use
    checkScreen(){
       this.windowWidth = window.innerWidth;
       if(this.windowWidth <= 599) {
           this.mobileNav = true;
           return;
       }
       //else set logo to false if more than 600px
       this.mobileNav = false;
       return;
    },

    //check the scroll position
    updateScroll() {
       const scrollPosition = window.scrollY;
       if(scrollPosition > 150) {
           this.scrollUpIcon = true;
           return;
       }
       this.scrollUpIcon = false;
       return;
    },

    //open dialog from nav drawer
    openDialog(index){
      if(index == 0) {
        var link = ''
        if(this.merchant_domain !== ''){
          link = this.merchant_domain;
        }
        else{
          link = '/'+this.merchant_url
        }
        window.location.replace(link);
      }
      else if(index == 1){
        this.shipping_dialog = true;
      }
      else if(index == 3){
        this.termsPrivacy_dialog = true
      }
    },

    select_country(index) {
      this.$store.commit('changelocale', this.countries[index].prefix);
    },
    
    /*
    login() {
      this.$refs.loginForm.validate()
    },

    register() {
      this.$refs.registerForm.validate()
    },
    */

    tnc_array(){
        var array=[];
        var link=''
        if(this.form_data[0].domain!==''){
          link=this.form_data[0].domain;
        }else{
          link='www.emenu.com.my/'+this.form_data[0].url;
        }
        array.push({
          company_name: this.form_data[0].company_name,
          company_address: this.form_data[0].address,
          company_phone: this.form_data[0].company_phone,
          company_email: this.form_data[0].company_email,
          registration_no: this.form_data[0].registration_no,
          site_url: link,
        });

        return array;
    },
  },
}
</script>

<style>

:root{
  --main-color: rgb(10, 21, 58);
  --font-size-display1: 34px;
  --font-size-headline: 24px;
  --font-size-headline-2: 16px;
  --font-size-subtitle-1: 15px;
  --font-size-paragraph: 14px;
  --font-size-caption: 12px;
}

.font-size-display1{
  font-size: var(--font-size-display1);
}

.font-size-headline{
  font-size: var(--font-size-headline);
}

.font-size-headline-2{
  font-size: var(--font-size-headline-2);
}

.font-size-subtitle-1{
  font-size: var(--font-size-subtitle-1);
}

.font-size-para{
  font-size: var(--font-size-paragraph);
}

.font-size-caption{
  font-size: var(--font-size-caption);
}

::-webkit-scrollbar{
  width: 1rem;
  background-color: #CFD8DC;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb{
  background-color: hsl(228, 8%, 64%);
  width: .5rem;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover{
  background-color: hsl(228, 8%, 54%);
}

.scrollup{
  position: fixed;
  display: inline-flex;
  left: 2rem;
  bottom: 10%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;  
  padding: .7rem;
  border-radius: .25rem;
  color: black;
  font-size: 1.25rem;
  z-index: 1000;
  transition: 2s all;
  animation: slideInUp; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1.5s; 
}

.scrollup:hover{
  transform: translateY(-.5rem);
}

/* ------- Header -------- */
/* for header navigation */
.nav-drawer-width-lg{
  width: 350px !important;
}

.nav-drawer-width-sm{
  width: 550px !important;
}

.nav-drawer-link,
.nav-drawer-group-link {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: bold;
}

.nav-drawer-group-link{
  margin-left: -8px;
  max-height: 48px;
}

.nav-drawer-sub-link{
  padding-left: 80px !important;
  font-weight: 400 !important;
}

.nav-drawer-link .nav-link,
.nav-drawer-group-link .nav-link,
.nav-drawer-sub-link .sub-link{
  transition: .3s all ease-in;
}

.nav-drawer-link:hover .nav-link,
.nav-drawer-group-link:hover .nav-link,
.nav-drawer-sub-link:hover .sub-link{
  transform: translateX(10px) !important;
}

/* change the nav-drawer active icon color */
.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon{
  color:  black;
}

/* let the nav drawer z-index higher */
.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close), 
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  z-index: 999;
}

.nav-icon{
  margin:100px 0;
}

/* for button no hover effect in navigation*/
#no-background-hover::before{
  background-color: transparent !important;
}

/* for nav link underline hover effect */
.v-toolbar__items .v-btn__content::after{
  content: "";
	position: absolute;
	width: 100%;
	height: 2px;
	background-color: black;
  bottom: -5px;
	left: 0;
	transform: scaleX(0);
	transform-origin: bottom right;
	transition: transform 0.25s linear;
}

.v-toolbar__items .v-btn__content:hover::after{
	transform-origin: bottom left;
	transform: scaleX(1);
}
/* xxxxxx Header xxxxxx */


/* ------- Dialog Box Account (Login/Register) ------- /*
/* change default border color of input-field */
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    color: rgba(169, 169, 169, 0.33);
    border: 2px solid rgba(169, 169, 169, 0.33);
}

/* for checkbox label*/ 
.v-input--selection-controls .v-input__slot > .v-label{
  font-size: 14px; 
}

/* for tabs header (account register and login) */
.theme--light.v-tabs > .v-tabs-bar{
  height: 100%;
}
/* xxxxxx Dialog Box Account (Login/Register) xxxxxx /*

/* ---- For dialog box (shipping) ---- */
.shipping-dialog-box{
  font-family: 'Montserrat', sans-serif !important;
  letter-spacing: -0.3px;
  font-weight: 500;
  line-height: 20px;
}

.shipping-title-wrap{
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 8px;
  background: #E3F2FD;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
  
.shipping-title{
  text-align: center;
  position: relative;
  display: inline-block;
  color: #212529;
}

.shipping-title::after{
  content: '';
  position: absolute;
  left: 37%;
  border-radius: 5px;
  bottom: 0;
  width: 100px;
  height: 2px;
  background-color:#E53935;
}

.dLogBoxInfo{
  background-color: #E3F2FD;
  border-radius: 5px;
  padding: 12px;
  line-height: 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;}

.text-grey{
  color:#6c757d;
}

.quote-icon-font-size{
  font-size: 26px !important;
  margin-top: -40px;
}

.east-west-heading{
  position: relative;
}
/* xxxx for dialog box (shipping) xxxx */

/* ---- Terms & Condition and Privacy Policies ----*/
.tnc-section{
  font-family:'Times New Roman', Times, serif !important;
  color: #6c757d !important;
}

.tnc-title{
  position: relative;
  font-weight: 500 !important;
  color:#212529 !important
}

.tnc-title::after{
  content: '';
  position: absolute;
  left:0;
  border-radius: 5px;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: rgb(10, 21, 58);
}

.tnc-description{
  font-family:'Helvetica';
  text-align: justify;  
  font-size: 14px;
  line-height: 20px;
}

.tnc-category{
  font-size: 16px;
  font-weight: bold;
}

.tnc-cat-description{
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
}
/* xxxx  Terms & Condition and Privacy Policies xxxx */

.v-btn:not(.v-btn--round).v-size--large{
  transition: 0.5s ease !important;
}

@media screen and (max-width: 599px) {
  .scrollup{
    left: 45%;
    bottom: 4%;
    padding: .5rem;
    font-size: 1rem;
  }
  
  .shipping-title::after {
    left: 39%;
    width: 60px;
  }

  .quote-icon-font-size{
    font-size: 20px !important;
  }

  .tnc-title{
    font-size: 24px;
  }
}

@media screen and (max-width: 380px) {
  .tnc-description {
    text-align: left;
  }
}
/* ========= Header ========= */
</style>
