# XiaoMVui

## XMV-Srollbar
- 高版本浏览器使用ResizeObserver监测元素高度变化
- 低版本浏览器使用MutationObserver监测元素高度变化
- Firefox低版本浏览器无法隐藏默认滚动条(scrollbar-width 属性，需要在64及以上版本支持)，需要使用margin-right:-17px,margin-botton:-17px的hack。
- 问题：要滚动的元素如果有margin-top,则会出现BUG
- "Invalid regular expression flag 's'"  Firefox78才支持s结束符,替换成 new RegExp("\\/\\*[\\s\\S]*?\\*\\/", "gm")

## popover
- 高版本的Firefox,对display操作比较敏感，即使一个执行周期内，如果执行了display:none 再执行display:'',div也会分别渲染两次结果，不会只渲染最后一次的