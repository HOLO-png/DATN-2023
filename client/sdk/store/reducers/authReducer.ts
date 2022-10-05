import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from "..";

interface IAuth {
  scope: string
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  role: string
}

const initialState: IAuth = {
  scope: '',
  access_token: '',
  refresh_token: '',
  token_type: '',
  expires_in: 0,
  role: ''
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<IAuth, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;
