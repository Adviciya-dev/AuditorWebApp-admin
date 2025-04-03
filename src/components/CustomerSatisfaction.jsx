import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import vector2 from "../assets/Vector (2).png"
import vector3 from "../assets/Vector (3).png"
import groupImage from "../assets/svg/Mask group.svg"
const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 600 },
  { month: 'Mar', value: 550 },
  { month: 'Apr', value: 500 },
  { month: 'May', value: 450 },
  { month: 'Jun', value: 500 },
  { month: 'Jul', value: 600 },
  { month: 'Aug', value: 650 },
  { month: 'Sep', value: 600 },
  { month: 'Oct', value: 550 },
  { month: 'Nov', value: 600 },
  { month: 'Dec', value: 650 }
];

export function CustomerSatisfaction() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border mt-4">
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold flex">
            <img src={groupImage} alt="" className='mr-2'/>
            Reports
          </span>
        </div>
        <p className="text-sm text-gray-500 border rounded-lg p-2">1 Jan 2023 - 11 Feb 2024</p>

      </div>
      <hr className='my-4'/>

      <div className="flex items-start space-x-8">
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600">Customer Satisfaction</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  domain={[0, 1200]}
                  ticks={[0, 200, 400, 600, 800, 1000, 1200]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-52 space-y-4 border rounded-lg h-[300px] mt-8 flex flex-col justify-center ">
          <div className="p-4 flex justify-center ">
            <div className='mr-2 border p-2 rounded-full w-12 h-12 flex items-center justify-center'>
              <img src={vector2} alt="" />
            </div>
            <div>
              <div className="subheading-2x-small text-[text-soft-400] mb-1">SATISFACTION SCORE</div>
              <div className="flex items-baseline space-x-2">
                <span className="label-medium">7</span>
                <span className="subheading-2x-small text-[#176448] bg-[#CBF5E5] rounded-lg p-[4px]">+3.5%</span>
              </div>
            </div>

          </div>
          <div className="p-4 flex justify-center">
            <div className='mr-2 border p-2 rounded-full w-12 h-12 flex items-center justify-center'>
              <img src={vector2} alt="" />
            </div>
            <div>
              <div className="subheading-2x-small text-[text-soft-400] mb-1">SUBMITTED SURVEYS</div>
              <div className="flex items-baseline space-x-2">
                <span className="label-medium">50%</span>
                <span className="subheading-2x-small text-[#710E21] bg-[#F8C9D2] rounded-lg p-[4px]">-5.00%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}