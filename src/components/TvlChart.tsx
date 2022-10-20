import { useState, useEffect } from "react";
import moment from "moment";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import useFetchTvl from "../hooks/useApi"
import { TvlChartProps, ApiStatus } from "../interfaces";

import './TvlChartStyles.css'

const TvlChart = ({ url }: TvlChartProps) => {
    const [sortedTvls, setSortedTvls] = useState<{}[]>()
    const data = useFetchTvl(url)

    const xTickFormatter = (xtick: string) => moment(xtick).format('DD.MM')
    const yTickFormatter = (ytick: number) => {
        if (ytick >= 1000000000) {
            return (ytick/1000000000).toFixed(2) + 'B'
        } else if (ytick >= 1000000 && ytick < 1000000000){
            return (ytick/1000000).toFixed(2) + 'M'
        } else if (ytick > 999 && ytick < 1000000){
            return (ytick/1000).toFixed(2) + 'K'
        } else {
            return ytick.toString()
        }
    }

    useEffect(() => {
        if (data.status === ApiStatus.Success) {
            data.data.tvlStakedHistory.sort((a: { date: string, tvl: number }, b: { date: string, tvl: number }) => {
                return a.date.localeCompare(b.date)
            })
            console.log(data.data.tvlStakedHistory)
            setSortedTvls(data.data.tvlStakedHistory)
        }
    }, [data])

    return (
        <>
            {data.status === ApiStatus.Loading && <h2 style={{color: 'white'}}>Loading</h2>}
            {data.status === ApiStatus.Success && (
                <div className="chart-area">
                    <h2>
                        {`${data.data.farm}`}
                        <span 
                            style={{
                                color: 'white',
                                fontWeight: 'lighter'
                            }}
                        >
                            {`: ${data.data.asset}`}
                        </span>
                    </h2>
                    <div className='tvl-chart'>
                        <h3>Asset TVL</h3>
                        <AreaChart
                            width={700} height={300}
                            data={sortedTvls}
                            margin={{ right:20 }}
                        >
                            <defs>
                                <linearGradient id="colorTvl" x1="1" y1="1" x2="1" y2="0">
                                    <stop offset="5%" stopColor="#395d88" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#9945c1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                stroke="#ccc" 
                                strokeOpacity={0.2}
                            />
                            <XAxis 
                                dataKey='date' 
                                interval={0} 
                                tick={{ fill: '#8E95CA', fontSize: 10 }} 
                                tickFormatter={xtick => xTickFormatter(xtick)}
                                tickLine={false}
                            />
                            <YAxis 
                                type="number" 
                                domain={[(dataMin: number) => (dataMin * 0.992), (dataMax: number) => (dataMax * 1.02)]}
                                tick={{ fill: '#8E95CA', fontSize: 10 }}
                                tickFormatter={ytick => yTickFormatter(ytick)}
                                tickLine={false}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#9945c1" 
                                strokeWidth={2} 
                                fillOpacity={1} 
                                fill="url(#colorTvl)" 
                            />
                        </AreaChart>
                    </div>
                </div>
            )}
            {data.status === ApiStatus.Error && <h2>{data.error}</h2>}
        </>
    )
}

export default TvlChart