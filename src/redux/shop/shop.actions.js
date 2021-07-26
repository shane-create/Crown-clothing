import ShopActionTypes from "./shope.types";

export const updateCollections = collectionMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
})