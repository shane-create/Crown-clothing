import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollectionFetching} from "../../redux/shop/shop.selectors";
import WithSpinner from "../withSpinner/withSpinner.component";
import CollectionsOverview from "./collection-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionFetching
})

const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionsOverviewContainer;