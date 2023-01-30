<template></template>

<script>
export default {};
</script>

<style></style>

<template>
  <div class="account-info-container">
    <h1
      v-show="$vuetify.breakpoint.smAndUp"
      class="account-link-title text-center"
    >
      Profile Editing
    </h1>
    <hr
      v-show="$vuetify.breakpoint.width >= 868"
      style="border-color: #e3dddd; border-width: 2.5px"
    />
    <!-- Name: {{login_data[0].user_detail.name}}
      Email: {{login_data[0].user_detail.email}}
      CountryCode: {{login_data[0].user_detail.country_code}}
      PhoneNo: {{login_data[0].user_detail.phoneNo}} -->

    <h1
      class="mt-2"
      :class="{
        'font-size-headline': $vuetify.breakpoint.xs,
        'font-size-display2': $vuetify.breakpoint.smAndUp,
        'text-center': $vuetify.breakpoint.width < 868,
      }"
    >
      Basic Information
    </h1>

    <v-form ref="saveBasicInfo" style="font-weight: 500">
      <v-row class="my-1">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userName"
            :rules="nameRules"
            filled
            class="mb-1"
            outlined
            label="Name"
            clear-icon="mdi-close-circle"
            clearable
            required
          ></v-text-field>
        </v-col>
        <!-- {{login_data[0].user_detail.name}}
        {{login_data[0].user_detail.email}} -->

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userEmail"
            :rules="emailRules"
            :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
            filled
            class="mb-1"
            outlined
            label="Email Address"
            clear-icon="mdi-close-circle"
            clearable
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-menu
            ref="menuPicker"
            v-model="menuPicker"
            :close-on-content-click="false"
            :nudge-right="20"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birth_date"
                prepend-inner-icon="mdi-calendar"
                label="Date of Birth"
                :rules="[(v) => !!v || 'Please enter your birthdate']"
                outlined
                clearable
                hint="YYYY/MM/DD"
                readonly
                required
                filled
                style="margin-top: -20px"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birth_date"
              @input="dateMenu = false"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              @change="saveDate"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6">
          <vue-tel-input-vuetify
            @validate="onInputPhoneNo"
            v-on:country-changed="countryChangedLogin"
            v-model="vueTelVuetify.phoneNo"
            v-bind="vueTelVuetify.props"
            :rules="phoneNoRules"
            clear-icon="mdi-close-circle"
            clearable
            required
            filled
            style="margin-top: -20px"
          >
          </vue-tel-input-vuetify>
        </v-col>

        <v-col cols="12">
          <v-btn
            @click="change_profile()"
            block
            dark
            x-large
            style="font-size: 16px; margin-top: -10px"
            :style="'backgroundColor:' + system_color.primary_color"
          >
            SAVE
            <v-icon size="22" class="pl-2"> mdi-content-save </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <hr
      v-show="$vuetify.breakpoint.width >= 868"
      style="border-color: #e3dddd; border-width: 2.5px"
    />
    <h1
      class="mt-8"
      :class="{
        'font-size-headline': $vuetify.breakpoint.xs,
        'font-size-display2': $vuetify.breakpoint.smAndUp,
        'text-center': $vuetify.breakpoint.width < 868,
      }"
    >
      Password Changing
    </h1>

    <v-form ref="changePassword" style="font-weight: 500">
      <v-row class="my-1">
        <v-col cols="12" sm="6">
          <v-text-field
            class="mb-1"
            outlined
            v-model="oldPassword"
            name="oldPassword"
            label="Old Password"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showOldPassword ? 'text' : 'password'"
            @click:append="showOldPassword = !showOldPassword"
            :rules="oldPsRules"
            clear-icon="mdi-close-circle"
            clearable
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            class="mb-1"
            :class="{ 'mt-n5': $vuetify.breakpoint.xs }"
            outlined
            v-model="newPassword"
            name="newPassword"
            label="New Password"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            @click:append="showNewPassword = !showNewPassword"
            :rules="newPsRules"
            clear-icon="mdi-close-circle"
            clearable
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            class="mb-1 mt-n5"
            outlined
            v-model="confirmPassword"
            label="Confirm New Password"
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :rules="confirmPsRules.concat(passwordConfirmationRule)"
            clear-icon="mdi-close-circle"
            clearable
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn
            @click="change_password()"
            block
            dark
            x-large
            class="mt-n2"
            style="font-size: 16px"
            :style="'backgroundColor:' + system_color.primary_color"
          >
            UPDATE
            <v-icon size="22" class="pl-2"> mdi-update </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-overlay :value="page_loading">
      <v-progress-circular indeterminate size="65"> </v-progress-circular>
    </v-overlay>

    <v-dialog v-model="updInfo_dialog" width="400">
      <v-card>
        <div
          v-if="infoChangingStatus == 1"
          class="update-success-container text-center"
        >
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
          <p style="font-weight: 300; padding: 10px 20px; line-height: 30px">
            Congratulations! Your information has been successfully updated.
          </p>

          <v-btn
            class="px-16 mt-n3"
            dark
            :style="'backgroundColor:' + system_color.primary_color"
            elevation="0"
            @click="updInfo_dialog = false"
          >
            Okay
          </v-btn>
        </div>

        <div v-else class="update-success-container text-center">
          <v-img
            max-height="140"
            max-width="140"
            contain
            :src="require('~/assets/images/close-icon.png')"
          >
          </v-img>
          <h4
            :class="{
              'font-size-headline': $vuetify.breakpoint.xs,
              'font-size-display3': $vuetify.breakpoint.smAndUp,
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
            We apologize, but it seems the information you have provided has already been registered as a member. 
            Please double-check and try again.
          </p>

          <v-btn
            class="px-16 mt-n3"
            dark
            :style="'backgroundColor:' + system_color.primary_color"
            elevation="0"
            @click="updInfo_dialog = false"
          >
            Okay
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updPw_dialog" width="400">
      <v-card>
        <div
          v-if="pwChangingStatus == 1"
          class="update-success-container text-center"
        >
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
          <p style="font-weight: 300; padding: 10px 20px; line-height: 30px">
            Congratulations, your password has been successfully updated.
          </p>

          <v-btn
            class="px-16 mt-n3"
            dark
            :style="'backgroundColor:' + system_color.primary_color"
            elevation="0"
            @click="updPw_dialog = false"
          >
            Okay
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updPw_fail_dialog" width="400">
      <v-card>
        <div class="update-success-container text-center">
          <v-img
            max-height="140"
            max-width="140"
            contain
            :src="require('~/assets/images/close-icon.png')"
          >
          </v-img>
          <h4
            :class="{
              'font-size-headline': $vuetify.breakpoint.xs,
              'font-size-display3': $vuetify.breakpoint.smAndUp,
            }"
            class="animate__animated animate__shakeX animate__delay-.5s"
            style="
              font-family: Montserrat, sans-serif !important;
              font-weight: bold;
              letter-spacing: -1px;
              color: #e32727;
            "
          >
            {{ pw_error_msg }}
          </h4>
          <p style="font-weight: 300; padding: 0 20px">
            We apologize, but the password you entered does not match our records.
          </p>
          <v-btn
            class="px-16 mt-n3"
            dark
            :style="'backgroundColor:' + system_color.primary_color"
            elevation="0"
            @click="updPw_fail_dialog = false"
          >
            Try Again
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profileEditing",

  data() {
    return {
      page_loading: false,
      updInfo_dialog: false,
      updPw_dialog: false,
      updPw_fail_dialog: false,
      infoChangingStatus: "",
      pwChangingStatus: "",
      login_regis_msg: "",
      pw_error_msg: "",

      userName: "",
      nameRules: [
        (v) => !!v || "Name is required",
        // v => v.length <= 30 || 'Name must be less than 30 characters',
      ],

      userEmail: "",
      emailRules: [
        (v) => !!v || "E-mail is required (e.g. Shirlyn05@gmail.com)",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      activePicker: null,
      birth_date: "",
      menuPicker: false,
      dateMenu: false,

      phoneNo: "",
      phoneNoRules: [
        (v) => !!v || "Phone No. is required",
        // v => /(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/.test(v) || 'Phone No. must be valid',
      ],

      vueTelVuetify: {
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
          autocomplete: "on",
          outlined: true,
          autofocus: false,
          hint: "e.g. +60166998899",
          label: "Whatsapp Phone Number",
          onlyCountries: ["MY", "SG"],
          fetchCountry: true,
          required: true,
        },
      },

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,

      oldPsRules: [(value) => !!value || "Old password is required"],
      newPsRules: [
        (value) => !!value || "New password is required",
        (value) =>
          (value &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(
              value
            )) ||
          "Minimum 8 characters, one capital latter, special charater & number.",
      ],
      confirmPsRules: [
        (value) => !!value || "Confrim password is required",
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(
            value
          ) ||
          "Minimum 8 characters, one capital latter, special charater & number.",
      ],

      merchant_url: this.$store.state.merchant_url,
    };
  },

  created() {
    this.userName = this.login_data[0].user_detail.name;
    this.userEmail = this.login_data[0].user_detail.email;
      this.birth_date = this.login_data[0].user_detail.birth_date;
    this.vueTelVuetify.phoneNo =
      this.login_data[0].user_detail.country_code +
      this.login_data[0].user_detail.phoneNo;
  },

  watch: {
    menuPicker (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  computed: {
    form_data() {
      return this.$store.state.form_data;
    },

    system_color() {
      return this.$store.state.system_color;
    },

    passwordConfirmationRule() {
      return () =>
        this.newPassword === this.confirmPassword || "Password must match";
    },

    login_data() {
      return this.$store.state.login_data;
    },

    pw_status() {
      return this.$store.state.pw_status;
    },
  },

  methods: {
    saveDate (date) {
      this.$refs.menuPicker.save(date)
    },

    change_profile() {
      if (this.$refs.saveBasicInfo.validate() == false) {
        return;
      }

      if (this.vueTelVuetify.valid != true) {
        this.vueTelVuetify.props.errorMessages = "Invalid phone number";
        this.$refs.saveBasicInfo.validate() == false;
        return;
      }

      this.vueTelVuetify.phoneNoTrim = this.vueTelVuetify.phoneNo.replace(
        this.vueTelVuetify.countryCode,
        ""
      );
      const formattedPhoneNo = this.vueTelVuetify.phoneNoTrim.replace(
        /[^\d]+/g,
        ""
      );
      const params = new URLSearchParams();
      params.append("update_profile", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);
      params.append("merchant_id", this.form_data[0].merchant_id);
      params.append("name", this.userName);
      params.append("email", this.userEmail);
      params.append("birth_date", this.birth_date);
      params.append("country_code", this.vueTelVuetify.countryCode);
      params.append("phone", formattedPhoneNo);

      axios({
        method: "post",
        url: "https://user.lkmng.com/profile/index.php",
        data: params,
      })
        .then((response) => {
          this.infoChangingStatus = response.data.status;
          if (this.infoChangingStatus == "1") {
            this.page_loading = true;

            setTimeout(() => {
              this.page_loading = false;
              this.updInfo_dialog = true;
              this.$store.commit("setLoginInfo", [
                {
                  status: 1,
                  user_detail: {
                    name: this.userName,
                    userId: this.login_data[0].user_detail.userId,
                    email: this.userEmail,
                    birth_date: this.birth_date,
                    country_code: this.vueTelVuetify.countryCode,
                    phoneNo: formattedPhoneNo,
                    login_pw: this.login_data[0].user_detail.login_pw,
                  },
                },
              ]);
            }, 2500);
          } else {
            this.page_loading = true;
            setTimeout(() => {
              this.page_loading = false;
              this.updInfo_dialog = true;
            }, 2500);
            return (this.login_regis_msg = response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    change_password() {
      if (this.$refs.changePassword.validate() == false) {
        return;
      }

      if (this.login_data[0].user_detail.login_pw != this.oldPassword) {
        this.page_loading = true;
        setTimeout(() => {
          this.page_loading = false;
          this.updPw_fail_dialog = true;
        }, 2500);
        return (this.pw_error_msg = "Failed to update");
      }

      const params = new URLSearchParams();
      params.append("update_password", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);
      params.append("new_password", this.newPassword);

      axios({
        method: "post",
        url: "https://user.lkmng.com/registration/index.php",
        data: params,
      })
        .then((response) => {
          this.pwChangingStatus = response.data.status;
          if (this.pwChangingStatus == "1") {
            this.page_loading = true;

            setTimeout(() => {
              this.page_loading = false;
              this.updPw_dialog = true;
              this.$store.commit("setPassword", this.newPassword);
              // this.login_data[0].user_detail.login_pw=this.newPassword
              this.$refs.changePassword.reset();
            }, 2500);

            // setTimeout(() => {
            //   this.updPw_dialog = false;
            //   this.$store.commit("setPwStatus", "null");
            // }, 5000);
          } else {
            alert("false");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onInputPhoneNo: function ({ valid }) {
      this.vueTelVuetify.valid = valid;

      if (this.vueTelVuetify.valid == true) {
        this.vueTelVuetify.props.errorMessages = null; //check if the phone is valid,set errmsg to null
      }
    },

    countryChangedLogin(country) {
      this.vueTelVuetify.countryCode = "+" + country.dialCode;
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

@media screen and (max-width: 1023px) {
  .account-info-container {
    zoom: 0.9;
  }

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
}

@media screen and (max-width: 599px) {
  .edit-address-btn {
    zoom: 0.9;
  }
}
</style>
