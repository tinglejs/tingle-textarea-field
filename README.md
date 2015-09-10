# TextareaField 多行文本框 [![npm version](https://badge.fury.io/js/tingle-textarea-field.svg)](http://badge.fury.io/js/tingle-textarea-field)


这是一个 tingle 组件，表单多行文本框，包括标题和表单。

<img src="https://img.alicdn.com/tps/TB16O_3JpXXXXbeXpXXXXXXXXXX-750-1254.png" alt="" width="375"/>



## Simple Usage

```javascript
<TextareaField label="三个字" minRows={2} maxRows={5}
	placeholder="3个行高 最大5个行高" value={t.state.remark}
	onChange={t.handleChange.bind(t)}/>

<TextareaField label="只读" value="不能更改" readOnly={true}/>
```

## 可用配置

| 配置项 | 类型 | 默认值 | 功能/备注 |
|---|----|---|----|
|minRows|Interger|1|最小显示行|
|maxRows|Interger|10|最大行，超过则显示滚动条|
|placeholder|String|``|提醒文案，默认空|
|readOnly|Boolean|false|是否只读，只读时不能输入，默认false|
|lineHeight|Interger|24|行高|
|onChange|Function| function() {} | 输入内容变化时触发 |
|onFocus|Function| function() {} | 获取到输入焦点时触发 |
|onBlur|Function| function() {} | 与pc端一致，鼠标离开时响应 |

## 事件

### onChange(newValue, e)

```javascript
// 新值和事件对象
handleChange(newValue,e) {

}

```

### onFocus(e)

### onBlur(e)



## Links 相关链接

- [Fire a bug/Issues 提 Bug](https://github.com/tinglejs/tingle-textarea-field/issues)
