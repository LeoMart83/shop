import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: String!) {
    addToCart(variantId: $variantId)
    }
  `