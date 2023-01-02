<template>
  <div style="font-family: 'Montserrat', sans-serif !important; background-color: #feffff;" >
     <div v-show="$vuetify.breakpoint.smAndUp" class="account-title">
       <h1 class="account-dash-title">Dashboard</h1> 
       <div class="account-set-title-container">
          <h2 class="account-set-title" :style="'color:' + system_color.primary_color">Setting</h2>
       </div>
     </div>
  
     <div style="margin: 0; height: 250px;"
       :style="'backgroundColor:' + system_color.primary_color">
       <v-hover v-slot="{ hover }">
         <v-btn :to="merchant_domain=='' ? '/'+ merchant_url : merchant_domain"
            class="btn-back-home"
            id="no-background-hover" 
            text dark
            :style="{ 'color': hover ? '#FFFFFF' : '#D9DCE2 ' }"
            :ripple="false">
              <v-icon 
               left dark size="25">
                   mdi-arrow-left-circle
              </v-icon>
            Go Back Home
         </v-btn>
       </v-hover>
       <h1 
         v-show="$vuetify.breakpoint.width<868" 
         style="text-align: center; color: white; padding-top: 45px;">
           {{info(selectedAccLink)}}
       </h1>
     </div>
  
     <div
      :class="{'d-flex flex-row': $vuetify.breakpoint. smAndUp, 
      'd-flex flex-column align-center px-4':$vuetify.breakpoint.width<868 }">
       <!-- Use flex box to assign into 2 parts-->
       <!--Left Section-->
       <account-navigation/>
  
       <!--Right Section-->
       <template 
          v-if="selectedAccLink==0">
          <order-history/>
       </template>

       <template 
         v-if="selectedAccLink==1">
         <profile-editing/>
       </template>
       
       <template 
         v-if="selectedAccLink==2">
         <address-editing/>
       </template>
       
       <template 
         v-if="selectedAccLink==3">
       </template>
  
     </div>
  </div>
</template>

<script>
  import AccountNavigation from '@/components/accountNavigation.vue';
  import OrderHistory from '@/components/orderHistory.vue';
  import AddressEditing from '@/components/addressEditing.vue';
  import ProfileEditing from '@/components/profileEditing.vue';

  export default {
     components:{AccountNavigation, AddressEditing, ProfileEditing, OrderHistory},
     name: 'accountsetting',

     computed:{
        system_color(){
            return this.$store.state.system_color;
        },

        merchant_url(){
            return this.$store.state.merchant_url;
        },

        merchant_domain(){
            return this.$store.state.merchant_domain;
        },

        selectedAccLink(){
            return this.$store.state.selectedLink; //return current selectedLink value
        }, 
     },

     methods:{
        info(accLinkNo){
            if(accLinkNo==0){
                return 'Order History'
            }
            else if(accLinkNo==1){
                return 'Profile Editing'
            }
            else if(accLinkNo==2){
                return 'Address Editing'
            }
        }
     }
  }
</script>

<style scoped>
  .account-title{
      position: relative;
      padding: 30px 50px;
  }
  .account-title .account-dash-title{
    font-size: 65px;
    font-weight: 500;
    opacity: .15;
    position: absolute;
    top: 0;
    letter-spacing: -4px;
  }

  .account-title .account-set-title-container{
      position: relative;
      display: block;
  }

  .account-title .account-set-title-container .account-set-title{
    padding: 15px 15px;
    font-size: 48px;
    font-weight: 400;
    opacity: 0.8;
  }
  
  .account-title .account-set-title-container .account-set-title::after{
      content: '';
      position: absolute;
      width: 80px;
      height: 2px;
      bottom: 0;
      left: 15px;
      background: red;
  }

  .btn-back-home{
    font-size:18px; 
    padding:0 !important; 
    margin:20px 80px; 
    letter-spacing: -.5px;
  }

  @media screen and (min-width: 1355px) {
  .btn-back-home {
    margin:20px 180px; 
  }

  .account-title{
    padding: 30px 150px;
  }
}

@media screen and (max-width:868px) {
   .btn-back-home{
    margin:10px 50px; 
    letter-spacing: -.5px;
  }
}

@media screen and (max-width: 599px) {
   .btn-back-home{
     font-size: 14px;
     margin:5px 30px; 
  }
}

</style>