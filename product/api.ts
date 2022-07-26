import { Product } from "./Types";
import axios from "axios";
import Papa from "papaparse";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vRNvbnqKVU3KVriz1lzP6lgLxYKSlnvQWJxNtgWa9qIh_yAS7rOhsgk6E_n5MUNjzHBFY_u1wn03rOv/pub?output=csv`,
        { responseType: "blob" }
      )
      .then((response) => {
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const products = results.data as Product[]
              return resolve(products.map(product => ({
                ...product,
                price: Number(product.price),
              })))
            },
            error: (error) => reject(error.message),
          });
        });
      });
  },
};
