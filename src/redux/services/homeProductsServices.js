import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeProducts = createApi({
  reducerPath: "homeProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: builder => {
    return {
      catProducts: builder.query({
        query: params => {
          return {
            url: `cat-products/${params.name}/${params.page}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useCatProductsQuery } = homeProducts;
export default homeProducts;
