# antd使用注意点

## from

如何使表单受控？-- `getFieldDecorator` --- 用于和表单进行双向绑定，详见下方描述

父级如何控制子级? -- `wrappedComponentRef`

联动关系如何设置？ -- `setFieldsValue` --- 设置一组输入控件的值（注意：不要在 componentWillReceiveProps 内使用，否则会导致死循环)

滚动到指定的错误位置 -- `validateFieldsAndScroll` --- 如果错误不在可视区域

表单里的默认数据 -- `initialValue` --- 通过options里面的initialValue去设置

把父组件的属性映射到表单项上 -- `mapPropsToFields` --- 方便父组件控制

父级元素给自己传入表单的值的时候

```js
@Form.create({
  mapPropsToFields(props) {
    // 使用上层组件的scope的值作为表单的数据
    const { scope } = props;

    return {
      nickname: Form.createFormField({
        value: scope.nickname,
      }),
      phone: Form.createFormField({
        value: scope.phone,
      }),
      address: Form.createFormField({
        value: scope.address,
      }),
      agreement: Form.createFormField({
        value: scope.agreement,
      }),
    };
  },
  name: 'base_form'
})
```

诸如有些默认值设置不上的时候，其实是在初始化的时候还没有对应的值，而是通过接口拿到之后给set的这个时候对于tab，tree给默认值的时候可能不会生效，修改方式，在请求的时候不去加载dom而是使用spin去添加loading解决初始化没值的问题

## antd-mobile

这个组件库可以说是相当的不好用，所以我使用react的开发，有90%是没有使用这个开发的，样式基本需要再二次开发，需要的功能也比较少
