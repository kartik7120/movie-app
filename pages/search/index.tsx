import SearchLayout from "../../components/SearchLayout"
import type { NextPageWithLayout } from '../_app'

const Search: NextPageWithLayout = () => {
    return <h1>I will perform the searching</h1>
}

Search.getLayout = function getLayout(page: React.ReactElement) {
    return <SearchLayout>{page}</SearchLayout>
}

export default Search;