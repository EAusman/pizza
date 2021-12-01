import axios from 'axios';

let toppingsMock = getToppings();
async function getToppings() {
  try {
    let response = await axios.get("/api/toppings");
    this.toppings = response.data;
    return true;
    } catch (error) {
        console.log(error);
  }
}
export default toppingsMock;
