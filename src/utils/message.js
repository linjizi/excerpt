// 封装Message组件，样式文字居中显示
import { Message } from 'element-ui';

function message(options) {
  Message({ ...options, center: true });
}

message.scccess = (message) => {
  Message.success({ message, center: true })
}
message.error = (message) => {
  Message.error({ message, center: true })
}

// 暴露
export default message;