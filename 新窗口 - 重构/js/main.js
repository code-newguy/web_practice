    var log = console.log.bind(log)
//辅助函数 鼠标移上 或者移开时 改变obj的class
    var mouseChange = function(obj, newClassName) {
        var oldClassName = obj.className
        obj.onmouseover = function functionName() {
            obj.className = newClassName
        }
        obj.onmouseout = function functionName() {
            obj.className = oldClassName
        }
    }
    //拖拽函数 同时控制边界
    var drag = function(handle, moveContainer) {
        handle.onmousedown = function() {

            var width = moveContainer.offsetWidth
            var height = moveContainer.offsetHeight
            //鼠标按下时 容器离左边和 上边的距离
            var leftDis = moveContainer.offsetLeft
            var topDis = moveContainer.offsetTop
            //内部的相对x位移 y位移
            var disX = event.clientX - leftDis
            var disY = event.clientY - topDis
            log('event.clientY', event.clientY, 'disY',disY)
            document.onmousemove = function() {

                var TotalWidth = document.documentElement.clientWidth
                var TotalHeight = document.documentElement.clientHeight
                //鼠标移动时 容器距离左边 上边的距离
                var resultLeft = event.clientX - disX
                var resultTop =  event.clientY - disY
                log('TotalHeight',TotalHeight,'topDis',topDis, 'height',height,'resultTop',resultTop ,' event.clientY', event.clientY )
                //限定移动的边界
                if(resultLeft <= 0 ) {
                    resultLeft = 0
                }
                if(resultLeft >= TotalWidth  - width) {
                    resultLeft = TotalWidth - width
                }
                if(resultTop <= 0 ) {
                    resultTop = 0
                }
                if( resultTop >= TotalHeight - height ) {
                    resultTop = TotalHeight - height
                }
                moveContainer.style.left = resultLeft + 'px'
                moveContainer.style.top = resultTop+ 'px'
            }
            document.onmouseup = function() {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
    //根据变化重新设置 大小
    var resize = function(handle, isLeft, isRight, isTop, isBottom) {
        var container = document.querySelector('.container')
        var minWidth = 300
        var minHeight = 160
        var TotalWidth = document.documentElement.clientWidth - 4
        var TotalHeight = document.documentElement.clientHeight - 4
        handle.onmousedown = function() {
            log("按下了")
            //按下时的xy左标
            var xCordinate = event.clientX
            var yCordinate = event.clientY
            //容器的长宽
            var width = container.offsetWidth
            var height = container.offsetHeight
            //容器的左边和上边间距
            var topDis = container.offsetTop
            var leftDis = container.offsetLeft
            document.onmousemove = function() {
                log("鼠标移动了")
                //xy位移
                var xmovement = event.clientX - xCordinate
                var ymovement = event.clientY - yCordinate
                //向左移动的情况 限定边界
                if (isLeft) {
                    if (xmovement <= -xCordinate) {
                        xmovement = -xCordinate
                    }
                    if (xmovement >= width - minWidth) {
                        xmovement = width - minWidth
                    }
                    //容器的左边距和宽度变化
                    container.style.width = width - xmovement + 'px'
                    container.style.left = leftDis + xmovement + 'px'
                }
                //向右移动的情况 限定边界
                if (isRight) {
                    if (xmovement >= TotalWidth - xCordinate) {
                        xmovement = TotalWidth - xCordinate
                    }
                    if (xmovement <= minWidth - width) {
                        xmovement = minWidth - width
                    }
                    //容器宽度变化
                    container.style.width = width + xmovement + 'px'
                }
                //向上移动的情况 限定边界
                if (isTop) {
                    if (ymovement <= -yCordinate) {
                        ymovement = -yCordinate
                    }
                    if (ymovement >= height - minHeight) {
                        ymovement = height - minHeight
                    }
                    //容器的上边距和高度变化
                    container.style.height = height - ymovement + 'px'
                    container.style.top = topDis + ymovement + 'px'
                }
                //向下移动的情况 限定边界
                if (isBottom) {
                    if (ymovement + yCordinate >= TotalHeight) {
                        ymovement = TotalHeight - yCordinate
                    }
                    if (ymovement <= minHeight - height) {
                        ymovement = minHeight - height
                    }
                    //容器的上高度变化
                    container.style.height = height + ymovement + 'px'
                }
            }
            document.onmouseup = function() {
                log("松开了")
                document.onmousemove = null
                document.onmouseup = null

            }
        }
    }
    //点击最大化之后变化
    var maxClick_mouseChange = function() {
        var TotalWidth = document.documentElement.clientWidth - 4
        var TotalHeight = document.documentElement.clientHeight - 4
        var container = document.querySelector('.container')
        var max = document.querySelectorAll('.labelController a')[1]
        var recover = document.querySelector('.recover')
        max.onclick = function() {
            log("点击了")
            container.style.width = TotalWidth + 'px'
            container.style.height = TotalHeight + 'px'
            container.style.top = 0
            container.style.left = 0
            max.style.display = 'none'
            recover.style.display = 'block'
        }
        mouseChange(max, 'max-change')
    }
    //点击恢复原来状态
    var recoverClick_mouseChange = function() {
        var recover = document.querySelector('.recover')
        var container = document.querySelector('.container')
        var max = document.querySelectorAll('.labelController a')[1]
        var minWidth = 300
        var minHeight = 160
        var recover = document.querySelector('.recover')
        recover.onclick = function() {
            container.style.width = minWidth + 'px'
            container.style.height = minHeight + 'px'
            recover.style.display = 'none'
            max.style.display = 'block'
            container.style.top = '100px'
            container.style.left = '100px'
        }
        mouseChange(recover, 'recover-change')
    }
    //点击关闭按钮
    var closeClick_mouseChange = function() {
        var container = document.querySelector('.container')
        var close = document.querySelectorAll('.labelController a')[4]
        var empty = document.querySelector('.empty')
        close.onclick = function() {
            container.style.display = 'none'
            document.body.appendChild(empty)
            empty.style.display = 'block'
        }
        mouseChange(close, 'close-change')

    }
    //点击最小化按钮
    var minClick_mouseChange = function() {
        var container = document.querySelector('.container')
        var min = document.querySelectorAll('.labelController a')[0]

        var empty = document.querySelector('.empty')
        min.onclick = function() {
            container.style.display = 'none'
            document.body.appendChild(empty)
            empty.style.display = 'block'
        }
        mouseChange(min, 'min-change')
    }
    //点击之后还原 empty 代表 点击最小化之后显示的按钮
    var emptyClick = function() {
        var container = document.querySelector('.container')
        var empty = document.querySelector('.empty')

        empty.onclick = function() {
            empty.style.display = 'none'
            container.style.display = "block"
        }
    }
    var _main = function() {

        var title = document.querySelector('.title')
        var container = document.querySelector('.container')


        // ***Click_mouseChange实现鼠标移到或者移开改变背景图标
        // 并且完成缩小放大的功能

        emptyClick()
        minClick_mouseChange()
        closeClick_mouseChange()
        maxClick_mouseChange()
        recoverClick_mouseChange()
        // 完成移动 并且控制 其位移不超过 浏览器
        drag(title, container)

        // 放大缩小的功能 四条边 和 四个角 控制
        var topController = document.querySelector('.TControlLabel')
        var bottomController = document.querySelector('.BControlLabel')
        var rightController = document.querySelector('.RControlLabel')
        var leftController = document.querySelector('.LControlLabel')
        var rtController = document.querySelector('.RTControlLabel')
        var rbController = document.querySelector('.RBControlLabel')
        var lbController = document.querySelector('.LBControlLabel')
        var ltController = document.querySelector('.LTControlLabel')
        resize(topController, false, false, true, false)
        resize(bottomController, false, false, false, true)
        resize(rightController, false, true, false, false)
        resize(leftController, true, false, false, false)
        resize(rtController, false, true, true, false)
        resize(rbController, false, true, false, true)
        resize(lbController, true, false, false, true)
        resize(ltController, true, false, true, false)
    }

    _main()
