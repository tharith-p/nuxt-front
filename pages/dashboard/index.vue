<template>
  <div class="bg-main">
    <div class="h-screen overflow-hidden flex flex-col">
      <header class=" h-14 bg-main-400 sticky top-0">this is header</header>
      <div class=" flex-1 flex overflow-y-hidden">

        <div class="h-full flex flex-col overflow-y-auto" style="width: 400px">
          <div class="sticky top-0 bg-main-400 bg-opacity-70 flex justify-between px-1 py-2">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <input type="search" name="" id=""
              class=" bg-transparent py-1.5 px-4 border-2 border-gray-600 rounded text-white" placeholder="Search...">
          </div>
          <div class="flex-1">
            <!-- Product list -->
            <div tabindex="0" @keypress="keypress" @click="setProActive(pro.id)" v-for="pro in products" :key="pro.id"
              class="group py-1 px-5 flex items-center cursor-pointer space-x-3 group"
              :class="{' bg-gray-400': activeProId == pro.id}">
              <img class=" transform hover:scale-110 transition-all w-10 rounded object-cover h-10" :src="pro.photo"
                alt="">
              <div class="flex-1 flex flex-col">
                <span class=" text-white">{{ pro.productname }}</span>
                <small class=" text-gray-300">{{ pro.description }}</small>
              </div>
              <Dropdown :id="pro.id" />
            </div>
            <!-- End product list -->
          </div>
          <div class="sticky bottom-0 bg-main-400 py-2 px-1">
            <div class="flex justify-between space-x-4">
              <input type="number" v-model="numToAdd"
                class=" bg-transparent py-1.5 px-4 border-2 border-gray-600 rounded flex-1 text-white">
              <button @click="addPro" class=" rounded px-10 bg-blue-dark shadow-sm text-white">Add</button>
            </div>
          </div>
        </div>

        <div class=" bg-gray-700 flex-1 h-full flex flex-col overflow-y-auto">
          <div class="flex-1">
            <table class="w-full">
              <thead class="text-left bg-gray-800 text-white sticky top-0">
                <th class="py-2.5 px-2">No</th>
                <th class="py-2.5 px-2">Item</th>
                <th class="py-2.5 px-2">Qty</th>
                <th class="py-2.5 px-2">Price</th>
                <th class="py-2.5 px-2">Totlal</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-for="(addedPro, index) in addedPros" :key="addedPro.id"
                  class="text-left text-white hover:bg-gray-600 bg-opacity-5">
                  <th class="py-1">{{ index + 1 }}</th>
                  <th class="py-1 flex flex-col">
                    <span class=" text-white">{{ addedPro.name }}</span>
                    <small class=" text-gray-300">{{ addedPro.desc }}</small>
                  </th>
                  <th class="py-1">{{ addedPro.count }}</th>
                  <th class="py-1">{{ addedPro.price.toFixed(2) }}</th>
                  <th class="py-1">{{ (addedPro.count * addedPro.price).toFixed(2) }}</th>
                  <th class="py-1"><button @click="removeSelected(addedPro.id)" class="hover:underline">Remove</button></th>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Check out -->
          <div class="sticky bottom-0 py-2 flex flex-col bg-main-400 text-white px-5">
            <div class="flex justify-between w-1/2 ml-auto mb-3">
              <span>Grand Total($)</span>
              <span>$ {{ subTotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between w-1/2 ml-auto mb-3">
              <span>Cash Receive($)</span>
              <div class=" relative">
                <input type="text" v-model="cashReceive"
                  class=" w-40 border rounded bg-transparent text-right py-4 pr-1 pl-5"
                  :class="{'border-red-500 text-red-500' : subTotal > cashReceive && cashReceive != 0}"
                  placeholder="Cash Receive">
                <span class=" absolute left-2 top-1/2 transform -translate-y-1/2"
                  :class="{'text-red-500': subTotal > cashReceive && cashReceive != 0}">$</span>
              </div>
            </div>
            <div class="flex justify-between w-1/2 ml-auto">
              <span>Charge($)</span>
              <span>$ {{ (cashReceive - subTotal).toFixed(2) }}</span>
            </div>
            <button @click="isShowModal = true" :disabled="!isCheckoutable" :class="{' bg-opacity-50': !isCheckoutable}"
              class=" transition-opacity ml-auto rounded px-8 bg-blue-dark shadow-sm text-white py-2 mt-3">Preview invoice</button>
          </div>
        </div>
      </div>
    </div>

    <div id="defaultModal" tabindex="-1" aria-hidden="true" v-if="isCheckingOut" class=" bg-black bg-opacity-60 overflow-hidden fixed z-50 w-full inset-0 flex justify-center items-center">
      <div class=" text-white flex space-x-2">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span>Processing...</span>
      </div>
    </div>
    <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" v-if="isShowModal"
      class=" bg-black bg-opacity-60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 w-full md:inset-0 md:h-full flex justify-center items-center">
      <div class="p-4 w-full max-w-2xl h-full flex flex-col">
        <!-- Modal content -->
        <div class="bg-white rounded-lg shadow dark:bg-gray-700" style="">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Items Preview
            </h3>
            <button type="button" @click="isShowModal = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6">
            <table class="w-full">
              <thead class="text-left bg-gray-800 text-white">
                <th class="py-2.5 px-2">No</th>
                <th class="py-2.5 px-2">Item</th>
                <th class="py-2.5 px-2">Qty</th>
                <th class="py-2.5 px-2">Price</th>
                <th class="py-2.5 px-2">Totlal</th>
              </thead>
              <tbody>
                <tr v-for="(addedPro, index) in addedPros" :key="addedPro.id"
                  class="text-left dark:text-white text-gray-600 bg-opacity-5">
                  <th class="py-1">{{ index + 1 }}</th>
                  <th class="py-1 flex flex-col">
                    <span class="">{{ addedPro.name }}</span>
                    <small class=" ">{{ addedPro.desc }}</small>
                  </th>
                  <th class="py-1">{{ addedPro.count }}</th>
                  <th class="py-1">{{ addedPro.price.toFixed(2) }}</th>
                  <th class="py-1">{{ (addedPro.count * addedPro.price).toFixed(2) }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex flex-col items-end text-gray-700 px-6 pb-6 dark:text-white">
            <div class="flex">
              <span>Grand Total($) :</span>
              <span class="w-20 text-right">{{ subTotal.toFixed(2) }}</span>
            </div>
            <div class="flex">
              <span>Tax(%) :</span>
              <span class="w-20 text-right">10%</span>
            </div>
            <div class="flex">
              <span>Cash Receive($) :</span>
              <span class="w-20 text-right">{{ parseFloat(cashReceive).toFixed(2) }}</span>
            </div>
            <div class="flex">
              <span>Charge($) :</span>
              <span class="w-20 text-right">{{ (cashReceive - subTotal).toFixed(2) }}</span>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button data-modal-toggle="defaultModal" type="button" @click="checkOut"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
              accept</button>
            <button data-modal-toggle="defaultModal" type="button" @click="isShowModal = false"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      isShowModal: false,
      activeProId : 0,
      activePro   : undefined,
      products: [],
      products1  : [
        {
          "id": 1,
          "productname": "coca1",
          "description": "soft drink",
          "price": 2.1,
          "tax": 0.1,
          "size": "330ml",
          "quantity": 25,
          "photo": "/nike.avif",
        },
        {
          "id": 2,
          "productname": "Nike Arm",
          "description": "Sport shoe",
          "price": 2.0,
          "tax": 0.1,
          "size": "330ml",
          "quantity": 25,
          "photo": "akram.jpeg",
        },
        {
          "id": 3,
          "productname": "coca3",
          "description": "soft drink",
          "price": 5.0,
          "tax": 0.1,
          "size": "330ml",
          "quantity": 25,
          "photo": "/nike.avif",
        },
        {
          "id": 4,
          "productname": "coca4",
          "description": "soft drink",
          "price": 10.5,
          "tax": 0.1,
          "size": "330ml",
          "quantity": 25,
          "photo": "poo.jpg",
        },
      ],
      cashReceive: 100,
      numToAdd: 1,
      addedPros: [],
      isCheckingOut: false

    }
  },
  computed: {
    subTotal(){
      let total = 0;
      this.addedPros.forEach(element => {
        total += element.price * element.count
      });
      return total;
    },
    isCheckoutable() {
      return this.addedPros.length &&  this.cashReceive >= this.subTotal
    }
  },
  methods: {
    setProActive(id) {

      if (this.activeProId != id) {
        // set active
        let found = this.products.find(pro => pro.id == id);
        if (found) {
          this.activeProId = id;
          this.activePro = found;
        }
      } else {
        // remove active 
        this.activeProId  = 0;
        this.activePro    = undefined;
      }
    },
    addPro() {

      if (this.activeProId == 0 || this.numToAdd < 1) return;

      let pro = this.products.find(pro => pro.id == this.activeProId);
      if (pro) {
        let found = this.addedPros.find(pro => pro.id == this.activeProId);
        if (found) {
          // just modify

          found.count += parseInt(this.numToAdd)
        } else {
          // add
          this.addedPros.push({
            id      : this.activeProId
            , name  : pro.productname
            , price : pro.price
            , count : parseInt(this.numToAdd)
            , desc  : pro.description
          })
        }
        this.numToAdd = 1;
        this.activeProId = 0;
        this.activePro = undefined;
      }
    },
    removeSelected(id) {
      for(let i=0; i<this.addedPros.length; i++) {
        if (this.addedPros[i].id == id) {
          if (this.addedPros[i].count > 1) {
            this.addedPros[i].count -= 1;
          } else {
            this.addedPros.splice(i, 1);
          }
          break;
        }
      } 
    },
    keypress(e) {
      if (['Enter', ' '].includes(e.key)) {
        this.addPro()
      }
      // this.$axios.put(
      //   'http://192.168.11.101:8081/product'
      //   , {
      //     id: 234
      //   }
      // );
    },
    checkOut() {
      this.isShowModal = false;
      this.isCheckingOut = true;
      let params = this.addedPros.map(pro => ({
        id    : pro
        , qty : pro.count
      }));
      setTimeout(() => {
        this.isCheckingOut  = false;
        alert('Check out successfully.')
        // clear
        this.isShowModal  = false;
        this.activeProId  = 0;
        this.activePro    = undefined;
        this.cashReceive  = 0;
        this.addedPros    = [];
      }, 500);
    }
  },
  async fetch() {
    // 
    // const products = await this.$axios.$get('http://51.79.251.248/:8081/product')
    // 
    const res = await this.$axios.$get('http://localhost:8081/product');
    if (res.success) {
      // modify response
      let imgs = [
        "/nike.avif",
        "akram.jpeg",
        "poo.jpg"
      ];
      let imgi = 0;
      this.products = res.data.map( d => {
        imgi += 1;
        if (imgi >= 3) {
          imgi = 0;
        }
        d.photo = imgs[imgi];
        return d
      });
    }
  },
  mounted() {
  },
  unmounted() {
  }
};
</script>

<style>
.link {
  position: relative;
}
.link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;

  border-radius: 5px;
  opacity: 0;
  bottom: 4px;
  transition: bottom ease-in-out 0.2s, opacity ease-in 0.2s,
    background-color ease-in 0.2s;
}

.link:hover:before {
  bottom: 0;
  opacity: 1;
  @apply bg-gray-400;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.group:hover .group-hover\:block {
  display: block;
}
</style>