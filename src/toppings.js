import axios from 'axios';

async function getToppings(obj) {
  try {
    axios.get("/api/toppings").then((res) => {
		obj.toppings = res.data.toppings;
    });
    } catch (error) {
        console.log(error);
  }
}
export default getToppings;
