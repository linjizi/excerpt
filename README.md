##关于Upload组件
Upload组件file.raw存放了图片信息
##关于Dialog组件
open和close是事件
##关于Popover组件
~~~
<el-popover
  placement="top"
  title="文案"
  width="400"
  trigger="hover"
  :content="scope.row.copywriting"
>
  <div slot="reference" class="copywritingColumn">
    {{ scope.row.copywriting }}
  </div>
</el-popover>
~~~
##表格文本换行
~~~
.cell {
  white-space: pre-line;
}
// white-space的值：
// normal 默认。空白会被浏览器忽略。
// pre 空白会被浏览器保留。其行为方式类似 HTML 中的 pre 标签。
// nowrap 文本不会换行，文本会在在同一行上继续，直到遇到 br 标签为止。
// pre-wrap 保留空白符序列，但是正常地进行换行。
// pre-line 合并空白符序列，但是保留换行符。
// inherit 规定应该从父元素继承 white-space 属性的值。
~~~
##关于Form组件
书写rules校验规则时form-item必须书写prop属性
##问题描述：
在Modal内使用Form组件管理状态时，关闭Modal并不会清除表单的数据，即使配置了destroyOnClose属性也不生效。
原因：
简而言之，Modal的destroyOnClose属性只有在状态完全是在Modal内管理的情况下才会生效
解决方案：
方案一：
在响应事件中添加form.resetFields()，借助Form组件的API清空状态
##封装Message
##组件绑定原生事件时需要加.native修饰符