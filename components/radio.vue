<template>
  <!-- <v-radio color="primary" v-model="inner_radio" @change="reset">
    <template v-slot:label>
      <span class="radio-text" style="font-size: 12px !important">
        {{ n }}
      </span>
      <v-spacer></v-spacer>
      <span class="product-topping-price" style="font-size: 12px !important">
        +RM&nbsp;{{ p }}
      </span>
    </template>
  </v-radio> -->
  <div>
    <template v-for="(vari, index) in vari_array">
      <v-checkbox :key="index" v-model="vari.quantity" @change="test(index)">
        <template v-slot:label>
          <span class="radio-text" style="font-size: 13px !important; font-weight:500;">
            {{ vari.name }}
          </span>
          <v-spacer></v-spacer>

          <span
            class="product-topping-price"
            style="font-size: 13px !important; font-weight:400;">

            +RM&nbsp;{{ parseFloat(vari.price).toFixed(2) }}
          </span>
        </template>
      </v-checkbox>
    </template>
  </div>
</template>
<script>
export default {
  name: "checkbox-group",
   props: {
 
  	array: {
      type: Array,
  	},
    multiple: {
      type: Boolean,
  	},
    optional: {
      type: Boolean,
  	},
   },
  data: function () {
    return {
     vari_array:this.array,
     multi:this.multiple,
     option:this.optional,
    };
  },
  created(){
    for(var i=0;i<this.vari_array.length;i++){
        this.$set(this.vari_array[i], "quantity", 0);
      }
      if(this.option==false){
        this.vari_array[0].quantity=1;
      }
  },
  computed: {
  
  },
  methods: {
    test(index) {

        if(this.multi==false){
            for(var i=0;i<this.vari_array.length;i++){
                this.vari_array[i].quantity=0;
            }
            this.vari_array[index].quantity=1; 
        }else{
           
          if(this.vari_array[index].quantity==true){
              this.vari_array[index].quantity=1;
          }else{
            this.vari_array[index].quantity=0;
          }
        }


    },
  },
};
</script>
<style>
.v-input--selection-controls {
    margin-top: 0px!important;
    padding-top: 0px!important;
}
</style>