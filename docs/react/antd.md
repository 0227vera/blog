# antd使用注意点

## from

如何使表单受控？-- `getFieldDecorator` --- 用于和表单进行双向绑定，详见下方描述

父级如何控制子级? -- `wrappedComponentRef`

联动关系如何设置？ -- `setFieldsValue` --- 设置一组输入控件的值（注意：不要在 componentWillReceiveProps 内使用，否则会导致死循环)

滚动到指定的错误位置 -- `validateFieldsAndScroll` --- 如果错误不在可视区域

表单里的默认数据 -- `initialValue` --- 通过options里面的initialValue去设置

把父组件的属性映射到表单项上 -- `mapPropsToFields` --- 方便父组件控制
