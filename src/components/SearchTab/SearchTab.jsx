import { Tabs } from 'antd'
import './SearchTab.css'
const onChange = (key) => {
  console.log(key)
}
const SearchTab = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: 'Search',
        key: '1',
        // children: 'Content of Tab Pane 1',
      },
      {
        label: 'Rated',
        key: '2',
        // children: 'Content of Tab Pane 2',
      },
    ]}
  />
)
export default SearchTab
