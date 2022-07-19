import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { useEffect, useState } from "react";
import { getCurrentReward, getBestInitialVariant, findAppropriateVariant } from "../helpers/helpers.ts";
import OptionButton from '../components/OptionButton.tsx';
import { ADD_TO_CART } from '../mutation/mutation.ts';


export default function Home({ productData, rewards }) {

  const { variants, options } = productData;
  const [activeVariant, setActiveVariant] = useState(getBestInitialVariant(variants, rewards));
  const [currentReward, setCurrentReward] = useState(getCurrentReward(rewards, activeVariant?.id));
  const [option1, setOption1] = useState(activeVariant?.option1);
  const [option2, setOption2] = useState(activeVariant?.option2);

  useEffect(() => {
    setCurrentReward(getCurrentReward(rewards, activeVariant?.id));
  }, [activeVariant]);

  const [addToCart, { _, loading: mutationLoading }] = useMutation(ADD_TO_CART, {
    variables: {
      variantId: `${activeVariant.id}`,
    }
  });

  return (
    <div className="container mx-auto px-4 max-w-screen-md">

      <div className="mb-4 bg-orange-50 rounded-b-3xl p-4 flex justify-between">
        <span className="text-xl font-bold" > {productData.title} </span>
        {
          +activeVariant?.price ?
            <div>
              <span className="text-2xl text-orange-500 font-bold" > ${activeVariant?.price} </span>
              {currentReward && <div className="text-base font-bold" > You get: <span className="text-amber-500" > ${currentReward.toFixed(2)} </span></div >}
            </div> : <span className="font-bold text-2xl">Variant Unavailable</span >}
      </div>

      <div className="mx-auto w-3/4">
          <img className="mx-auto w-1/2 max-h-96 " src={productData.image.src} />

        <div className="mx-auto text-3xl" >
          <div className="py-3"> Size: </div>
          <div className="grid grid-cols-3 gap-5" >
            {
              options[0].values.map(option => <OptionButton
                key={option}
                onClick={() => {
                  setActiveVariant(findAppropriateVariant(variants, [option, option2]));
                  setOption1(option);
                }
                }
                activeOption={option1}
                option={option} />)}
          </div>
        </div>
        <div className="mx-auto text-3xl" >
          <div className="py-3"> Flavour: </div>
          <div className="grid grid-cols-3 gap-5" >
            {
              options[1].values.map(option => <OptionButton
                key={option}
                onClick={() => {
                  setActiveVariant(findAppropriateVariant(variants, [option1, option]));
                  setOption2(option);
                }}
                activeOption={option2}
                option={option} />)}
          </div>
        </div>
        <div className="w-full py-8" >
          <button
            className="disabled:opacity-75 w-full h-20 bg-orange-500 text-white rounded-3xl text-2xl"
            disabled={!activeVariant.title || mutationLoading}
            onClick={addToCart} >
            Add To My Store
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://dev-creator-backoffice-api.shopcat.click/graphql',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      query {
        productById(productId: 53) {
          id
          name
          data
          variantRewards
        }
      }
      `,
  });

  return {
    props: {
      productData: JSON.parse(data.productById.data),
      rewards: JSON.parse(data.productById.variantRewards),
    }
  }
}
