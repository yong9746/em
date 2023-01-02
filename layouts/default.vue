<template>
  <v-app>
    <v-main>
      <v-overlay :value="page_loading">
        <v-progress-circular indeterminate size="65"> </v-progress-circular>
      </v-overlay>
      <v-navigation-drawer
        temporary
        v-model="sidebar"
        app
        class="blue-grey lighten-5"
        :class="{
          'nav-drawer-width-lg': $vuetify.breakpoint.smAndUp,
          'nav-drawer-width-sm': $vuetify.breakpoint.xs
        }"
      >
        <div class="d-flex justify-space-between align-start pt-2 pr-1">
          <h2 class="pl-5 pt-4">Menu</h2>
          <v-btn
            @click="sidebar = false"
            fab
            color="#DEE0E5"
            x-small
            elevation="0"
          >
            <v-hover v-slot="{ hover }">
              <v-icon :style="{ color: hover ? 'black' : '#78909C' }">
                mdi-close
              </v-icon>
            </v-hover>
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
        <br />
        <v-list nav>
          <div
            @click="openDialog(index)"
            v-for="(navLink, index) in navLinks"
            :key="index.title"
            color="primary"
          >
            <!--if the nav does not have sub menu, use v-list-item-->
            <v-list-item
              link
              @click="sidebar = false"
              v-if="!navLink.subLinks"
              class="nav-drawer-link"
            >
              <v-list-item-icon class="nav-link">
                <v-icon
                  :style="'color:' + system_color.primary_color"
                  v-text="navLink.icon"
                >
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="nav-link"
                  :style="'color:' + system_color.primary_color"
                >
                  {{ navLink.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <div v-else>
              <!--else, use v-list-group to group the submenu-->

              <v-list-group :key="index.title" no-action :value="false">
                <template v-slot:activator>
                  <v-list-item class="nav-drawer-group-link">
                    <v-list-item-icon class="nav-link">
                      <v-icon
                        :style="'color:' + system_color.primary_color"
                        v-text="navLink.icon"
                      >
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        class="nav-link"
                        style="padding-top: 10px"
                        :style="'color:' + system_color.primary_color"
                      >
                        {{ navLink.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <scrollactive :offset="140" :duration="2000" v-if="index == 2">
                  <v-list>
                    <v-list-item
                      link
                      @click="sidebar = false"
                      v-for="(cat, i) in product_categories"
                      :key="i"
                      :href="'#category-' + cat.category_id"
                      class="scrollactive-item nav-drawer-sub-link"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="sub-link"
                          :style="'color:' + system_color.second_color"
                        >
                          {{ cat.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </scrollactive>

                <v-list v-if="index == 4">
                  <v-list-item
                    link
                    @click="
                      select_languages_menu(index);
                      sidebar = false;
                    "
                    v-for="(language, index) in navLink.subLinks"
                    :key="index"
                    class="nav-drawer-sub-link"
                  >
                    <v-img
                      max-height="30"
                      max-width="30"
                      contain
                      class="sub-link"
                      :src="language.flag"
                    >
                    </v-img>
                    <v-list-item-title
                      :style="'color:' + system_color.second_color"
                      class="pl-2 sub-link"
                      v-text="language.lang"
                    >
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-list-group>
            </div>
          </div>
        </v-list>

        <div class="d-flex justify-center align-end nav-icon">
          <NuxtLink
            :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
          >
            <v-img
              :src="
                form_data[0].company_logo == ''
                  ? require('~/assets/images/emenu-logo.jpg')
                  : 'https://cp.emenu.com.my/product/image.php?m=' +
                    form_data[0].merchant_id +
                    '&product_list&im=' +
                    form_data[0].company_logo
              "
              max-height="60"
              max-width="120"
              contain
            >
            </v-img>
          </NuxtLink>
        </div>
      </v-navigation-drawer>

      <v-app-bar
        id="main"
        class="app-bar"
        app
        color="#ECEFF1"
        height="80px"
        hide-on-scroll
        elevation="4"
        :class="{ 'px-6': $vuetify.breakpoint.mdAndUp }"
      >
        <span>
          <v-app-bar-nav-icon @click="sidebar = !sidebar">
            <v-icon size="35">mdi-menu</v-icon>
          </v-app-bar-nav-icon>
        </span>

        <div class="ml-2 hidden-xs-only" style="z-index: 10000 !important">
          <NuxtLink
            :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
          >
            <v-img
              :src="
                form_data[0].company_logo == ''
                  ? require('~/assets/images/emenu-logo.jpg')
                  : 'https://cp.emenu.com.my/product/image.php?m=' +
                    form_data[0].merchant_id +
                    '&product_list&im=' +
                    form_data[0].company_logo
              "
              max-height="60"
              max-width="120"
              contain
            >
            </v-img>
          </NuxtLink>
        </div>

        <!-- <v-toolbar-title>
        <div style="z-index:10000 !important">
          <NuxtLink :to="merchant_domain=='' ? '/'+ merchant_url : merchant_domain" >
            <v-img v-if="mobileNav" class="ml-4"  
              :src="form_data[0].company_logo==''?require('~/assets/images/emenu-logo.jpg'):
              'https://cp.emenu.com.my/product/image.php?m='+form_data[0].merchant_id+'&product_list&im=' +form_data[0].company_logo"
              max-height="60" max-width="120" contain>
             </v-img> 
          </NuxtLink>
        </div>
       </v-toolbar-title> -->
        <v-spacer></v-spacer>

        <!-- <v-btn @click="account_dialog=true" 
         class="hidden-sm-and-up" dark
         :style="'background-color:' + system_color.primary_color" style="border:2px solid white !important">
         Login
       </v-btn> -->

        <v-toolbar-items class="hidden">
          <v-btn
            id="no-background-hover"
            text
            v-for="(navLink, index) in navLinks"
            :key="index.title"
          >
            <v-icon left dark>{{ navLink.icon }}</v-icon>
            {{ navLink.title }}
          </v-btn>
        </v-toolbar-items>

        <v-row
          class="d-flex justify-end align-center"
          style="margin-left: 25px"
        >
          <v-col class="d-flex language-section">
            <v-img
              :src="require('~/assets/images/lang.svg')"
              width="26"
              contain
            >
            </v-img>

            <v-select
              @change="select_languages"
              v-model="selectedLang"
              return-object
              :items="items"
              :menu-props="{ bottom: true, offsetY: true }"
              solo
              flat
              item-text="lang"
              style="height: 45px; font-weight: bold"
              color="black"
              item-color="blue darken-1"
              background-color="transparent"
            >
              <template v-slot:selection="data">
                {{ data.item.prefix }}
              </template>

              <template v-slot:item="data">
                <v-img
                  max-height="25"
                  max-width="25"
                  contain
                  class="mr-1"
                  :src="data.item.flag"
                >
                </v-img>
                {{ data.item.lang }}
              </template>
            </v-select>
          </v-col>
        </v-row>

        <!-- <v-menu offset-y open-on-hover transition="scale-transition">
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
              @click="select_languages_menu(index)">
              <v-img max-height="30" max-width="30" contain
                :src="country.flag">
              </v-img>
              <v-list-item-title 
                 class="pl-2" 
                 v-text="country.lang">
              </v-list-item-title>
           </v-list-item>
         </v-list>
       </v-menu> -->

        <v-btn
          text
          @click="check_login()"
          :ripple="false"
          id="no-background-hover"
          class="ml-2 user-acc"
          style="
            padding: 2px 0 0 0 !important;
            letter-spacing: 0.1px;
            font-weight: bold;
            font-size: 15px;
          "
        >
          <v-img
            :src="require('~/assets/images/account-icon.png')"
            max-height="30"
            contain
          >
          </v-img>
          <span style="padding-top: 2px" v-if="login_data[0].status == 1">{{
            login_data[0].user_detail.name
          }}</span>
          <span style="padding-top: 2px" v-else> LOGIN</span>
        </v-btn>
      </v-app-bar>

      <!--------- Account Bar ------------->
      <v-navigation-drawer
        temporary
        v-model="accountbar"
        app
        fixed
        right
        class="blue-grey lighten-5"
        :class="{
          'nav-drawer-width-lg': $vuetify.breakpoint.smAndUp,
          'nav-drawer-width-sm': $vuetify.breakpoint.xs
        }"
      >
        <div class="pl-2 pt-2">
          <v-btn
            @click="accountbar = false"
            fab
            color="#DEE0E5"
            x-small
            elevation="0"
          >
            <v-hover v-slot="{ hover }">
              <v-icon :style="{ color: hover ? 'black' : '#78909C' }">
                mdi-close
              </v-icon>
            </v-hover>
          </v-btn>
        </div>

        <v-container class="d-flex align-center justify-center flex-column">
          <v-avatar size="140">
            <v-img
              cover
              :src="
                profile_img == ''
                  ? require('@/assets/images/customer-logo.png')
                  : 'https://user.lkmng.com/image/' +
                    form_data[0].merchant_id +
                    '/' +
                    profile_img
              "
            ></v-img>
          </v-avatar>
          <div style="font-family: Montserrat, sans-serif !important">
            <h4
              class="text-center pt-3 font-weight-bold"
              style="font-size: 22px"
            >
              {{ login_data[0].user_detail.name }}
            </h4>
            <h6
              class="text-center font-weight-bold blue-grey--text text--lighten-"
              style="font-size: 12px"
            >
              {{ login_data[0].user_detail.email }}
            </h6>
          </div>
        </v-container>

        <v-divider style="margin: 5px 15px"></v-divider>

        <v-list>
          <v-list-item-group :value="selected">
            <v-list-item
              link
              @click="
                accLink_onclick(index);
                selected = index;
                accountbar = false;
              "
              v-for="(accountLink, index) in accountLinks"
              :key="index"
              color="primary"
              class="nav-drawer-link"
            >
              <v-list-item-icon class="nav-link">
                <v-icon
                  :style="'color:' + system_color.primary_color"
                  v-text="accountLink.icon"
                >
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="nav-link"
                  :style="'color:' + system_color.primary_color"
                >
                  {{ accountLink.title }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-------------------- Dialog Box (when user account button has been clicked) ------------------------->
      <v-dialog
        v-model="account_dialog"
        transition="dialog-top-transition"
        persistent
        max-width="420px"
        min-width="360px"
      >
        <template v-slot:default="dialog">
          <div class="d-flex justify-end white">
            <v-btn @click="dialog.value = false" icon>
              <v-icon> mdi-close-circle </v-icon>
            </v-btn>
          </div>
          <!--Login Form-->
          <v-tabs v-model="tab" show-arrows>
            <v-tabs-slider
              :style="'color:' + system_color.primary_color"
            ></v-tabs-slider>
            <v-tab
              style="width: 100%"
              :style="'backgroundColor:' + system_color.primary_color"
              v-if="tab == 0"
            >
              <div class="d-flex flex-column title py-1 white--text">
                Login
                <v-icon color="white">mdi-account-arrow-right</v-icon>
              </div>
            </v-tab>
            <v-tab
              style="width: 100%; background-color: #f5f5f5"
              v-if="tab == 1"
            >
              <div class="d-flex flex-column title py-1" color="#78909C">
                Login
                <v-icon color="#78909C">mdi-account-arrow-right</v-icon>
              </div>
            </v-tab>
            <v-tab-item>
              <v-card>
                <v-card-text>
                  <v-form class="pa-6 caption loginForm" ref="loginForm">
                    <vue-tel-input-vuetify
                      v-on:country-changed="countryChangedLogin"
                      @validate="onInputLogin"
                      :rules="[v => !!v || 'Please enter your phone number']"
                      v-bind="vueTelVuetifyLogin.props"
                      v-model="vueTelVuetifyLogin.phoneNo"
                      dense
                      clear-icon="mdi-close-circle"
                      clearable
                      required
                    >
                    </vue-tel-input-vuetify>

                    <v-text-field
                      outlined
                      dense
                      clearable
                      name="password"
                      label="Password"
                      v-model="loginPassword"
                      prepend-inner-icon="mdi-lock-outline"
                      :append-icon="
                        showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showLoginPassword ? 'text' : 'password'"
                      @click:append="showLoginPassword = !showLoginPassword"
                      :rules="[rules.required]"
                    ></v-text-field>

                    <!-- <div class="forgotPass">
                               <p class="font-size-caption">Forget Password? <a href="#" class="text-decoration-none">Reset Now</a></p>
                           </div>       -->

                    <!-- :value="statusLOGIN" -->
                    <v-btn
                      @click="get_login()"
                      class="btn-transi white--text mt-3"
                      block
                      elevation="2"
                      large
                      :style="'backgroundColor:' + system_color.primary_color"
                    >
                      LOGIN
                    </v-btn>
                    <input @keyup.enter="get_login" />

                    <v-btn
                      class="btn-transi white--text mt-2"
                      block
                      elevation="2"
                      large
                      :style="'backgroundColor:' + system_color.second_color"
                    >
                      CONTINUE AS GUEST
                    </v-btn>

                    <!-- <v-hover v-slot="{ hover }">
                             <v-btn @click="login" class="btn-transi white--text" 
                                 block elevation="2" large 
                                 :style="{ 'background-color': hover ? '#01579B' : '#0091EA' }"> 
                                 LOGIN
                             </v-btn>
                           </v-hover>
                           
                           <v-hover v-slot="{ hover }">
                             <v-btn class="btn-transi white--text mt-2" 
                                 block elevation="2" large 
                                 :style="{ 'background-color': hover ? '#EF6C00' : '#F57F17' }"> 
                                 CONTINUE AS GUEST
                             </v-btn>
                           </v-hover> -->
                  </v-form>

                  <div class="d-flex justify-center caption">
                    <p class="font-size-caption">
                      Don't have an account?
                      <a href="#" class="text-decoration-none" @click="tab = 1"
                        >Register Now!</a
                      >
                    </p>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!--Register Part-->
            <v-tab
              v-if="tab == 1"
              style="width: 100%"
              :style="'backgroundColor:' + system_color.primary_color"
            >
              <div class="d-flex flex-column title py-1 white--text">
                Register
                <v-icon color="white">mdi-account-plus</v-icon>
              </div>
            </v-tab>

            <v-tab
              v-if="tab == 0"
              style="width: 100%; background-color: #f5f5f5"
            >
              <div class="d-flex flex-column title py-1" color="#78909C">
                Register
                <v-icon color="#78909C">mdi-account-plus</v-icon>
              </div>
            </v-tab>

            <v-tab-item>
              <v-card>
                <v-card-text>
                  <v-form class="px-6 caption registerForm" ref="registerForm">
                    <!-- <Transition>
                    <div class="mb-3" v-show="error_me!==''">
                      <h3 class="animate__animated animate__tada animate__faster animate__delay-.5s" style="text-align:center; color: red; font-weight: bold;">
                        {{error_me}}
                      </h3>
                    </div>
                  </Transition> -->

                    <!-- {{error_me!==''?error_me:""}} -->

                    <v-text-field
                      v-model="userName"
                      dense
                      outlined
                      clearable
                      name="username"
                      label="Username"
                      type="text"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="[v => !!v || 'Please enter your name']"
                    ></v-text-field>

                    <v-text-field
                      outlined
                      clearable
                      dense
                      v-model="registerEmail"
                      name="email"
                      label="Email"
                      type="email"
                      prepend-inner-icon="mdi-email-outline"
                      :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                      outlined
                      clearable
                      dense
                      name="password"
                      label="Password"
                      prepend-inner-icon="mdi-lock-outline"
                      v-model="registerPassword"
                      :append-icon="
                        showRegisterPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showRegisterPassword ? 'text' : 'password'"
                      @click:append="
                        showRegisterPassword = !showRegisterPassword
                      "
                      :rules="[rules.required, rules.passValidate]"
                    >
                    </v-text-field>

                    <vue-tel-input-vuetify
                      @validate="onInputRegister"
                      v-on:country-changed="countryChangedRegister"
                      :rules="vueTelVuetifyRegister.phoneNoRules"
                      v-model="vueTelVuetifyRegister.phoneNo"
                      v-bind="vueTelVuetifyRegister.props"
                      clear-icon="mdi-close-circle"
                      dense
                      clearable
                      required
                    >
                    </vue-tel-input-vuetify>

                    <v-checkbox
                      input-value="1"
                      class="mt-n4"
                      :class="{ 'mt-n8': $vuetify.breakpoint.width < 468 }"
                      :rules="[
                        v => !!v || 'Please ensure you read the condition!'
                      ]"
                    >
                      <template v-slot:label>
                        <div
                          class="pt-3"
                          :class="{ 'pt-8': $vuetify.breakpoint.width < 468 }"
                        >
                          By ticking, you are confirming that you have
                          understood and agree with our
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <a @click="termsPrivacy_dialog = true" v-on="on">
                                Terms & Conditions
                              </a>
                            </template>
                            Read Me
                          </v-tooltip>
                        </div>
                      </template>
                    </v-checkbox>

                    <v-btn
                      @click="get_register()"
                      block
                      elevation="5"
                      large
                      dark
                      class="mt-2"
                      :style="'backgroundColor:' + system_color.primary_color"
                    >
                      REGISTER
                    </v-btn>

                    <!-- <v-hover v-slot="{ hover }">
                       <v-btn @click="register" class="btn-transi white--text" 
                           block elevation="5" large 
                           :style="{ 'background-color': hover ? '#01579B' : '#0091EA' }"> 
                           REGISTER
                       </v-btn>
                     </v-hover> -->
                  </v-form>
                  <div class="d-flex justify-center pt-4">
                    <p class="font-size-caption">
                      If you are our member,
                      <a href="#" class="text-decoration-none" @click="tab = 0"
                        >Login Now!</a
                      >
                    </p>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </template>
      </v-dialog>

      <!------------- Dialog Box (For Login)  ----------->
      <v-dialog v-model="login_dialog" width="450">
        <v-card>
          <div class="d-flex justify-end pt-2 pr-2">
            <v-hover v-slot="{ hover }">
              <v-icon
                @click="login_dialog = false"
                :style="{ color: hover ? 'black' : '#78909C' }"
              >
                mdi-close
              </v-icon>
            </v-hover>
          </div>

          <div
            v-if="login_data[0].status == 1"
            class="login-register-container text-center"
          >
            <v-img
              max-height="100"
              max-width="100"
              contain
              :src="require('~/assets/images/check-icon-2.png')"
            >
            </v-img>
            <h2
              :class="{ 'font-size-headline': $vuetify.breakpoint.xs }"
              style="
                font-family: Montserrat, sans-serif !important;
                padding-top: 10px;
              "
            >
              WELCOME BACK!
            </h2>
            <p style="font-weight: 300; padding: 0 20px; line-height: 35px">
              It's nice to meet you again.<br />
              Enjoy and continue your shopping journey with us!
            </p>

            <v-btn
              class="btn-explore mt-n3"
              :style="'backgroundColor:' + system_color.primary_color"
              dark
              elevation="0"
              @click="login_dialog = false"
            >
              EXPLORE NOW
            </v-btn>
          </div>

          <div v-else class="login-register-container text-center">
            <v-img
              max-height="100"
              max-width="100"
              contain
              class="animate__animated animate__swing animate__delay-.1s"
              :src="require('~/assets/images/close-icon.png')"
            >
            </v-img>
            <h4
              :class="{
                'font-size-headline': $vuetify.breakpoint.xs,
                'font-size-display3': $vuetify.breakpoint.smAndUp
              }"
              class="animate__animated animate__shakeX animate__delay-.5s"
              style="
                font-family: Montserrat, sans-serif !important;
                font-weight: bold;
                letter-spacing: -1px;
                color: #e32727;
              "
            >
              {{ login_regis_msg }}
            </h4>
            <p style="font-weight: 300; padding: 0 20px">
              Sorry, we found that the data you key in do not match our
              candidates.<br />
              Please try again and check carefully.
            </p>

            <v-btn
              class="btn-explore mt-n3"
              :style="'backgroundColor:' + system_color.primary_color"
              dark
              elevation="0"
              @click="
                login_dialog = false;
                account_dialog = true;
              "
            >
              TRY AGAIN
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <!------------- Dialog Box (For Registering)  ----------->
      <v-dialog v-model="register_dialog" width="450">
        <v-card>
          <div class="d-flex justify-end pt-2 pr-2">
            <v-hover v-slot="{ hover }">
              <v-icon
                @click="register_dialog = false"
                :style="{ color: hover ? 'black' : '#78909C' }"
              >
                mdi-close
              </v-icon>
            </v-hover>
          </div>

          <div
            v-if="registerStatus"
            class="login-register-container text-center"
          >
            <v-img
              max-height="100"
              max-width="100"
              contain
              :src="require('~/assets/images/check-icon-2.png')"
            >
            </v-img>
            <h2
              :class="{ 'font-size-headline': $vuetify.breakpoint.xs }"
              style="
                font-family: Montserrat, sans-serif !important;
                padding-top: 10px;
              "
            >
              {{ login_regis_msg }}
            </h2>
            <p style="font-weight: 300; padding: 0 40px; line-height: 30px">
              Thanks for signing up!<br />
              Welcome to {{ form_data[0].company_name }}. We are happy to have
              you on board.
            </p>

            <v-btn
              class="btn-explore mt-n3"
              :style="'backgroundColor:' + system_color.primary_color"
              dark
              elevation="0"
              @click="
                register_dialog = false;
                account_dialog = true;
                tab = 0;
              "
            >
              LOGIN NOW
            </v-btn>
          </div>

          <div v-else class="login-register-container text-center">
            <v-img
              max-height="100"
              max-width="100"
              contain
              class="animate__animated animate__swing animate__delay-.1s"
              :src="require('~/assets/images/close-icon.png')"
            >
            </v-img>
            <h4
              :class="{
                'font-size-headline': $vuetify.breakpoint.xs,
                'font-size-display3': $vuetify.breakpoint.smAndUp
              }"
              class="animate__animated animate__shakeX animate__delay-.5s"
              style="
                font-family: Montserrat, sans-serif !important;
                font-weight: bold;
                letter-spacing: -1px;
                color: #e32727;
              "
            >
              {{ login_regis_msg }}
            </h4>
            <p style="font-weight: 300; padding: 0 20px">
              Sorry, we found that the data you key in has been used for
              registering as our member. You may
              <a
                @click="
                  tab = 0;
                  account_dialog = true;
                  register_dialog = false;
                "
                >login</a
              >
              to proceed.
            </p>

            <v-btn
              class="btn-explore mt-n3"
              :style="'backgroundColor:' + system_color.primary_color"
              dark
              elevation="0"
              @click="
                register_dialog = false;
                account_dialog = true;
              "
            >
              TRY AGAIN
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <!----------------------------------- Shipping Details Section (Dialog Box) ------------------------------>
      <v-dialog
        v-model="shipping_dialog"
        transition="fab-transition"
        max-width="680"
      >
        <template v-slot:default="dialog">
          <v-card class="pt-8 pb-4">
            <v-card-text class="shipping-dialog-box">
              <div class="shipping-title-wrap">
                <h1
                  class="shipping-title font-weight-bold"
                  :class="{
                    'font-size-headline': $vuetify.breakpoint.xs,
                    'font-size-display1': $vuetify.breakpoint.smAndUp
                  }"
                >
                  SHIPPING DETAILS
                </h1>
              </div>

              <!---------- Shipping Details According to Western Or Eastern ----------->
              <!---------- Eastern ----------->
              <!-- <div v-if="shipping_setting_status=='0'">
                <div v-if="westMalaysia.status=='0'">
                  <div class="mt-10 mb-6 d-flex justify-center" style="margin-left: -26px"> -->
              <!-- <v-icon :style="'color:' + system_color.primary_color" class="quote-icon-font-size">
                      mdi-format-quote-open
                    </v-icon> -->
              <!-- <div class="east-west-heading ml-8">
                      <h1 class="east-heading">Malaysia</h1>
                      <h2 class="east-heading2"
                        :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
                        Eastern
                      </h2>
                    </div>
                  </div>
                  <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
                    <div class="px-4 pb-2 text-grey">
                       <h4 class="font-weight-bold" :class="{'font-size-subtitle text-center': $vuetify.breakpoint. xs }"> 
                          Delivery and Shipping Fee Calculation
                       </h4>
                       <p class="pt-5 font-size-para">The basic flat rate for east Malaysia is <strong :style="'color:' + system_color.primary_color">RM {{ eastMalaysia.first_fee }}</strong>.</p>             
                       <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                         <v-icon size="20" color="red">mdi-information</v-icon>
                         <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">
                           If purchasing amount more than <strong :style="'color:' + system_color.primary_color">RM {{ eastMalaysia.price_point }}</strong>,
                           the flat rate will be <strong :style="'color:' + system_color.primary_color">RM {{ eastMalaysia.second_fee }}.</strong>
                        </span>
                       </div>
                    </div>
                  </div>
                </div> -->

              <!---------- Western ----------->
              <!-- <div v-if="eastMalaysia.status=='1'">
                  <div class="mt-10 mb-6 d-flex justify-center" style="margin-left: -26px">
                     <v-icon :style="'color:' + system_color.primary_color" class="quote-icon-font-size">
                       mdi-format-quote-open
                     </v-icon>
                     <div class="east-west-heading">
                       <h2 :style="'color:' + system_color.primary_color"
                         :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
                         Western
                       </h2>
                     </div>
                   </div> -->

              <div v-if="form_data[0].shipping_setting_status == '0'">
                <div
                  class="dLogBoxInfo text-center"
                  :class="{
                    'mt-5': $vuetify.breakpoint.xs,
                    'mt-4': $vuetify.breakpoint.smAndUp
                  }"
                >
                  <div class="px-4 pb-2 text-grey">
                    <h4
                      class="font-weight-bold"
                      :class="{
                        'font-size-subtitle-1 text-center':
                          $vuetify.breakpoint.xs
                      }"
                    >
                      Delivery and Shipping Fee Calculation
                    </h4>
                    <div
                      v-if="merchant_shipping_data[0].status == '0'"
                      class="mt-4"
                    >
                      <div
                        class="d-flex justify-center"
                        style="margin-left: -12px"
                      >
                        <v-icon
                          :style="'color:' + system_color.primary_color"
                          class="quote-icon-font-size"
                        >
                          mdi-format-quote-open
                        </v-icon>
                        <div class="east-west-heading">
                          <h4
                            style="font-weight: bold; color: black"
                            :style="'color:' + system_color.primary_color"
                            class="pb-2"
                            :class="{
                              'font-size-subtitle-2': $vuetify.breakpoint.xs
                            }"
                          >
                            Western
                          </h4>
                        </div>
                      </div>
                      <span class="font-size-para"
                        >The basic flat rate for west Malaysia is
                        <strong :style="'color:' + system_color.primary_color"
                          >RM {{ merchant_shipping_data[0].first_fee }}</strong
                        >.</span
                      >
                      <div
                        class="justify-center font-size-para"
                        :class="{
                          'd-flex align-start': $vuetify.breakpoint.xs,
                          'd-flex align-center': $vuetify.breakpoint.mdAndUp
                        }"
                      >
                        <v-icon size="20" color="red">mdi-information</v-icon>
                        <span
                          :class="{
                            'pl-1': $vuetify.breakpoint.xs,
                            'pl-2': $vuetify.breakpoint.mdAndUp
                          }"
                        >
                          If purchasing amount more than
                          <strong :style="'color:' + system_color.primary_color"
                            >RM
                            {{ merchant_shipping_data[0].price_point }}</strong
                          >, the flat rate will be
                          <strong :style="'color:' + system_color.primary_color"
                            >RM
                            {{ merchant_shipping_data[0].second_fee }}.</strong
                          >
                        </span>
                      </div>
                    </div>

                    <div
                      v-if="merchant_shipping_data[1].status == '0'"
                      class="mt-4"
                    >
                      <div
                        class="d-flex justify-center"
                        style="margin-left: -12px"
                      >
                        <v-icon
                          :style="'color:' + system_color.primary_color"
                          class="quote-icon-font-size"
                        >
                          mdi-format-quote-open
                        </v-icon>
                        <div class="east-west-heading">
                          <h4
                            style="font-weight: bold; color: black"
                            :style="'color:' + system_color.primary_color"
                            class="pb-2"
                            :class="{
                              'font-size-subtitle-2': $vuetify.breakpoint.xs
                            }"
                          >
                            Eastern
                          </h4>
                        </div>
                      </div>
                      <span class="font-size-para"
                        >The basic flat rate for east Malaysia is
                        <strong :style="'color:' + system_color.primary_color"
                          >RM {{ merchant_shipping_data[1].first_fee }}</strong
                        >.</span
                      >
                      <div
                        class="justify-center font-size-para"
                        :class="{
                          'd-flex align-start': $vuetify.breakpoint.xs,
                          'd-flex align-center': $vuetify.breakpoint.mdAndUp
                        }"
                      >
                        <v-icon size="20" color="red">mdi-information</v-icon>
                        <span
                          :class="{
                            'pl-1': $vuetify.breakpoint.xs,
                            'pl-2': $vuetify.breakpoint.mdAndUp
                          }"
                        >
                          If purchasing amount more than
                          <strong :style="'color:' + system_color.primary_color"
                            >RM
                            {{ merchant_shipping_data[1].price_point }}</strong
                          >, the flat rate will be
                          <strong :style="'color:' + system_color.primary_color"
                            >RM
                            {{ merchant_shipping_data[1].second_fee }}.</strong
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!---------- Shipping Details According to Postcode ----------->
              <div
                class="dLogBoxInfo"
                v-if="form_data[0].shipping_setting_status == '1'"
                :class="{
                  'mt-4 text-center': $vuetify.breakpoint.xs,
                  'mt-8': $vuetify.breakpoint.smAndUp
                }"
              >
                <h4
                  class="pb-2 font-weight-bold"
                  :class="{
                    'font-size-subtitle-1 text-center': $vuetify.breakpoint.xs
                  }"
                >
                  Delivery and Shipping Fee Calculation
                </h4>
                <div
                  class="pt-1 px-2 font-size-para"
                  :class="{
                    'd-flex justify-center align-center': $vuetify.breakpoint.xs
                  }"
                  v-for="(postcode, i) in JSON.parse(
                    form_data[0].shipping_by_postcode
                  )"
                  :key="i"
                >
                  <ul :class="{ 'ml-2': $vuetify.breakpoint.smAndUp }">
                    <li style="list-style-type: disc">
                      <span
                        :class="{ 'font-size-caption': $vuetify.breakpoint.xs }"
                      >
                        For postcode
                        <strong>{{ postcode.postcode_1 }}</strong> to postcode
                        <strong>{{ postcode.postcode_2 }}</strong
                        >: Shipping fee is
                        <strong>RM{{ postcode.shipping_fee }}.</strong>
                      </span>
                      <div
                        class="pt-2"
                        v-for="(shippingCondition,
                        i) in postcode.advanced_shipping_fee"
                        :key="i.advanced_shipping_fee"
                      >
                        <div
                          :class="{
                            'd-flex align-start': $vuetify.breakpoint.xs,
                            'd-flex align-center': $vuetify.breakpoint.mdAndUp
                          }"
                        >
                          <v-icon size="20" color="red">mdi-information</v-icon>
                          <span
                            class="pl-1"
                            :class="{
                              'font-size-caption': $vuetify.breakpoint.xs
                            }"
                          >
                            Amount spending between
                            <strong
                              >RM{{ shippingCondition.total_fee_1 }}</strong
                            >
                            -
                            <strong
                              >RM{{ shippingCondition.total_fee_2 }}</strong
                            >, shipping fee would be
                            <strong
                              >RM{{ shippingCondition.shipping_fee }}.</strong
                            >
                          </span>
                        </div>
                      </div>
                      <br />
                    </li>
                  </ul>
                </div>
              </div>

              <!---------- Shipping Details According to Distance ----------->
              <div
                class="dLogBoxInfo"
                v-if="form_data[0].shipping_setting_status == '2'"
                :class="{
                  'mt-4 text-center': $vuetify.breakpoint.xs,
                  'mt-8': $vuetify.breakpoint.smAndUp
                }"
              >
                <h4
                  class="pb-2 font-weight-bold"
                  :class="{ 'font-size-subtitle-1': $vuetify.breakpoint.xs }"
                >
                  Delivery and Shipping Fee Calculation
                </h4>
                <div
                  class="pt-1 px-2 font-size-para"
                  :class="{
                    'd-flex justify-center align-center': $vuetify.breakpoint.xs
                  }"
                  v-for="(distance, i) in JSON.parse(
                    form_data[0].shipping_by_distance
                  )"
                  :key="i"
                >
                  <ul :class="{ 'ml-2': $vuetify.breakpoint.smAndUp }">
                    <li style="list-style-type: disc">
                      <span
                        :class="{ 'font-size-caption': $vuetify.breakpoint.xs }"
                        >For distance
                        <strong>{{ distance.distance_1 }}</strong> km to
                        distance <strong>{{ distance.distance_2 }} km</strong>:
                        Shipping fee is
                        <strong>RM{{ distance.shipping_fee }}.</strong>
                      </span>
                      <div
                        class="pt-2"
                        v-for="(distanceCondition,
                        i) in distance.advanced_shipping_fee"
                        :key="i.advanced_shipping_fee"
                      >
                        <div
                          :class="{
                            'd-flex align-start': $vuetify.breakpoint.xs,
                            'd-flex align-center': $vuetify.breakpoint.mdAndUp
                          }"
                        >
                          <v-icon class="pr-2" size="20" color="red"
                            >mdi-information</v-icon
                          >
                          <span
                            class="pl-1"
                            :class="{
                              'font-size-caption': $vuetify.breakpoint.xs
                            }"
                          >
                            Amount spending between
                            <strong
                              >RM{{ distanceCondition.total_fee_1 }}</strong
                            >
                            -
                            <strong
                              >RM{{ distanceCondition.total_fee_2 }}</strong
                            >: Shipping fee would be
                            <strong
                              >RM{{ distanceCondition.shipping_fee }}.</strong
                            >
                          </span>
                        </div>
                      </div>
                      <br />
                    </li>
                  </ul>
                </div>
              </div>

              <!---------- Shipping Details According to EasyParcel ----------->
              <div v-if="form_data[0].shipping_setting_status == '3'">
                <div class="mt-4 d-flex justify-center">
                  <v-img
                    :src="require('~/assets/images/easyparcel-logo.jpg')"
                    max-height="60"
                    max-width="160"
                    contain
                  >
                  </v-img>
                </div>

                <div
                  class="dLogBoxInfo text-center"
                  :class="{
                    'mt-5': $vuetify.breakpoint.xs,
                    'mt-4': $vuetify.breakpoint.smAndUp
                  }"
                >
                  <div class="px-4 pb-2">
                    <h4
                      v-if="form_data[0].order_min_purchase > 0"
                      class="font-weight-bold pb-2"
                      :class="{
                        'font-size-subtitle-1': $vuetify.breakpoint.xs,
                        'font-size-headline-2': $vuetify.breakpoint.smAndUp
                      }"
                    >
                      * Minimum Spending:
                      <span class="font-weight-regular red--text"
                        >RM{{ form_data[0].order_min_purchase }}</span
                      >
                    </h4>
                    <h4
                      class="font-weight-bold"
                      :class="{
                        'font-size-subtitle-1': $vuetify.breakpoint.xs
                      }"
                    >
                      Delivery and Shipping Fee Calculation
                    </h4>
                    <h5 class="font-weight-regular red--text font-size-para">
                      (Rate will depand on EasyParcel)
                    </h5>
                    <p class="pt-5 text-grey font-size-para">
                      E.g. EasyParcel's free shipping is applied when purchasing
                      more than
                      <strong
                        >RM{{
                          form_data[0].easyparcel_free_shipping_range
                        }}</strong
                      >.
                    </p>
                    <div
                      class="justify-center font-size-para"
                      :class="{
                        'd-flex align-start': $vuetify.breakpoint.xs,
                        'd-flex align-center': $vuetify.breakpoint.mdAndUp
                      }"
                    >
                      <v-icon size="20" color="red">mdi-information</v-icon>
                      <span
                        :class="{
                          'pl-1': $vuetify.breakpoint.xs,
                          'pl-2': $vuetify.breakpoint.mdAndUp
                        }"
                        >Check
                        <a
                          href="https://easyparcel.com/my/"
                          target="_blank"
                          class="text-decoration-none"
                          >here</a
                        >
                        to know more the shipping rate!
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!---------- Shipping Details According to Lalamove ----------->
              <div v-if="form_data[0].shipping_setting_status == '4'">
                <div class="my-4 d-flex justify-center">
                  <v-img
                    :src="require('~/assets/images/lalamove-logo.jpg')"
                    max-height="150"
                    max-width="180"
                    contain
                  >
                  </v-img>
                </div>

                <div
                  class="dLogBoxInfo text-center"
                  :class="{
                    'mt-5': $vuetify.breakpoint.xs,
                    'mt-4': $vuetify.breakpoint.smAndUp
                  }"
                >
                  <div class="px-4 pb-2 text-grey">
                    <h4
                      v-if="form_data[0].order_min_purchase > 0"
                      class="font-weight-bold pb-2"
                      :class="{
                        'font-size-subtitle-1': $vuetify.breakpoint.xs,
                        'font-size-headline-2': $vuetify.breakpoint.smAndUp
                      }"
                    >
                      * Minimum Spending:
                      <span class="font-weight-regular red--text"
                        >RM{{ form_data[0].order_min_purchase }}</span
                      >
                    </h4>
                    <h4
                      class="font-weight-bold"
                      :class="{
                        'font-size-subtitle-1 text-center':
                          $vuetify.breakpoint.xs
                      }"
                    >
                      Delivery and Shipping Fee Calculation
                    </h4>
                    <h5 class="font-weight-regular red--text font-size-para">
                      (Rate will depand on Lalamove)
                    </h5>
                    <p class="pt-5 font-size-para">
                      E.g. Lalamove's free shipping range is applied when
                      purchasing more than
                      <strong
                        >RM{{
                          form_data[0].lalamove_free_shipping_range
                        }}</strong
                      >.
                    </p>
                    <div
                      class="justify-center font-size-para"
                      :class="{
                        'd-flex align-start': $vuetify.breakpoint.xs,
                        'd-flex align-center': $vuetify.breakpoint.mdAndUp
                      }"
                    >
                      <v-icon size="20" color="red">mdi-information</v-icon>
                      <span
                        :class="{
                          'pl-1': $vuetify.breakpoint.xs,
                          'pl-2': $vuetify.breakpoint.mdAndUp
                        }"
                        >Check
                        <a
                          href="https://www.lalamove.com/en-my/all-vehicle-pricing-detail"
                          target="_blank"
                          class="text-decoration-none"
                          >here</a
                        >
                        to know more the shipping rate!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-end white">
              <v-btn
                class="pl-4"
                :style="'backgroundColor:' + system_color.primary_color"
                dark
                @click="dialog.value = false"
                >Got It
                <v-icon left> mdi-check-circle </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!--xxxxxxxxxxxxxxxxxxxxxxxxxx Shipping Details Section (Dialog Box) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->

      <!--based on distance-->
      <!-- <v-dialog v-model="distance_dialog" content-class="my-custom-dialog" transition="fab-transition" max-width="680">
    <template v-slot:default="dialog">
      <v-card class="pt-8 pb-4">
        <v-card-text class="shipping-dialog-box">
           <div class="shipping-title-wrap">
             <h1 class="shipping-title font-weight-bold" :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
               SHIPPING DETAILS
             </h1>
           </div>
           <div class="dLogBoxInfo" :class="{'mt-4 text-center': $vuetify.breakpoint. xs, 'mt-8': $vuetify.breakpoint. smAndUp }">
               <h4 class="pb-2 font-weight-bold" :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs }"> 
                  Delivery and Shipping Fee Calculation
               </h4>
             <div class="pt-1 px-2 font-size-para" :class="{'d-flex justify-center align-center': $vuetify.breakpoint. xs }"
               v-for="(distance, i) in distances" :key="i">
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
  </v-dialog> -->

      <!--based on EasyParcel-->
      <!-- <v-dialog v-model="easyparcel_dialog" content-class="my-custom-dialog" transition="fab-transition" max-width="680">
    <template v-slot:default="dialog">
      <v-card class="pt-8 pb-4">
        <v-card-text class="shipping-dialog-box">
           <div class="shipping-title-wrap">
             <h1 class="shipping-title font-weight-bold" :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
              SHIPPING DETAILS
             </h1>
           </div>
           <div class="mt-4 d-flex justify-center">
             <v-img :src="require('~/assets/images/easyparcel-logo.jpg')"
                max-height="60" max-width="160" contain>
             </v-img> 
           </div>
        
           <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
            <div class="px-4 pb-2">
               <h4 v-if=" order_min_purchase > 0" class="font-weight-bold pb-2"
                 :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs, 'font-size-headline-2': $vuetify.breakpoint. smAndUp }"> 
                 * Minimum Spending: 
                  <span class="font-weight-regular red--text">RM{{order_min_purchase}}</span>
               </h4>
               <h4 class="font-weight-bold" :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs }"> 
                  Delivery and Shipping Fee Calculation
               </h4>
               <h5 class="font-weight-regular red--text font-size-para">(Rate will depand on EasyParcel)</h5>
               <p class="pt-5 text-grey font-size-para">E.g. EasyParcel's free shipping is applied when purchasing more than <strong>RM{{easyparcel_free_shipping_range }}</strong>.</p>             
               <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                 <v-icon size="20" color="red">mdi-information</v-icon>
                 <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">Check <a href="https://easyparcel.com/my/" 
                    target="_blank" class="text-decoration-none">here</a> to know more the shipping rate!
                 </span>
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
  </v-dialog> -->

      <!--based on Lalamove-->
      <!-- <v-dialog v-model="lalamove_dialog" content-class="my-custom-dialog" transition="fab-transition" max-width="680">
      <template v-slot:default="dialog">
        <v-card class="pt-8 pb-4">
          <v-card-text class="shipping-dialog-box">
             <div class="shipping-title-wrap">
               <h1 class="shipping-title font-weight-bold" :class="{'font-size-headline': $vuetify.breakpoint. xs, 'font-size-display1': $vuetify.breakpoint. smAndUp}">
                SHIPPING DETAILS
               </h1>
             </div>
  
             <div class="my-4 d-flex justify-center">
               <v-img :src="require('~/assets/images/lalamove-logo.jpg')"
                  max-height="150" max-width="180" contain>
               </v-img> 
             </div>
  
             <div class="dLogBoxInfo text-center" :class="{'mt-5': $vuetify.breakpoint. xs, 'mt-4': $vuetify.breakpoint. smAndUp }">
              <div class="px-4 pb-2 text-grey">
                 <h4 v-if="order_min_purchase > 0" class="font-weight-bold pb-2" 
                   :class="{'font-size-subtitle-1': $vuetify.breakpoint. xs, 'font-size-headline-2': $vuetify.breakpoint. smAndUp }"> 
                   * Minimum Spending: 
                    <span class="font-weight-regular red--text">RM{{order_min_purchase}}</span>
                 </h4>
                 <h4 class="font-weight-bold" :class="{'font-size-subtitle-1 text-center': $vuetify.breakpoint. xs }"> 
                    Delivery and Shipping Fee Calculation
                 </h4>
                 <h5 class="font-weight-regular red--text font-size-para">(Rate will depand on Lalamove)</h5>
                 <p class="pt-5 font-size-para">E.g. Lalamove's free shipping range is applied when purchasing more than <strong>RM{{lalamove_free_shipping_range }}</strong>.</p>             
                 <div class="justify-center font-size-para" :class="{'d-flex align-start': $vuetify.breakpoint. xs, 'd-flex align-center': $vuetify.breakpoint. mdAndUp}">
                   <v-icon size="20" color="red">mdi-information</v-icon>
                   <span :class="{'pl-1': $vuetify.breakpoint. xs, 'pl-2': $vuetify.breakpoint. mdAndUp}">Check <a href="https://www.lalamove.com/en-my/all-vehicle-pricing-detail" 
                     target="_blank" class="text-decoration-none">here</a> to know more the shipping rate!
                  </span>
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
    </v-dialog> -->

      <!----------------- Terms & Condition and Privacy Policies (Dialog Box) ------------------>
      <v-dialog v-model="termsPrivacy_dialog" width="600px" height="400px">
        <template v-slot:default="dialog">
          <v-card class="tnc-section pa-2">
            <!---- Use Component tnc_dialog2 ---->
            <tnc_dialog2 :data_array="tnc_array()"></tnc_dialog2>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                dark
                color="green darken-1"
                @click="dialog.value = false"
              >
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
          <Transition
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutLeft"
          >
            <a
              v-show="scrollUpIcon"
              href="#main"
              class="scrollup scrollactive-item"
            >
              <v-icon :style="{ color: hover ? '#000000' : '#696969' }">
                mdi-arrow-up-circle
              </v-icon>
            </a>
          </Transition>
        </v-hover>
      </scrollactive>
      <!--xxxxxxxxxxxxxxxxxxx Scroll back To Top xxxxxxxxxxxxxxxxxxxxxxxx-->
      <nuxt
        :class="[
          sidebar ? 'activeBlur' : '',
          accountbar ? 'activeBlur' : '',
          account_dialog ? 'activeBlur' : ''
        ]"
      />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import tnc_dialog2 from "../components/tnc_dialog2.vue";

