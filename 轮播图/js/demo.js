window.onload = function(){
    var log = console.log.bind(log)
    var _main = function() {

        preListener()
        NextListener()
        indexListener()
        moveAutoAndStop()
    }
    //自动轮播 并且 当 鼠标移上去时停止 移开时恢复自动轮播
    var moveAutoAndStop = function() {
        var pointerpart = document.querySelector('.container')
        var timer = null
        var playTimer = function() {
        timer = setTimeout(function() {
                    var index = getIndexOfImg()
                    index += 1
                    moveToSelected(index)
                    playTimer()
                } , 1000)
        }
        // 鼠标移上去时停止
        pointerpart.addEventListener('mouseover' , function() {
            log('点击了')
            clearTimeout(timer)
        })
    // 移开时恢复自动轮播
        pointerpart.addEventListener('mouseout' , function() {
                timer = setTimeout(function() {
                    var index = getIndexOfImg()
                    index += 1
                    moveToSelected(index)
                    playTimer()
                } , 1000)
        })
        playTimer()
    }
    //得到图片的index
    var getIndexOfImg = function() {
        var images = document.querySelectorAll('.container img')
        var imagecurrent = document.querySelector('.pic-current')
        var index = Number(imagecurrent.dataset.nums)
        return index
    }
    //根据选中的位置 轮播到指定位置
    var moveToSelected = function(endIndex) {

        var images = document.querySelectorAll('.container img')
        var endIndex = (endIndex + images.length) % images.length
        var imagecurrent = document.querySelector('.pic-current')
        var index = Number(imagecurrent.dataset.nums)
        // log("index", index)
        images[index].className = 'pic'
        images[endIndex].className = 'pic-current'

        document.querySelector('li.li-current').className = ''
        document.querySelectorAll('.indexlabel li')[endIndex].className = 'li-current'
    }
    //图片向前移动
    var preListener = function() {
        var precontroller = document.querySelector('.pre')
        precontroller.addEventListener('click', function() {
            var index = getIndexOfImg() - 1

            moveToSelected(index)
        })
    }
    //向后移动
    var NextListener = function(){
        var nextController = document.querySelector('.next')
        nextController.addEventListener('click', function() {
            var index = getIndexOfImg() + 1
            moveToSelected(index)
        })
    }
    //根据鼠标移到的位置 图片轮播到对应index
    var indexListener = function() {
        var labels = document.querySelectorAll('.indexlabel li')
        for (var i = 0; i < labels.length; i++) {
            labels[i].index = i
            labels[i].addEventListener('mouseover', function() {
                moveToSelected(this.index)
            })
        }
    }
        _main()

        // var moveToNext = function() {
        //     var images = document.querySelectorAll('.container img')
        //     var imagecurrent = document.querySelector('.pic-current')
        //     var index = Number(imagecurrent.dataset.nums)
        //     images[index].className = 'pic'
        //     var index1 = (index + 1) % images.length
        //     log("index1", index1)
        //     images[index1].className = 'pic-current'
        // }
        // var moveToPre = function() {
        //     var images = document.querySelectorAll('.container img')
        //     var imagecurrent = document.querySelector('.pic-current')
        //     var index = Number(imagecurrent.dataset.nums)
        //     log("index", index)
        //     images[index].className = 'pic'
        //     log("length", images.length)
        //     var index1 = (index - 1 + images.length) % images.length
        //     log("index1", index1)
        //     images[index1].className = 'pic-current'
        // }

}
