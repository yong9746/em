<template>
  <div class="account-info-container">
    <v-overlay :value="page_loading">
      <v-progress-circular indeterminate size="65"> </v-progress-circular>
    </v-overlay>
    
    <h1
      v-show="$vuetify.breakpoint.smAndUp"
      class="account-link-title text-center"
    >
      Order History
    </h1>

    <hr
      v-show="$vuetify.breakpoint.width >= 868"
      style="border-color: #e3dddd; border-width: 2.5px"
    />

    <NuxtLink
      :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
    >
      <button
        v-if="order_data != '' && this.page_loading == false"
        :style="'backgroundColor:' + system_color.primary_color"
        :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
        style="margin: 0"
        class="custom-btn custom-btn-effect hidden-xs-only"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Order Now
      </button>
    </NuxtLink>

    <div
      v-if="order_data == '' && this.page_loading == false"
      class="text-center d-flex align-center justify-center flex-column"
    >
      <h1
        :class="{
          'font-size-headline': $vuetify.breakpoint.width < 486,
          'font-size-display4': $vuetify.breakpoint.width < 868,
          'font-size-display1': $vuetify.breakpoint.smAndUp,
        }"
      >
        It looks empty here!
      </h1>
      <v-img
        style="width: 100%; max-width: 400px"
        :class="{ 'mr-10': $vuetify.breakpoint.width > 868 }"
        :lazy-src="`https://i1.wp.com/angularscript.com/wp-content/uploads/2018/06/Progressively-Loading-Images-With-Blur-Effect-min.png?fit=800%2C455&ssl=1`"
        :src="require('~/assets/images/empty-order.jpeg')"
        aspect-ratio="1"
        class="grey lighten-2"
        max-height="500"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
      <h1
        style="color: #535050"
        :class="{
          'font-size-headline-2': $vuetify.breakpoint.width < 486,
          'font-size-headline': $vuetify.breakpoint.width < 868,
          'font-size-display3': $vuetify.breakpoint.smAndUp,
        }"
      >
        Sorry, We did not find any order records in this account.
      </h1>
      <NuxtLink
        :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
      >
        <button
          :style="'backgroundColor:' + system_color.primary_color"
          :to="merchant_domain == '' ? '/' + merchant_url : merchant_domain"
          class="custom-btn custom-btn-effect"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Order Now
        </button>
      </NuxtLink>
    </div>

    <v-card class="order-history-section" style="margin-top: 40px" v-else>
      <v-row
        class="d-flex justify-end"
        :class="{ 'd-flex justify-center': $vuetify.breakpoint.xs }"
      >
        <v-col
          cols="8"
          sm="4"
          class="mb-4"
          :class="{ 'mr-2': $vuetify.breakpoint.smAndUp }"
        >
          <v-text-field
            style="font-weight: 500 !important"
            outlined
            dense
            v-model="search"
            append-icon="mdi-magnify"
            placeholder="Search..."
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="order_data"
        :items-per-page="10"
        :search="search"
        :custom-sort="customSort"
        class="elevation-1 mt-4"
      >
        <template v-slot:item.total="{ item }">
          <tr class="d-flex align-center justify-center">
            <td>RM {{ item.total }}</td>
          </tr>
        </template>

        <template v-slot:item.payment_status="{ item }">
          <tr class="d-flex align-center justify-center">
            <td>{{ item.payment_status }}</td>
          </tr>
        </template>

        <!-- <template v-slot:item="{ item }">
          <tr>
            <td style="width:100px">{{ item.order_id }}</td>
            <td style="width:100px">{{ item.created_at }}</td>
            <td style="width:100px">{{ item.payment_status }}</td>
            <td style="width:100px">{{ item.total_amount }}</td>
            <td style="width:100px">{{ item.total }}</td>
            <td style="width:100px">{{ item.action }}</td>
          </tr>
        </template> -->

        <!-- <template v-slot:item.public_url="{ item }">
          <v-dialog v-model="invoice_dialog" max-width="700px">
            <iframe
              width="700"
              height="900"
              :src="`https://cp.emenu.com.my/order/view-order.php?id=`+item.public_url"
            ></iframe>
          </v-dialog>
          {{ item.public_url }}
        </template> -->

        <template v-slot:item.action="{ item }">
          <div class="d-flex align-center justify-center" style="width: 100%">
            <v-btn
              @click="get_invoice(item.public_url)"
              dark
              elevation="1"
              :style="'backgroundColor:' + system_color.primary_color"
              style="padding: 0; font-size: 12px"
              v-model="item.action"
            >
              View
            </v-btn>

            <v-btn
              @click="upload_resit(item.public_url)"
              dark
              elevation="1"
              :style="'backgroundColor:' + system_color.primary_color"
              style="padding: 0; font-size: 12px; margin-left: 10px"
              v-model="item.action"
            >
              Upload
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="invoice_dialog" max-width="700px">
      <iframe
        width="700"
        height="900"
        :src="`https://cp.emenu.com.my/order/view-order.php?id=` + invoice_id"
      ></iframe>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "orderHistory",
  data() {
    return {
      invoice_id: "",
      search: "",
      invoice_dialog: false,
      upload_dialog: false,
      page_loading: true,
      order_data: [],
      coupon_discount: 0,
      tax: "",
      paymentStatus: "",
      headers: [
        {
          text: "Order ID",
          align: "center",
          value: "order_id",
          divider: true,
        },
        { text: "Date", value: "created_at", align: "center", divider: true },
        {
          text: "Status",
          value: "payment_status",
          align: "center",
          divider: true,
        },
        {
          text: "Total Amount",
          value: "total",
          align: "center",
          divider: true,
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
      // myOrder: [
      //   {
      //     name: "Frozen Yogurt",
      //     date: "2022-12-08",
      //     status: "Success",
      //     total: "RM 322",
      //   },
      //   {
      //     name: "Ice cream sandwich",
      //     date: "2022-1-4",
      //     status: "Success",
      //     total: "RM 168",
      //   },
      //   {
      //     name: "Eclair",
      //     date: "2023-12-5",
      //     status: "Cancelled",
      //     total: "RM 168.55",
      //   },
      //   {
      //     name: "Cupcake",
      //     date: "2022-09-02",
      //     status: "Cancelled",
      //     total: "RM 551.25",
      //   },
      //   {
      //     name: "Gingerbread",
      //     date: "2021-06-02",
      //     status: "Success",
      //     total: "RM 799",
      //   },
      //   {
      //     name: "Jelly bean",
      //     date: "2022-07-01",
      //     status: "Cancelled",
      //     total: "RM 122",
      //   },
      //   {
      //     name: "Lollipop",
      //     date: "2025-06-11",
      //     status: "Success",
      //     total: "RM 321.25",
      //   },
      //   {
      //     name: "Honeycomb",
      //     date: "2022-08-11",
      //     status: "Cancelled",
      //     total: "RM 99",
      //   },
      //   {
      //     name: "Donut",
      //     date: "October 10, 2022",
      //     status: "Cancelled",
      //     total: "RM 27.50",
      //   },
      //   {
      //     name: "KitKat",
      //     date: "October 6, 2022",
      //     status: "Cancelled",
      //     total: "RM 55",
      //   },
      // ],
    };
  },

  created() {
    this.get_order_data();
  },

  computed: {
    system_color() {
      return this.$store.state.system_color;
    },

    login_data() {
      return this.$store.state.login_data;
    },

    merchant_url() {
      return this.$store.state.merchant_url;
    },

    merchant_domain() {
      return this.$store.state.merchant_domain;
    },
  },

  methods: {
    get_invoice(url) {
      this.invoice_dialog = true;
      this.invoice_id = url;
    },

    upload_resit(url) {
      this.invoice_id = url;
      this.$router.push(
        "/" + this.merchant_url + "/order-payment/" + this.invoice_id
      );
    },

    get_order_data() {
      const params = new URLSearchParams();
      params.append("order_list", 1);
      params.append("customer_id", this.login_data[0].user_detail.userId);

      axios({
        method: "post",
        url: "https://user.lkmng.com/order/index.php",
        data: params,
      })
        .then((response) => {
          this.order_data = response.data.order;
          this.page_loading = false;

          for (var i = 0; i < response.data.order.length; i++) {
            this.coupon_discount = response.data.order[i].coupon_discount;
            if (
              this.coupon_discount == "" ||
              this.coupon_discount == NaN ||
              this.coupon_discount == null
            ) {
              this.coupon_discount = 0;
            } else {
              this.coupon_discount = response.data.order[i].coupon_discount;
            }

            this.tax = response.data.order[i].tax;
            if (this.tax == "" || this.tax == NaN || this.tax == null) {
              this.tax = 0;
            } else {
              this.tax = response.data.order[i].tax;
            }

            //change the payment status to customize string
            if (response.data.order[i].payment_status == 0) {
              this.paymentStatus = "Not Using";
            } else if (response.data.order[i].payment_status == 1) {
              this.paymentStatus = "Payment Pending";
            } else if (response.data.order[i].payment_status == 2) {
              this.paymentStatus = "Succesful";
            } else if (response.data.order[i].payment_status == 3) {
              this.paymentStatus = "Failed";
            }

            response.data.order[i].payment_status = this.paymentStatus; //add a new array called payment_status

            //calculate total amount
            //add a new array called total
            response.data.order[i].total =
              parseFloat(response.data.order[i].total_amount) +
              parseFloat(response.data.order[i].delivery_fee) +
              parseFloat(this.tax) -
              parseFloat(response.data.order[i].discount_amount);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    customSort: function (items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == "date") {
          if (!isDesc[0]) {
            return a.time_stamp - b.time_stamp;
          } else {
            return b.time_stamp - a.time_stamp;
          }
        } else if (!isNaN(a[index[0]])) {
          if (!isDesc[0]) {
            return a[index[0]] - b[index[0]];
          } else {
            return b[index[0]] - a[index[0]];
          }
        } else {
          if (!isDesc[0]) {
            return a[index[0]] < b[index[0]] ? -1 : 1;
          } else {
            return b[index[0]] < a[index[0]] ? -1 : 1;
          }
        }
      });
      return items;
    },
    // customSort: function (items, index, isDesc) {
    //   items.sort((a, b) => {
    //     if (index === "created_at") {
    //       if (!isDesc[0]) {
    //         return new Date(b[index]) - new Date(a[index]);
    //       } else {
    //         return new Date(a[index]) - new Date(b[index]);
    //       }
    //     } else {
    //       if (typeof a[index] !== "undefined") {
    //         if (!isDesc[1]) {
    //           return a[index].localeCompare(b[index]);
    //         } else {
    //           return b[index].localeCompare(a[index]);
    //         }
    //       }
    //     }
    //   });
    //   return items;
    // },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-data-footer {
  font-size: 1.4rem;
  font-weight: 400;
  display: flex;
  padding: 0 30px;
}

.v-data-table::v-deep th {
  font-size: 20px !important;
}

.v-data-table::v-deep td {
  font-size: 18px !important;
  font-weight: 500;
}

.account-info-container {
  width: 100%;
  padding: 0px 40px 100px;
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

.custom-btn {
  margin: 40px 0;
  position: relative;
  padding: 12px 30px;
  text-decoration: none;
  color: white;
  font-size: 2rem;
  font-weight: 500;
  font-family: "Monsterrat";
  text-transform: uppercase;
  letter-spacing: 4px;
  overflow: hidden;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.custom-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(214, 210, 210, 0.1);
}

.custom-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
  transition-delay: 0.6s;
}

.custom-btn:hover::after {
  left: 100%;
}

.custom-btn span {
  position: absolute;
  display: block;
  transition: 0.7s ease;
}

.custom-btn span:nth-child(1) {
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
}

.custom-btn-effect:before {
  position: absolute;
  content: "";
  display: inline-block;
  top: -180px;
  left: 0;
  width: 30px;
  height: 100%;
  background-color: #fff;
  animation: shiny 4s ease-in-out infinite;
}

@keyframes shiny {
  0% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  80% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  81% {
    -webkit-transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(50) rotate(45deg);
    opacity: 0;
  }
}

.custom-btn:hover span:nth-child(1) {
  width: 100%;
  // transform: translateX(100%);
}

.custom-btn span:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background: white;
}

.custom-btn:hover span:nth-child(3) {
  width: 100%;
  // transform: translateX(-100%);
}

.custom-btn span:nth-child(2) {
  top: 0;
  left: 0;
  width: 2px;
  height: 0;
  background: white;
}

.custom-btn:hover span:nth-child(2) {
  height: 100%;
  // transform: translateY(100%);
}

.custom-btn span:nth-child(4) {
  bottom: 0;
  right: 0;
  width: 2px;
  height: 0;
  background: white;
}

.custom-btn:hover span:nth-child(4) {
  height: 100%;
  // transform: translateY(-100%);
}

.text-start span {
  font-size: 33px !important;
}

@media screen and (min-width: 1024px) {
  .account-info-container {
    zoom: 0.9;
  }
}

@media screen and (max-width: 1023px) {
  .account-info-container {
    zoom: 0.85;
  }

  .account-info-container .account-link-title {
    font-size: 42px;
    margin-top: -85px;
  }

  .account-info-container .account-link-title::after {
    width: 120px;
  }
}

@media screen and (max-width: 982px) {
  .order-history-section {
    zoom: 0.88;
  }
}

@media screen and (max-width: 868px) {
  .account-info-container {
    width: 100%;
  }
}

@media screen and (max-width: 599px) {
  .account-info-container {
    padding: 0px 30px 100px;
  }
  .edit-address-btn {
    zoom: 0.9;
  }
}
</style>
