<template>
    <div>
     <v-card-title class="d-flex justify-center">
       <h2 class="tnc-title">Terms & Condition</h2>
     </v-card-title>
      <v-card-text>
        <h3 class="py-3 font-weight-medium tnc-description">
          Welcome to {{data_array[0].company_name}} web site online store. Terms and conditions stated below applies to all visitors and users of {{data_array[0].company_name}}. 
          Please note that you are agree to be bound by these terms and conditions as long as you are on {{data_array[0].site_url}}. Please read it carefully
          before accessing or using our services.
        </h3>
        <h4 class="tnc-category">General</h4>
        <p class="tnc-cat-description">
           The content of terms and conditions may be change, move or delete at any time. Please note that 
           {{data_array[0].company_name}} have the rights to change the contents of the terms and conditions without any 
           notice. Any violation of rules and regulations of these terms and conditions, {{data_array[0].company_name}} will 
           take immediate actions against the offender(s).
        </p>
        <h4 class="tnc-category">Site Contents & Copyrights</h4>
        <p class="tnc-cat-description">
           Unless otherwise noted, all materials, including images, illustrations, designs, icons, photographs, 
           video clips, and written and other materials that appear as part of this Site, in other words 
           “Contents of the Site” are copyrights, trademarks, trade dress and/or other intellectual properties 
           owned, controlled or licensed by {{data_array[0].company_name}}.
        </p>
        <h4 class="tnc-category">Product Information</h4>
        <p class="tnc-cat-description">
           We cannot guarantee all actual products will be exactly the same shown on the monitor as that 
           is depending on the user monitor.
        </p>
        <h4 class="tnc-category">Newsletter</h4>
        <p class="tnc-cat-description">
           User shall agree that {{data_array[0].company_name}} may send newsletter include the promotion regarding the latest 
           news/products/promotions etc through email to the user.
        </p>
        <h4 class="tnc-category">Indemnification</h4>
        <p class="tnc-cat-description">
           The user shall agree to defend, indemnify and hold {{data_array[0].company_name}} harmless from and against any and 
           all claims, damages, costs and expenses, including attorneys' fees, arising from or related to your use of the Site.
        </p> 
        <h4 class="tnc-category">Link to other sites</h4>
        <p class="tnc-cat-description">
           Any access link to third party sites is at your own risk. The seller will not be related or involve to any 
           such website if the user's content/product(s) got damaged or loss have any connection with third party site.
        </p>
        <h4 class="tnc-category">Inaccuracy Information</h4>
        <p class="tnc-cat-description">
           From time to time, there may be information on {{data_array[0].site_url}} that contains 
           typographical error, inaccuracies, omissions, that may relate to product 
           description, pricing, availability and article contents. We reserve the rights 
           to correct any errors, inaccuracies, change or edit information without prior notice to the customers. 
           If you are not satisfy with your purchased product(s), please return it back to us with the invoice. 
           Please check out “Return and Refund Policy”.
        </p>
        <h4 class="tnc-category">Termination</h4>
        <p class="tnc-cat-description">
           This agreement is effective unless and until either by the customer or the seller. 
           Customer may terminate this agreement at any time. However, the seller may also terminate the agreement 
           with the customer without any prior notice and will be denying the access of the customer who is 
           unable to comply the terms and conditions above.
        </p>
        <h4 class="tnc-category">Delivery</h4>
        <p class="tnc-cat-description">
           Delivery usually will takes about 2 to 14 days. If we are unable to meet the estimated delivery date, 
           we shall not be liable for any losses, liabilities, costs, damages, charges or expenses arising out of the late delivery.
        </p>
        <h4 class="tnc-category">Return & Refund Policy</h4>
        <p class="tnc-cat-description">
           The returned goods/products will be checked with the receipt together and the goods should be in the good condition. 
           The packaging should also be in original condition in original shipping container as received. If the goods/products 
           has been used or damaged by the customer, there will not be any refund. {{data_array[0].company_name}} will also not be 
           responsible if your shipment is lost during the return transit. Once we have checked and confirm the 
           goods/products, customer will receive the refund within 28 days and will be refunded via the same payment method .
        </p>
        
        <div style="font-size: 14px; line-height:20px">
          <span>Please return your purchase to the following address:</span>
          <br>
          <span>{{data_array[0].company_name}}</span>
          <br>
          <span>{{data_array[0].company_address}}.</span>
        </div>
      </v-card-text>
  
      <v-card-title class="d-flex justify-center">
       <h2 class="tnc-title">Privacy Policy</h2>
     </v-card-title>
      <v-card-text>
        <h4 class="pt-5 tnc-category">Collected Information</h4>
        <p class="tnc-cat-description">
           We only collect the informations that needed for the procedure at our website or when fill up the personal information 
           on the site. The information that we gathered are voluntarily submitted by the customers to us. 
           We collect customer's personal information during the account registration on our site.
        </p>
        <h4 class="tnc-category">Personal Identification Details</h4>
        <p class="tnc-cat-description">
           Your personal identification details are used to process your order of the products, 
           customize your profile information, internal usage with legal requirements, 
           update your status of online shopping in our site and also to update our customers with our 
           latest news of updates/changes, promotions and events.
        </p>
        <h4 class="tnc-category">Confidentiality</h4>
        <p class="tnc-cat-description">
          Your personal information such as credit cards details, bank account numbers are well kept secret and confidential with us. 
          We will never share any of your personal details to any third party. Our sites do apply appropriate 
          security application in order to keep all the customers information safe at all time.
        </p>
        <h4 class="tnc-category">Authority</h4>
        <p class="tnc-cat-description">
          {{data_array[0].company_name}} have the rights to do any changes/updates Privacy Policy contents without 
          giving prior notice to the customers. Do keep track on the Privacy Policy page on our website.
        </p>
        <h4 class="tnc-category">Security</h4>
        <p class="tnc-cat-description">
          our company website do applies appropriate security application in order to prevent the leaking customers' 
          personal identification details from third parties, illegal disclosure and hackers. 
          However bear in mind that any information transmitted through Internet is NOT 100% guaranteed 
          safe and secure.
        </p> 
        <br>
        
        <div style="text-align:center; font-size: 14px; line-height: 20px;">
          <p style="font-weight:600">Please contact us at {{data_array[0].company_email}} or whatsapp to the number 
             {{data_array[0].company_phone}} if you have any questions or doubts.
          </p>
          <span style="font-weight:600">{{data_array[0].company_name}}</span>
          <br>
          <span style="font-weight:600">Registration No: {{data_array[0].registration_no}}</span>
          <br>
          <span style="font-weight:600">Email: {{data_array[0].company_email}}</span>
          <br>
          <span style="font-weight:600">Contact Number: {{data_array[0].company_phone}}</span>
        </div>
      </v-card-text>
    </div>
  </template>
  
  <script>
   export default {
       name:'tnc_dialog',
       props: {
        data_array: {
          type: Array,
       },
     },
  }
  
  </script>
  
  <style scoped>
  
  </style>