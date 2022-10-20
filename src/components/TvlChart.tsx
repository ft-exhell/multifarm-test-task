import { LineChart, Line } from "recharts"

const data = [
    { year: '2020', react: 1, angular: 3, vue: 5},
    { year: '2021', react: 2, angular: 2, vue: 4},
    { year: '2022', react: 3, angular: 3, vue: 3},
    { year: '2023', react: 4, angular: 2, vue: 2}
]

const TvlChart = () => {
    return (
        <LineChart
            width={400}
            height={400}
            data={data}
        >
            <Line 
                type='monotone'
                dataKey='react'
                stroke='#8884d8'
            />
        </LineChart>
    )
}

export default TvlChart