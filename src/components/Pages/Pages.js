import { Pagination } from 'antd'
import './Pages.css'
const Pages = ({ togglePage }) => <Pagination onChange={(page) => togglePage(page)} defaultCurrent={1} total={50} />
export default Pages
