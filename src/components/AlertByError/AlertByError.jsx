import { Alert, Space } from 'antd'
import './AlertByError.css'

const AlertByError = ({ error }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message={error} description="This is an error message about content of this page." type="error" showIcon />
  </Space>
)

export default AlertByError
