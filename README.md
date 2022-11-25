# WPS & LibreOffice 临时字体 pacman 钩子生成器
🪝 生成允许 WPS 和 LibreOffice 临时使用隐藏字体的 pacman 钩子。

### 使用例

在 `/usr/share/fonts/ms` 下放置 `.SimSun.ttc`，由于它是隐藏文件，所以其它程序都不会使用宋体，而在 WPS 或 LibreOffice 启动时，它将会被复制到临时目录 (由 bubblewrap 挂载的 tmpfs) 中，并取消隐藏，所以文档中的宋体可以正常显示。
