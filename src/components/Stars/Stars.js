import { Rate } from 'antd'
import './Stars.css'
const Stars = ({ rate, movieID, evaluate }) => (
  <Rate defaultValue={0} count={10} value={rate} allowHalf={true} onChange={(stars) => evaluate(stars, movieID)} />
)
export default Stars
