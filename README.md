# XiaoMVui

## XMV-Srollbar
- 高版本浏览器使用ResizeObserver监测元素高度变化
- 低版本浏览器使用MutationObserver监测元素高度变化
- Firefox低版本浏览器无法隐藏默认滚动条，需要使用margin-right:-17px,margin-botton:-17px的hack。
- 问题：要滚动的元素如果有margin-top,则会出现BUG
- "Invalid regular expression flag 's'"  Firefox78才支持s结束符