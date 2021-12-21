import { createSelector } from "reselect";
import { memoize } from "lodash";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) => createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
)); 

export const selectCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)