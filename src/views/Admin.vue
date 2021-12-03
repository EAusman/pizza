
<template>
 <div class = "admin">
 <h1>The Admin Page!</h1>
    <div class="heading">
      <h2>Add a Topping</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <input v-model="price" placeholder="Price">
	<input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addTopping">
        <h2>{{addTopping.name}}</h2>
        <p>Price: {{addTopping.price}}</p>
	<img :src="addTopping.path" />
      </div>
    </div>
    <div class="heading">
      <h2>Edit/Delete an Topping</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectTopping(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findTopping">
        <input v-model="editName">
	<input v-model="editPrice">
        <p></p>
        <img :src="findTopping.path" />
      </div>
      <div class="actions" v-if="findTopping">
        <button @click="deleteTopping(findTopping)">Delete</button>
        <button @click="editTopping(findTopping)">Edit</button>
      </div>
    </div>
    </div>
    </template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data () {
    return {
      name: "",
      price: "",
      file: null,
      editName: "",
      editPrice: 0,
      addTopping: null,
      toppings: [],
    findTitle: "",
    //findTopping: null,
    }
  },
  computed: {
    suggestions() {
      let toppings = this.$root.$data.toppings.filter(topping => topping.name.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return toppings.sort((a, b) => a.name > b.name);
    },
    findTopping() {
	return this.findToppingByName(this.findTitle);
  },

  },
  created() {
    this.getToppings();
  },
  methods: {
    findToppingByName(strName){
	for(let topping of this.$root.$data.toppings) {
		if(topping.name === strName) {
		//	this.findTopping = topping;
			this.editName = topping.name;
			this.editPrice = topping.price;
			return topping;
		}
	}
	return null;
    },
    async editTopping(topping) {
      try {
        await axios.put("/api/toppings/" + topping._id, {
          name: this.editName,//this.findTopping.name,
          price: this.editPrice,//this.findTopping.price,
        });
        //this.findTopping = null;
        this.getToppings();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
async getToppings() {
  try {
    let response = await axios.get("/api/toppings");
    this.toppings = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
    selectTopping() {
      this.findName = "";
      //this.findTopping = topping;
    },
    fileChanged(event){
      this.file = event.target.files[0]
    },
    async deleteTopping(topping) {
      try {
        await axios.delete("/api/toppings/" + topping._id);
        //this.findTopping = null;
        this.getToppings();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
	console.log(this);
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/toppings', {
          name: this.name,
          path: r1.data.path,
          price: this.price,
        });
        this.addTopping = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
