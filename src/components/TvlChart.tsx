import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import useFetchTvl from "../hooks/useApi"
import { TvlChartProps, ApiStatus } from "../interfaces";

const TvlChart = ({ url }: TvlChartProps) => {
    const data = useFetchTvl(url)
    
    return (
        <>
            {data.status === ApiStatus.Loading && <h2>Loading</h2>}
            {data.status === ApiStatus.Success && (
                <div>
                    <h2>{`${data.data.farm}: ${data.data.asset}`}</h2>
                    <LineChart
                        width={400}
                        height={400}
                        data={data.data.tvlStakedHistory}
                    >
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8884d8" 
                        />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey='date' />
                        <YAxis />
                    </LineChart>
                </div>
            )}
            {data.status === ApiStatus.Error && <h2>{data.error}</h2>}
        </>
    )
}

export default TvlChart