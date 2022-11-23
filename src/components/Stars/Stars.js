import { Rate } from 'antd'
import './Stars.css'
const Stars = ({ rate }) => <Rate disabled defaultValue={3} count={10} value={rate} />
export default Stars
