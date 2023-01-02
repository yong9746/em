<template>
  <div class="account-info-container">
    <h1
      v-show="$vuetify.breakpoint.smAndUp"
      class="account-link-title text-center"
    >
      Address Editing
    </h1>
    <!----------- Edit Address ------------>
    <v-card class="pa-5">
      <h3
        v-if="user_data.billing_address == ''"
        class="text-center py-2"
        style="font-weight: bold"
      >
        Add Addresses
      </h3>
      <h3 v-else class="text-center py-2" style="font-weight: bold">
        Update Addresses
      </h3>
      <div
        class="d-flex justify-space-around px-1 pb-4 mt-4"
        :class="{
          'd-flex flex-column align-center text-center':
            $vuetify.breakpoint.width < 939,
        }"
      >
        <div
          class="d-flex align-center flex-column justify-center"
          :class="{ 'pb-4': $vuetify.breakpoint.width < 870 }"
        >
          <v-chip
            class="d-flex justify-center"
            close-icon="mdi-close-outline"
            dark
            style="width: 180px"
            :style="'backgroundColor:' + system_color.second_color"
          >
            Billing Address
          </v-chip>

          <div v-if="user_data.billing_address != ''">
            <h2
              class="address-info mt-3"
              v-if="user_data.billing_country == 'MY'"
            >
              {{ user_data.billing_address }} , <br />
              {{ user_data.billing_postcode }}
              {{ user_data.billing_city }}, {{ user_data.billing_state }},
              {{ (billingCountryName = "Malaysia") }}
            </h2>

            <h2
              class="address-info mt-3"
              v-if="user_data.billing_country == 'SG'"
            >
              {{ user_data.billing_address }} , <br />
              {{ (billingCountryName = "Singapore") }}
              {{ user_data.billing_postcode }}.
            </h2>
          </div>

          <div v-else>
            <h2 class="address-info mt-3">Address Not Found</h2>
          </div>
        </div>

        <div
          class="d-flex align-center flex-column justify-center align-center"
        >
          <v-chip
            class="d-flex justify-center"
            close-icon="mdi-close-outline"
            dark
            style="width: 180px"
            :style="'backgroundColor:' + system_color.second_color"
          >
            Shipping Address
          </v-chip>

          <div v-if="user_data.shipping_address != ''">
            <h2
              class="address-info mt-3"
              v-if="user_data.shipping_country == 'MY'"
            >
              {{ user_data.shipping_address }}, <br />
              {{ user_data.shipping_postcode }}
              {{ user_data.shipping_city }}, {{ user_data.shipping_state }},
              {{ (shippingCountryName = "Malaysia") }}.
            </h2>

            <h2
              class="address-info mt-3"
              v-if="user_data.shipping_country == 'SG'"
            >
              {{ user_data.shipping_address }}, <br />
              {{ (shippingCountryName = "Singapore") }}
              {{ user_data.shipping_postcode }}.
            </h2>
          </div>
          <div v-else>
            <h2 class="address-info mt-4">Address Not Found</h2>
          </div>
        </div>
      </div>

      <v-row class="d-flex justify-center my-2">
        <v-col cols="12" sm="6">
          <Transition
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOutDown"
          >
            <v-btn
              v-if="user_data.billing_address != '' && !hiddenBtn"
              @click="
                editForm = true;
                hiddenBtn = true;
              "
              block
              large
              dark
              class="d-flex justify-center align-center mt-n2"
              :style="'backgroundColor:' + system_color.primary_color"
            >
              UPDATE
              <v-icon size="22" class="pl-2"> mdi-update </v-icon>
            </v-btn>

            <v-btn
              v-if="user_data.billing_address == '' && !hiddenBtn"
              @click="
                editForm = true;
                hiddenBtn = true;
              "
              block
              large
              dark
              class="d-flex justify-center align-center mt-n2"
              :style="'backgroundColor:' + system_color.primary_color"
            >
              ADD ADDRESS
              <v-icon size="22" class="pl-2"> mdi-update </v-icon>
            </v-btn>
          </Transition>
        </v-col>
      </v-row>

      <v-expand-transition>
        <v-card-text v-if="editForm" style="padding: 0">
          <h3
            class="billing-title mb-8"
            :class="{
              'font-size-headline': $vuetify.breakpoint.xs,
              'font-size-display1': $vuetify.breakpoint.smAndUp,
              'text-center': $vuetify.breakpoint.width < 868,
            }"
          >
            Billing Address
          </h3>
          <v-form ref="saveAddress" style="font-weight: 500">
            <v-row>
              <v-col cols="12">
                <!--Add Address-->
                <v-text-field
                  v-model="billingAddress"
                  :rules="addressRules"
                  outlined
                  label="Delivery Address"
                  clear-icon="mdi-close-circle"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="billingCountry"
                  :items="countries"
                  required
                  :rules="countryRules"
                  item-text="country"
                  item-value="country"
                  outlined
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Country"
                  item-color="blue darken-1"
                >
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="billingZipCode"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  :rules="zipCodeRules"
                  outlined
                  label="ZIP/Postcode"
                  clear-icon="mdi-close-circle"
                  clearable
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" v-if="billingCountry == 'Malaysia'">
                <v-text-field
                  v-model="billingCity"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  :rules="cityRules"
                  outlined
                  label="Town/City"
                  clear-icon="mdi-close-circle"
                  clearable
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" v-if="billingCountry == 'Malaysia'">
                <v-select
                  :items="states"
                  label="State"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  v-model="billingState"
                  :rules="stateRules"
                  :menu-props="{ top: true, offsetY: true }"
                  item-color="blue darken-1"
                  outlined
                >
                </v-select>
              </v-col>

              <!--Add Shipping Address-->
              <v-col cols="12" sm="12">
                <h3
                  class="billing-title mt-n5 mb-4"
                  :class="{
                    'font-size-headline': $vuetify.breakpoint.xs,
                    'font-size-display1': $vuetify.breakpoint.smAndUp,
                    'text-center': $vuetify.breakpoint.width < 868,
                  }"
                >
                  Shipping Address
                </h3>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="shippingAddress"
                  :rules="addressRules"
                  outlined
                  label="Delivery Address"
                  clear-icon="mdi-close-circle"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="shippingCountry"
                  item-text="country"
                  item-value="country"
                  :items="countries"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  :rules="countryRules"
                  outlined
                  label="Country"
                  item-color="blue darken-1"
                  :menu-props="{ bottom: true, offsetY: true }"
                >
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="shippingZipCode"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  :rules="zipCodeRules"
                  outlined
                  label="ZIP/Postcode"
                  clear-icon="mdi-close-circle"
                  clearable
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" v-if="shippingCountry == 'Malaysia'">
                <v-text-field
                  v-model="shippingCity"
                  :rules="cityRules"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  outlined
                  label="Town/City"
                  clear-icon="mdi-close-circle"
                  clearable
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" v-if="shippingCountry == 'Malaysia'">
                <v-select
                  :items="states"
                  label="State"
                  :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
                  v-model="shippingState"
                  :rules="stateRules"
                  :menu-props="{ top: true, offsetY: true }"
                  item-color="blue darken-1"
                  outlined
                >
                </v-select>
              </v-col>

              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  gap: 20px;
                "
              >
                <v-btn
                  @click="add_address()"
                  dark
                  large
                  class="edit-address-btn"
                  :style="'backgroundColor:' + system_color.primary_color"
                >
                  SAVE
                  <v-icon size="18" class="pl-2"> mdi-content-save </v-icon>
                </v-btn>

                <v-btn
                  @click="
                    editForm = !editForm;
                    hiddenBtn = false;
                  "
                  large
                  dark
                  class="edit-address-btn"
                  :style="'backgroundColor:' + 'red'"
                >
                  CLOSE
                  <v-icon size="18" class="pl-2"> mdi-close </v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-form>
        </v-card-text>
      </v-expand-transition>
    </v-card>

    <!----------- Add New Shipping Address ------------>
    <!-- <v-card class="mt-8 px-4">
      <h1
        class="pt-4"
        :class="{
          'font-size-headline': $vuetify.breakpoint.xs,
          'font-size-display1': $vuetify.breakpoint.smAndUp,
          'text-center': $vuetify.breakpoint.width < 868,
        }"
      >
        Add New Address
      </h1>

      <h3
        class="billing-title"
        :class="{
          'font-size-headline': $vuetify.breakpoint.xs,
          'font-size-display1': $vuetify.breakpoint.smAndUp,
          'text-center': $vuetify.breakpoint.width < 868,
        }"
      >
        Billing Address
      </h3>
      <v-form ref="saveAddress" style="font-weight: 500; margin-top: 12px">
        <v-row class="my-1">
          Add New Billing Address
          <v-col cols="12">
            <v-text-field
              v-model="user_data.billing_address"
              :rules="newAddressRules"
              outlined
              label="Billing Address"
              clear-icon="mdi-close-circle"
              clearable
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user_data.billing_country"
              :rules="newCountryRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="Country"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="user_data.billing_postcode"
              :rules="newZipCodeRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="ZIP/Postcode"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user_data.billing_city"
              :rules="newCityRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="Town/City"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="user_data.billing_state"
              :rules="newStateRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              label="State"
              :items="items"
              :menu-props="{ top: true, offsetY: true }"
              item-color="blue darken-1"
              outlined
            >
            </v-select>
          </v-col>

          <v-col cols="12" sm="12">
            <h3
              class="billing-title mt-n5"
              :class="{
                'font-size-headline': $vuetify.breakpoint.xs,
                'font-size-display1': $vuetify.breakpoint.smAndUp,
                'text-center': $vuetify.breakpoint.width < 868,
              }"
            >
              Shipping Address
            </h3>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="user_data.shipping_address"
              :rules="newAddressRules"
              outlined
              label="Shipping Address"
              clear-icon="mdi-close-circle"
              clearable
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user_data.shipping_country"
              :rules="newCountryRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="Country"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="user_data.shipping_postcode"
              :rules="newZipCodeRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="ZIP/Postcode"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user_data.shipping_city"
              :rules="newCityRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              outlined
              label="Town/City"
              clear-icon="mdi-close-circle"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="user_data.shipping_state"
              :rules="newStateRules"
              :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
              label="State"
              :items="items"
              :menu-props="{ top: true, offsetY: true }"
              item-color="blue darken-1"
              outlined
            >
            </v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" style="margin-top: -15px">
            <v-btn
              @click="add_address()"
              block
              dark
              large
              :style="'backgroundColor:' + system_color.primary_color"
            >
              SAVE
              <v-icon size="18" class="pl-2"> mdi-content-save </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card> -->

    <v-overlay :value="page_loading">
      <v-progress-circular indeterminate size="65"> </v-progress-circular>
    </v-overlay>

    <v-dialog v-model="updAddressSuccess_dialog" width="400">
      <v-card>
        <div class="update-success-container text-center">
          <v-img
            max-height="140"
            max-width="140"
            contain
            :src="require('~/assets/images/check-icon-3.png')"
          >
          </v-img>
          <h2
            :class="{ 'font-size-headline': $vuetify.breakpoint.xs }"
            style="
              font-family: Montserrat, sans-serif !important;
              padding-top: 10px;
            "
          >
            SUCCESS !
          </h2>
          <p style="font-weight: 300; padding: 10px 20px; line-height: 35px">
            Your address has been update successfully.
          </p>

          <v-btn
            class="px-16 mt-n3"
            dark
            :style="'backgroundColor:' + system_color.primary_color"
            elevation="0"
            @click="updAddressSuccess_dialog = false"
          >
            Okay
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addressEditing",

  data() {
    return {
      user_data: "",
      page_loading: false,
      updAddressSuccess_dialog: false,
      addressField: "",
      editForm: false,
      hiddenBtn: false,

      /* ---------- Save New Address Field Section ---------*/
      addressRules: [(v) => !!v || "Address is required"],
      billingAddress: "",
      shippingAddress: "",

      billingZipCode: "",
      shippingZipCode: "",
      zipCodeRules: [
        (v) => !!v || "ZIP / Postcode is required",
        (v) => Number.isInteger(v) || "Only accept integer or number",
      ],

      cityRules: [(v) => !!v || "Town / City is required"],
      billingCity: "",
      shippingCity: "",
      billingMyCity: true,
      shippingMyCity: true,

      stateRules: [(v) => !!v || "State is required"],
      billingState: "",
      shippingState: "",
      billingMyState: true,
      shippingMyState: true,
      states: [
        "Johor",
        "Kedah",
        "Kelantan",
        "Kuala Lumpur",
        "Labuan",
        "Melaka",
        "Negeri Sembilan",
        "Pahang",
        "Penang",
        "Perak",
        "Perlis",
        "Putrajaya",
        "Sabah",
        "Sarawak",
        "Selangor",
        "Terengganu",
      ],
      shippingCountryName: "",
      billingCountryName: "",
      countryRules: [(v) => !!v || "Country is required"],
      shippingCountry: "Malaysia",
      billingCountry: "Malaysia",
      countries: [{ country: "Malaysia" }, { country: "Singapore" }],
      // states: [{ state: "Kedah" }, { state: "Kelantan" },{ state: "Kuala Lumpur" },{ state: "Labuan" },{ state: "Melaka" },{ state: "Negeri Sembilan" },{ state: "Pahang" },{ state: "Penang" },{ state: "Perak" },{ state: "Perlis" },{ state: "Putrajaya" },{ state: "Sabah" },{ state: "Sarawak" },{ state: "Selangor" },{ state: "Terengganu" }],
      // states: [{ state: "1" },{ state: "2" },{ state: "3" }],
    };
  },

  created() {
    this.get_user_details();

    // if (this.user_data.billing_country != "Malaysia") {
    //   this.billingMyState = false;
    //   this.billingMyCity = false;
    // } else {
    //   this.billingMyState = true;
    //   this.billingMyCity = true;
    // }
  },

  computed: {
    system_color() {
      return this.$store.state.system_color;
    },

    login_data() {
      return this.$store.state.login_data;
    },
  },

  methods: {
    // changeBillingCountry() {
    //   if (this.billingCountry.country.country == "Malaysia") {
    //     this.billingMyState = true;
    //     this.billingMyCity = true;
    //   } else {
    //     this.billingMyState = false;
    //     this.billingMyCity = false;
    //   }

    //   this.states[0].state = [{state: 'Johor'}, {state:'Kelantan'}]

    //   if(this.billingState.state == ['Johor']) {
    //     console.log('12312312', this.billingState2.state2 = 'JB', this.state2 = 'JBB')
    //      this.items2[0].state2 = 'JBB' , "<br>" , 'JBB2'
    //   }
    //   else{
    //     this.text = ""
    //   }
    //   if(this.stateSelect.items = ['Pahang']) {
    //     this.stateSelect2.items = ['hahahaha', '12312312'];
    //     console.log('123123123123')
    //     // this.stateSelect2.items == ['SG', 'MALAY']
    //   }
    //   else{
    //     this.stateSelect2.items = ['Malaysia', '12312312'];
    //   }
    // },

    // changeShippingCountry() {
    //   if (this.shippingCountry.country == "Malaysia") {
    //     this.shippingMyState = true;
    //     this.shippingMyCity = true;
    //   } else {
    //     this.shippingMyState = false;
    //     this.shippingMyCity = false;
    //   }
    // },

    get_user_details() {
      const params = new URLSearchParams();
      params.append("get_user_details", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);

      axios({
        method: "post",
        url: "https://formtest.lkmng.com/profile/index.php",
        data: params,
      })
        .then((response) => {
          if (response.data.data[0].shipping_country == "SG") {
            this.shippingCountryName = "Singapore";
          } else {
            this.shippingCountryName = "Malaysia";
          }

          if (response.data.data[0].billing_country == "SG") {
            this.billingCountryName = "Singapore";
          } else {
            this.billingCountryName = "Malaysia";
          }

          this.user_data = response.data.data[0];
          this.billingAddress = response.data.data[0].billing_address;
          this.billingZipCode = response.data.data[0].billing_postcode;
          this.billingCity = response.data.data[0].billing_city;
          this.billingState = response.data.data[0].billing_state;
          this.billingCountry = this.billingCountryName;
          this.shippingAddress = response.data.data[0].shipping_address;
          this.shippingZipCode = response.data.data[0].shipping_postcode;
          this.shippingCity = response.data.data[0].shipping_city;
          this.shippingState = response.data.data[0].shipping_state;
          this.shippingCountry = this.shippingCountryName;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    add_address() {
      if (this.$refs.saveAddress.validate() == false) {
        return;
      }
      const params = new URLSearchParams();
      params.append("update_address", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);
      params.append("billing_address", this.billingAddress);
      params.append("billing_postcode", this.billingZipCode);
      params.append(
        "billing_city",
        this.billingCountry == "Singapore" ? "" : this.billingCity
      );
      params.append(
        "billing_state",
        this.billingCountry == "Singapore" ? "" : this.billingState
      );
      params.append(
        "billing_country",
        this.billingCountry == "Singapore" ? (this.billingCountry = "SG") : "MY"
      );
      params.append("shipping_address", this.shippingAddress);
      params.append("shipping_postcode", this.shippingZipCode);
      params.append(
        "shipping_city",
        this.shippingCountry == "Singapore" ? "" : this.shippingCity
      );
      params.append(
        "shipping_state",
        this.shippingCountry == "Singapore" ? "" : this.shippingState
      );
      params.append(
        "shipping_country",
        this.shippingCountry == "Singapore"
          ? (this.shippingCountry = "SG")
          : "MY"
      );

      // console.log("user_id", this.login_data[0].user_detail.userId);
      // console.log("billing_address", this.billingAddress);
      // console.log("billing_postcode", this.billingZipCode);
      // console.log("billing_city", this.billingCity);
      // console.log("billing_state", this.billingState);
      // console.log("billing_country", this.billingCountry);
      // console.log("shipping_address", this.shippingAddress);
      // console.log("shipping_postcode", this.shippingZipCode);
      // console.log("shipping_city", this.shippingCity);
      // console.log("shipping_state", this.shippingState);
      // console.log("shipping_country", this.shippingCountry);

      axios({
        method: "post",
        url: "https://user.lkmng.com/profile/index.php",
        data: params,
      })
        .then((response) => {
          if (response.data.status == "1") {
            this.page_loading = true;

            setTimeout(() => {
              this.page_loading = false;
              this.updAddressSuccess_dialog = true;
              this.get_user_details();

              // this.$store.commit("setUserInfo", [
              //   {
              //     user_id: this.login_data[0].user_detail.userId,
              //     status: 1,
              //     billingInfo: {
              //       billingAddress: this.billingAddress,
              //       billingZipCode: this.billingZipCode,
              //       billingCity: this.billingCity,
              //       billingState: this.billingState,
              //       billingCountry: this.billingCountry,
              //     },
              //     shippingInfo: {
              //       shippingAddress: this.shippingAddress,
              //       shippingZipCode: this.shippingZipCode,
              //       shippingCity: this.shippingCity,
              //       shippingState: this.shippingState,
              //       shippingCountry: this.shippingCountry,
              //     },
              //   },
              // ]);
            }, 2500);

            this.$refs.saveAddress.reset();
          } else {
            alert("false");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-label {
  font-weight: bold;
  font-size: 13.5px !important;
}

::v-deep .v-label--active {
  font-size: 14px !important;
}

.account-info-container {
  width: 100%;
  padding: 0px 40px 100px;
  /* background-image: linear-gradient(#f5f5f5, #e7e7e7); */
}

.account-info-container .account-link-title {
  margin: -88px 0 50px;
  font-size: 50px;
  color: white;
  position: relative;
}

.account-info-container .account-link-title::after {
  content: "";
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 2px;
  width: 140px;
  background: white;
}

.update-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  padding: 30px 0 30px;
}

.billing-title {
  color: rgb(96, 97, 97);
  position: relative;
  font-weight: 600;
  font-size: 18px;
  padding: 20px 0 0;
}

.billing-title::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: -10px;
  height: 2px;
  width: 40px;
  background: rgb(96, 97, 97);
}

.address-info {
  text-align: center;
  font-size: 16px;
  letter-spacing: -0.8px;
  line-height: 30px;
  font-weight: 500;
  color: #7c7979;
  padding: 10px 5px 0 0;
}

@media screen and (max-width: 1023px) {
  .account-info-container .account-link-title {
    font-size: 42px;
    margin-top: -85px;
  }

  .account-info-container .account-link-title::after {
    width: 120px;
  }
}

@media screen and (max-width: 868px) {
  .account-info-container {
    width: 100%;
  }

  .billing-title::after {
    margin: 0 auto;
  }
}

@media screen and (max-width: 480px) {
  .account-info-container {
    zoom: 0.8;
  }
}
</style>