export default {
  components: { tnc_dialog2 },
  data() {
    return {
      navbar: false,
      sidebar: false,
      accountbar: false,
      activeBlur: false,
      mobileNav: false,
      scrollUpIcon: 0,
      page_loading: false,
      profile_pic: "",

      navLinks: [
        { title: "Home", icon: "mdi-home" },
        { title: "Shipping", icon: "mdi-truck" },
        {
          title: "Categories",
          icon: "mdi-shape",
          subLinks: []
        },
        { title: "Terms and Services", icon: "mdi-file-document-check" },
        {
          title: "Languages",
          icon: "mdi-translate-variant",
          subLinks: [
            {
              lang: "English",
              flag:
                "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png"
            },
            {
              lang: "BahasaMelayu",
              flag: "https://cdn.countryflags.com/thumbs/malaysia/flag-800.png"
            },
            {
              lang: "Mandarin",
              flag: "https://cdn.countryflags.com/thumbs/china/flag-800.png"
            }
          ]
        }
      ],

      accountLinks: [
        { title: "Order History", icon: "mdi-clipboard-text-clock" },
        { title: "Profile Editing", icon: "mdi-account-badge" },
        { title: "Address Editing", icon: "mdi-map-marker" },
        { title: "Logout", icon: "mdi-logout-variant" }
      ],

      selectedLang: { lang: "English", prefix: "EN" },
      items: [
        {
          lang: "English",
          prefix: "EN",
          flag:
            "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png"
        },
        {
          lang: "Bahasa Melayu",
          prefix: "MS",
          flag: "https://cdn.countryflags.com/thumbs/malaysia/flag-800.png"
        },
        {
          lang: "中文",
          prefix: "ZH",
          flag: "https://cdn.countryflags.com/thumbs/china/flag-800.png"
        }
      ],

      countries: [
        {
          lang: "English",
          prefix: "EN",
          flag:
            "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png"
        },
        {
          lang: "BahasaMelayu",
          prefix: "MS",
          flag: "https://cdn.countryflags.com/thumbs/malaysia/flag-800.png"
        },
        {
          lang: "Mandarin",
          prefix: "ZH",
          flag: "https://cdn.countryflags.com/thumbs/china/flag-800.png"
        }
      ],

      // ----- Account Login Register Section ----- //
      tab: 0,
      userName: "",
      registerEmail: "",
      registerPassword: "",
      loginPassword: "",
      showLoginPassword: false,
      showRegisterPassword: false,
      formHasErrors: false,
      emailRules: [
        value => !!value || "Please enter your email",
        value =>
          /.+@.+\..+/.test(value) ||
          "Email must be valid (e.g. jeremy14@gmail.com) "
      ],

      rules: {
        required: value => !!value || "Please enter your password",
        passValidate: value =>
          (value &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/.test(
              value
            )) ||
          "Minimum 8 characters, one capital letter, special charater & number"
      },

      vueTelVuetifyLogin: {
        phoneNo: "",
        phoneNoTrim: "",
        valid: false,
        countryCode: null,
        props: {
          name: "phoneNo",
          errorMessages: "",
          placeholder: null,
          mode: "international",
          autoFormat: true,
          outlined: true,
          autocomplete: "on",
          autofocus: false,
          label: "Phone number",
          hint: "e.g. +60166998899",
          onlyCountries: ["MY", "SG"],
          fetchCountry: true
        }
      },

      vueTelVuetifyRegister: {
        phoneNo: "",
        phoneNoTrim: "",
        valid: false,
        countryCode: null,
        phoneNoRules: [
          v => !!v || "Please enter your phone number"
          // v => /(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/.test(v) || 'Phone No. must be valid',
        ],
        props: {
          name: "phoneNo",
          errorMessages: "",
          placeholder: null,
          mode: "international",
          outlined: true,
          autocomplete: "on",
          autoFormat: true,
          autofocus: false,
          label: "Phone number",
          hint: "e.g. +60166998899",
          onlyCountries: ["MY", "SG"],
          fetchCountry: true
        }
      },
      // xxxxx Account Login Register Section xxxxx- //

      shipping_dialog: false,
      distance_dialog: false,
      lalamove_dialog: false,
      easyparcel_dialog: false,
      termsPrivacy_dialog: false,
      account_dialog: false,
      account_success_dialog: false,
      login_dialog: false,
      register_dialog: false,

      login_regis_msg: "",
      registerStatus: ""
    };
  },

  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },

  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },

  watch: {
    //  selected(){
    //      this.$store.commit("setSelectedLink", this.selected);
    //  }
  },

  computed: {
    selected: {
      get() {
        return this.$store.state.selectedLink; //一開始從vuex get selectedLink data (value is null)
      },
      set(newSelectedLink) {
        this.$store.commit("setSelectedLink", newSelectedLink);
      }
    },

    // statusLOGIN: {
    //   get(){
    //     return this.$store.state.login_data.status;
    //   },
    //   set(newStatusLOGIN){
    //     this.$store.commit("setLoginInfo", newStatusLOGIN);
    //   }
    // },

    form_data() {
      return this.$store.state.form_data;
    },

    system_color() {
      return this.$store.state.system_color;
    },

    merchant_shipping_data() {
      return this.$store.state.merchant_east_west;
    },

    merchant_url() {
      return this.$store.state.merchant_url;
    },

    merchant_domain() {
      return this.$store.state.merchant_domain;
    },

    product_categories() {
      return this.$store.state.product_categories;
    },

    login_data() {
      return this.$store.state.login_data;
    },

    profile_img() {
      return this.$store.state.profile_pic;
    }
  },

  methods: {
    countryChangedLogin(country) {
      this.vueTelVuetifyLogin.countryCode = "+" + country.dialCode;
    },

    countryChangedRegister(country) {
      this.vueTelVuetifyRegister.countryCode = "+" + country.dialCode;
    },

    //check the screen size for responsive use
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 599) {
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
      if (scrollPosition > 150) {
        this.scrollUpIcon = true;
        return;
      }
      this.scrollUpIcon = false;
      return;
    },

    //open dialog from nav drawer
    openDialog(i) {
      if (i == 0) {
        var link = "";
        if (this.merchant_domain !== "") {
          link = this.merchant_domain;
        } else {
          link = "/" + this.merchant_url;
        }
        window.location.replace(link);

        /*
        const website_url = this.website_url;
        window.location.replace('/' + website_url);
        */

        /*
        let route = this.$router.resolve({ path: '/'+website_url });
        window.open(route.href, "_self");
        */
      } else if (i == 1) {
        this.shipping_dialog = true;
      } else if (i == 3) {
        /*
      else if(index == 1){
        const shipping_status = this.shipping_setting_status
        switch(shipping_status){  
          case 1:
            if(shipping_status == 1){
              this.postcode_dialog = true
            }
            break;

          case 2:
            if(shipping_status == 2){
              this.distance_dialog = true
            }
            break;

          case 3:
            if(shipping_status == 3){
              this.easyparcel_dialog = true
            }
            break;

          case 4:
          if(shipping_status == 4){
            this.lalamove_dialog = true
            break;
          }
        }
      }
      */
        this.termsPrivacy_dialog = true;
      } else if (i == 5) {
        this.account_dialog = true;
      }
    },

    select_languages_menu(i) {
      this.$store.commit("changelocale", this.countries[i].prefix);
    },

    select_languages() {
      this.$store.commit("changelocale", this.selectedLang.prefix);
    },

    get_login() {
      if (this.$refs.loginForm.validate() == false) {
        return;
      }

      if (this.vueTelVuetifyLogin.valid != true) {
        this.vueTelVuetifyLogin.props.errorMessages = "Invalid phone number";
        this.$refs.loginForm.validate() == false;
        return;
      }

      this.vueTelVuetifyLogin.phoneNoTrim = this.vueTelVuetifyLogin.phoneNo.replace(
        this.vueTelVuetifyLogin.countryCode,
        ""
      );
      const formattedLoginPhoneNo = this.vueTelVuetifyLogin.phoneNoTrim.replace(
        /[^\d]+/g,
        ""
      );

      const params = new URLSearchParams();
      params.append("login", 1);
      params.append("password", this.loginPassword);
      params.append("phone", formattedLoginPhoneNo);
      params.append("country_code", this.vueTelVuetifyLogin.countryCode);
      params.append("merchant_id", this.form_data[0].merchant_id);

      axios({
        method: "post",
        url: "https://user.lkmng.com/registration/index.php",
        data: params
      })
        .then(response => {
          if (response.data.status == "1") {
            this.account_dialog = false;
            this.page_loading = true;

            setTimeout(() => {
              this.page_loading = false;
              this.$router.push("/" + this.merchant_url);
              this.$store.commit("setLoginInfo", [
                {
                  status: 1,
                  user_detail: {
                    name: response.data.user_detail.name,
                    email: response.data.user_detail.email,
                    userId: response.data.user_detail.user_id,
                    country_code: this.vueTelVuetifyLogin.countryCode,
                    phoneNo: formattedLoginPhoneNo,
                    login_pw: this.loginPassword
                  }
                }
              ]);

              // this.$store.commit("setLoginInfo", response.data);
              this.$store.commit("setSelectedLink", null);
              this.get_user_details();
              this.login_dialog = true;
              this.$refs.loginForm.reset();
            }, 2500);
          } else {
            this.account_dialog = false;
            setTimeout(() => {
              this.login_dialog = true;
              this.$refs.loginForm.reset();
            }, 500);
            return (this.login_regis_msg = response.data.user_detail + "!");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    get_register() {
      if (this.$refs.registerForm.validate() == false) {
        return;
      }

      if (this.vueTelVuetifyRegister.valid != true) {
        this.vueTelVuetifyRegister.props.errorMessages = "Invalid phone number";
        this.$refs.registerForm.validate() == false;
        return;
      }

      this.vueTelVuetifyRegister.phoneNoTrim = this.vueTelVuetifyRegister.phoneNo.replace(
        this.vueTelVuetifyRegister.countryCode,
        ""
      );
      const formattedRegisterPhoneNo = this.vueTelVuetifyRegister.phoneNoTrim.replace(
        /[^\d]+/g,
        ""
      );

      const params = new URLSearchParams();
      params.append("register", 1);
      params.append("password", this.registerPassword);
      params.append("email", this.registerEmail);
      params.append("name", this.userName);
      params.append("phone", formattedRegisterPhoneNo);
      params.append("country_code", this.vueTelVuetifyRegister.countryCode);
      params.append("merchant_id", this.form_data[0].merchant_id);

      axios({
        method: "post",
        url: "https://user.lkmng.com/registration/index.php",
        data: params
      })
        .then(response => {
          if (response.data.status == "1") {
            this.registerStatus = response.data.status;
            this.account_dialog = false;
            this.page_loading = true;

            setTimeout(() => {
              this.page_loading = false;
              this.register_dialog = true;
              this.$refs.registerForm.reset();
            }, 1500);
            return (this.login_regis_msg = response.data.message);
          } else {
            this.account_dialog = false;

            setTimeout(() => {
              this.register_dialog = true;
              this.$refs.registerForm.reset();
            }, 500);

            return (this.login_regis_msg = response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.registerStatus = "";
    },

    get_user_details() {
      const params = new URLSearchParams();
      params.append("get_user_details", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);

      axios({
        method: "post",
        url: "https://formtest.lkmng.com/profile/index.php",
        data: params
      })
        .then(response => {
          this.profile_pic = response.data.data[0].profile_img;
          this.$store.commit("setProfilePic", this.profile_pic);
        })
        .catch(error => {
          console.log(error);
        });
    },

    check_login() {
      if (this.login_data[0].status != 1) {
        this.account_dialog = true;
      } else {
        this.accountbar = true;
      }
    },

    accLink_onclick(i) {
      if (i == 0 || i == 1 || i == 2) {
        this.$router.push("/" + this.merchant_url + "/accountsetting");
      } else if (i == 3) {
        this.$router.push("/" + this.merchant_url);
        this.page_loading = true;
        setTimeout(() => {
          this.page_loading = false;

          this.$store.commit("setLoginInfo", [
            {
              status: "",
              user_detail: {
                name: "",
                email: "",
                userId: "",
                country_code: "",
                phoneNo: "",
                login_pw: ""
              }
            }
          ]);
        }, 2000);
      }
    },

    /*
    insert() {
           // now we use axios to post data to api for inserting data
       const params = new URLSearchParams();
       params.append("read", "1");
       params.append("url", "homekopitiam1");
      axios({
        method: "post",
        url: "https://cp.emenu.com.my/form/index.php",
        data: params,// the data we want to post, this.name and this.age is the input textfield data
        
      })
        .then((response) => {  
          this.color= JSON.parse(response.data.form_function[0].color);
    
          // xxxxxxxxxxxxxxx get the data from api and call to T&C xxxxxxxxxxxxxxxxx //

          console.log('respons',response) 
          console.log("testing", response.data.form_function[0]);  //call all the data
          //console.log("testing", response.data.form_function[0].name); //call specific data
          // after post we call read_data() function, so it refresh the table
          //this.read_data();

        })
        .catch((error) => {
          console.log(error);
        });
    },
    */

    /*
    insert2() {
           now we use axios to post data to api for inserting data
       const params = new URLSearchParams();
       params.append("get_category", "");
       params.append("form_id", "75c993ceb0b2bb3f017d664ea8dea641");
      axios({
        method: "post",
        url: "https://cp.emenu.com.my/form/index.php",
        data: params,// the data we want to post, this.name and this.age is the input textfield data
        
      })
        .then((response) => {    
          this.category= response.data.category;
          
          console.log("categories", response);
          console.log("tcat", this.category);  //call all the data      
          //console.log("testing", response.data.form_function[0].name); //call specific data
          // after post we call read_data() function, so it refresh the table
          //this.read_data();

        })
        .catch((error) => {
          console.log(error);
        });
    }, */

    tnc_array() {
      var array = [];
      var link = "";
      if (this.form_data[0].domain !== "") {
        link = this.form_data[0].domain;
      } else {
        link = "www.emenu.com.my/" + this.form_data[0].url;
      }
      // array.push({company_name:this.company_name},{company_address:this.company_address},{company_phone:this.company_phone},{company_email:this.company_email},{site_url:link});
      array.push({
        company_name: this.form_data[0].company_name,
        company_address: this.form_data[0].address,
        company_phone: this.form_data[0].company_phone,
        company_email: this.form_data[0].company_email,
        registration_no: this.form_data[0].registration_no,
        site_url: link
      });

      return array;
    },

    onInputLogin: function({ valid }) {
      this.vueTelVuetifyLogin.valid = valid;

      if (this.vueTelVuetifyLogin.valid == true) {
        this.vueTelVuetifyLogin.props.errorMessages = null; //check if the phone is valid,set errmsg to null
      }
    },

    onInputRegister: function({ valid }) {
      this.vueTelVuetifyRegister.valid = valid;

      if (this.vueTelVuetifyRegister.valid == true) {
        this.vueTelVuetifyRegister.props.errorMessages = null; //check if the phone is valid,set errmsg to null
      }
    }
  }
};
</script>

<style>
:root {
  --main-color: rgb(10, 21, 58);
  --font-size-display1: 34px;
  --font-size-display2: 30px;
  --font-size-display3: 28px;
  --font-size-display4: 26px;
  --font-size-headline: 24px;
  --font-size-headline-2: 16px;
  --font-size-subtitle-1: 15px;
  --font-size-paragraph: 14px;
  --font-size-caption: 12px;
}

.font-size-display1 {
  font-size: var(--font-size-display1);
}

.font-size-display2 {
  font-size: var(--font-size-display2);
}

.font-size-display3 {
  font-size: var(--font-size-display3);
}

.font-size-display4 {
  font-size: var(--font-size-display3);
}

.font-size-headline {
  font-size: var(--font-size-headline);
}

.font-size-headline-2 {
  font-size: var(--font-size-headline-2);
}

.font-size-subtitle-1 {
  font-size: var(--font-size-subtitle-1);
}

.font-size-para {
  font-size: var(--font-size-paragraph);
}

.font-size-caption {
  font-size: var(--font-size-caption);
}

::-webkit-scrollbar {
  width: 1rem;
  background-color: #cfd8dc;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: hsl(228, 8%, 64%);
  width: 0.5rem;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(228, 8%, 54%);
}

.activeBlur {
  filter: blur(8px);
}

.scrollup {
  position: fixed;
  display: inline-flex;
  left: 2rem;
  bottom: 10%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 0.7rem;
  border-radius: 0.25rem;
  color: black;
  font-size: 1.25rem;
  z-index: 1000;
  transition: 2s all;
}

.scrollup:hover {
  transform: translateY(-0.5rem);
}

/* ------- Header -------- */
/* for header navigation */
.nav-drawer-width-lg {
  width: 300px !important;
}

.nav-drawer-width-sm {
  width: 550px !important;
}

.nav-drawer-link,
.nav-drawer-group-link {
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
}

.nav-drawer-group-link {
  margin-left: -8px;
  max-height: 48px;
}

.nav-drawer-sub-link {
  padding-left: 80px !important;
  font-weight: 400 !important;
}

.nav-drawer-link .nav-link,
.nav-drawer-group-link .nav-link,
.nav-drawer-sub-link .sub-link {
  transition: 0.3s all ease-in;
}

.nav-drawer-link:hover .nav-link,
.nav-drawer-group-link:hover .nav-link,
.nav-drawer-sub-link:hover .sub-link {
  transform: translateX(10px) !important;
}

/* change the nav-drawer active icon color */
.v-list-group
  .v-list-group__header
  .v-list-item__icon.v-list-group__header__append-icon {
  color: black;
}

/* let the nav drawer z-index higher */
.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  z-index: 999;
}

.nav-icon {
  margin: 90px 0;
}

.v-menu__content {
  font-weight: bold;
  font-size: 14px;
  /* margin-left: -32px */
}

/* for button no hover effect in navigation*/
#no-background-hover::before {
  background-color: transparent !important;
}

/* for nav link underline hover effect */
.v-toolbar__items .v-btn__content::after {
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

.v-toolbar__items .v-btn__content:hover::after {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.language-section {
  max-width: 100px !important;
}

.v-select__selections {
  width: 50px;
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
.v-input--selection-controls .v-input__slot > .v-label {
  font-size: 14px;
}

/* for tabs header (account register and login) */
.theme--light.v-tabs > .v-tabs-bar {
  height: 100%;
}

.login-register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  padding: 10px 0 40px;
}

.btn-explore {
  border-radius: 0 !important;
  padding: 18px 30px !important;
  transition: all 0.5s !important;
  position: relative;
  width: 180px;
}

.btn-explore:after {
  font-size: 20px;
  content: "\27A2";
  position: absolute;
  opacity: 0;
  top: 4px;
  right: -10px;
  transition: 0.5s;
}

.btn-explore:hover {
  padding-right: 24px !important;
  padding-left: 8px !important;
}

.btn-explore:hover:after {
  opacity: 1 !important;
  right: 17px !important;
}

/* xxxxxx Dialog Box Account (Login/Register) xxxxxx /*



/* ---- For dialog box (shipping) ---- */
.shipping-dialog-box {
  font-family: "Montserrat", sans-serif !important;
  letter-spacing: -0.3px;
  font-weight: 500;
  line-height: 20px;
}

.shipping-title-wrap {
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 8px;
  background: #e3f2fd;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.shipping-title {
  text-align: center;
  position: relative;
  display: inline-block;
  color: #212529;
}

.shipping-title::after {
  content: "";
  position: absolute;
  left: 37%;
  border-radius: 5px;
  bottom: 0;
  width: 100px;
  height: 2px;
  background-color: #e53935;
}

.dLogBoxInfo {
  background-color: #e3f2fd;
  border-radius: 5px;
  padding: 12px;
  line-height: 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.text-grey {
  color: #6c757d;
}

.quote-icon-font-size {
  font-size: 26px !important;
  margin-top: -40px;
}

.east-west-heading {
  position: relative;
}
/* xxxx for dialog box (shipping) xxxx */

/* ---- Terms & Condition and Privacy Policies ----*/
.tnc-section {
  font-family: "Times New Roman", Times, serif !important;
  color: #6c757d !important;
}

.tnc-title {
  position: relative;
  font-weight: 500 !important;
  color: #212529 !important;
}

.tnc-title::after {
  content: "";
  position: absolute;
  left: 0;
  border-radius: 5px;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: rgb(10, 21, 58);
}

.tnc-description {
  font-family: "Helvetica";
  text-align: justify;
  font-size: 14px;
  line-height: 20px;
}

.tnc-category {
  font-size: 16px;
  font-weight: bold;
}

.tnc-cat-description {
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
}

/* xxxx  Terms & Condition and Privacy Policies xxxx */

.v-btn:not(.v-btn--round).v-size--large {
  transition: 0.5s ease !important;
}

@media screen and (max-width: 599px) {
  .scrollup {
    left: 45%;
    bottom: 4%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .loginForm,
  .registerForm {
    zoom: 0.9;
  }

  .shipping-title::after {
    left: 39%;
    width: 60px;
  }

  .quote-icon-font-size {
    font-size: 20px !important;
  }

  .tnc-title {
    font-size: 24px;
  }
}

@media screen and (max-width: 380px) {
  .language-section,
  .user-acc {
    margin-top: 5px;
    zoom: 0.9;
  }

  .tnc-description {
    text-align: left;
  }
}
/* ========= Header ========= */
</style>
