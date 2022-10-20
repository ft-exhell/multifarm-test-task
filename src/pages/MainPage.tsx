import TvlChart from '../components/TvlChart'

const MainPage = () => {
    return (
        <>
            <TvlChart 
                url='https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_asset_details/ETH_Convex_steth'
            />
        </>
    )
}

export default MainPage;