<template>
  <div class="account-card-container">
    <v-card class="account-card">
      <v-container
        class="d-flex align-center justify-center flex-column py-6"
        style="background: linear-gradient(#bdc3c7, #2c3e50)"
      >
        <v-badge
          bottom
          color="transparent"
          avatar
          offset-x="30"
          offset-y="30"
          overlap
        >
          <template v-slot:badge>
            <v-btn
              @click="$refs.fileUpload.click()"
              v-model="imageName"
              type="file"
              fab
              color="#DEE0E5"
              x-small
              elevation="0"
            >
              <v-icon> mdi-camera-plus </v-icon>
            </v-btn>

            <input
              v-show="false"
              ref="fileUpload"
              type="file"
              accept="image/*"
              @change="onFilePicked"
            />
          </template>

          <v-avatar size="140">
            <v-img
              cover
              :src="
                profilePic == ''
                  ? require('@/assets/images/customer-logo.png')
                  : 'https://user.lkmng.com/image/' +
                    form_data[0].merchant_id +
                    '/' +
                    profilePic
              "
            ></v-img>
          </v-avatar>
        </v-badge>
        <h4
          class="text-center pt-3 font-weight-bold white--text"
          style="font-size: 22px; padding: 0 15px"
        >
          {{ login_data[0].user_detail.name }}
        </h4>
        <h6
          class="text-center font-weight-bold blue-grey--text text--lighten-"
          style="font-size: 12px"
        >
          {{ login_data[0].user_detail.email }}
        </h6>
      </v-container>

      <h3
        :style="'color:' + system_color.primary_color"
        style="font-weight: bold; text-align: center; padding-top: 20px"
      >
        Useful Links
      </h3>
      <hr
        style="border-color: #f4f4f4; margin: 15px 15px 0; border-width: 2px"
      />

      <v-list class="mt-2">
        <v-list-item-group :value="selectedAcc">
          <v-list-item
            link
            @click="
              update_selected(index);
              accLink_onclick(index);
            "
            v-for="(accountLink, index) in accountLinks"
            :key="index"
            active-class="active-link-border"
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
    </v-card>

    <v-overlay :value="page_loading">
      <v-progress-circular indeterminate size="65"> </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "accountNavigation",

  data() {
    return {
      page_loading: false,
      profilePic: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      strImage: "",

      accountLinks: [
        { title: "Order History", icon: "mdi-clipboard-text-clock" },
        { title: "Profile Editing", icon: "mdi-account-badge" },
        { title: "Address Editing", icon: "mdi-map-marker" },
        { title: "Logout", icon: "mdi-logout" },
      ],

      merchant_url: this.$store.state.merchant_url,
      // loginUser:{
      //   name: this.$store.state.login_data.user_detail.name,
      //   email: this.$store.state.login_data.user_detail.email,
      //   status: this.$store.state.login_data.status,
      // }
    };
  },
  created() {
    this.get_user_details();
  },

  computed: {
    form_data() {
      return this.$store.state.form_data;
    },

    system_color() {
      return this.$store.state.system_color;
    },

    selectedAcc() {
      return this.$store.state.selectedLink;
    },

    login_data() {
      return this.$store.state.login_data;
    },

    profile_img() {
      return this.$store.state.profile_pic;
    },
  },

  /* ********** Noted!
      selectedAcc() 這個computed property, 放在computed是因爲data會根據用戶的action來改變
      這個computed property, return current selected link from vuex (因爲在default page也做了同樣動作, 他會根據store在default 的value，return在這，因此，如果default的index value是1，這裏也會是1)
      過後set了一個updated_selected method, 把他放在link那邊，onclick 就會trigger這個method，當click的時候就會store目前的index value去vuex
      store了過後，同樣的set :value = "selectedAcc" 拿回current data from vuex. 一直這樣重複 (更簡單的方法就是follow default page的,computed property是直接get和set)
      */

  methods: {
    update_selected(i) {
      this.$store.commit("setSelectedLink", i);
    },

    accLink_onclick(i) {
      if (i == 3) {
        this.$router.push("/" + this.merchant_url);
        this.page_loading = true;

        setTimeout(() => {
          this.page_loading = false;
        }, 1000);

        this.$store.commit("setLoginInfo", [
          {
            status: "",
            user_detail: {
              name: "",
              email: "",
              userId: "",
              country_code: "",
              phoneNo: "",
            },
          },
        ]);
        // this.$store.commit("setLoginInfo",  this.loginUser.name="")
        // this.$store.commit("setLoginInfo",  this.loginUser.email="")
        // this.$store.commit("setLoginInfo",  this.statusLogin="")
      }
    },
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
          this.profilePic = response.data.data[0].profile_img;
          this.$store.commit("setProfilePic", this.profilePic);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    change_profilePic(imagebase64) {
      const params = new URLSearchParams();
      params.append("upload_picture", 1);
      params.append("user_id", this.login_data[0].user_detail.userId);
      params.append("merchant_id", this.form_data[0].merchant_id);
      params.append("image_code", imagebase64);

      axios({
        method: "post",
        url: "https://user.lkmng.com/profile/index.php",
        data: params,
      })
        .then((response) => {
          if(response.data.status == 1){
            this.get_user_details();
          }
          else{
            console.log('fail', response.data.reason)
          }
          console.log('response', response)
          // this.$store.commit("setProfilePic", imagebase64)
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.strImage = this.imageUrl.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          this.change_profilePic(this.strImage);
          // this.imageFile = files[0]; // this is an image file that can be sent to server...
          // console.log('imageFile', this.imageFile)
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
  },
};
</script>

<style scoped>
.account-card-container {
  padding-left: 100px;
}

.account-card-container .account-card {
  width: 320px;
  margin: -85px 0 60px 0;
}

.active-link-border {
  border-right: 4px solid #7facd9;
}

.v-list .v-list-item--active,
.v-list .v-list-item--active .v-icon {
  color: #5091d3;
}

/* for changing v-select (states) margin */
.v-menu__content {
  margin-top: 162px !important;
}

@media screen and (min-width: 1355px) {
  .account-card-container {
    zoom: 1.15;
    padding-left: 150px;
  }
}

@media screen and (max-width: 1024px) {
  .account-card-container {
    padding-left: 150px;
  }
}

@media screen and (max-width: 1023px) {
  .account-card-container {
    padding-left: 80px;
  }
}

@media screen and (max-width: 868px) {
  .account-card-container {
    padding: 0 60px;
    width: 80%;
  }

  .account-card-container .account-card {
    width: 100%;
  }
}

@media screen and (max-width: 599px) {
  .account-card-container {
    width: 100%;
    padding: 0 70px;
  }
}

@media screen and (max-width: 440px) {
  .account-card-container {
    padding: 0 40px;
  }
}
</style>
