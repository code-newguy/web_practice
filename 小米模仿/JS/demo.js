$(document).ready(function() {
    var log = console.log.bind(log)

    var _main = function() {
        topChange()
        contentliCover()
        leftNavAction()
        lunboAction()
        contentMove()
        shipinAction()
        changePic()
    }
    //内容分支鼠标移上去 按钮出现
    var contentliCover =function() {
        $('.contentli').mouseenter(function() {
            $(this).find('.contentpre').show()
            $(this).find('.contentnext').show()
        })
        $('.contentli').mouseleave(function() {
            $(this).find('.contentpre').hide()
            $(this).find('.contentnext').hide()
        })
    }
    //内容监听 完成左移 右移 按照index 移动的效果
    var contentMove = function() {
        $('.contentindex li').click(function() {
            var currentIndex = $(this).parent().children('.currentlabel').data('moveindex')
            var endIndex = $(this).data('moveindex')
            moveByIndex(currentIndex, endIndex ,this )
        })
            var len = 4
            $('.contentnext').click(function(){
            var currentIndex =$(this).parent().find('.currentlabel').data('moveindex')
            var endIndex = (currentIndex + 1)%len
            moveByIndex(currentIndex, endIndex, this )
            })
            $('.contentpre').click(function(){
            var currentIndex =$(this).parent().find('.currentlabel').data('moveindex')
            var endIndex = (currentIndex - 1 + len )%len
            moveByIndex(currentIndex, endIndex,this )
            })
    }
    //内容的无缝轮播 同时实现index响应
    var moveByIndex = function(currentIndex, endIndex, conthis) {
        var indexdis = endIndex - currentIndex
        if(indexdis === -3){
            indexdis = 1
        }
        if(indexdis === 3){
            indexdis = -1
        }
        var dis = (-indexdis*303 - 303) + 'px'

        var container = $(conthis).parents('.contentli').find('.movedivContainer')
        log("container", container  )
        var movediv =container.find('.movediv')
        //开始把四张图按照 3 0 1 2 顺便放好 每次轮播时 先改变container的marginletf \
        //再把前面图片向后移动 或者尾部图片 向前移动 实现无缝轮播
        container.animate({marginLeft:dis},200, function () {
            if(indexdis < 0){
                for( var i =- 1; i >= indexdis; i--){
                     movediv.eq(i).prependTo(container)
                }
            }
            if(indexdis > 0 ){
                for( var i = 0 ; i < indexdis; i++){
                     movediv.eq(i).appendTo(container)
                }
            }
                 container.css('marginLeft','-303px')
               })

        var indexLabel = container.parents('.contentli').find('.contentindex li')
        log(indexLabel)
        indexLabel.eq(currentIndex).removeClass('currentlabel')
        indexLabel.eq(endIndex).addClass('currentlabel')
    }
    //顶部导航栏的响应
    var topChange = function() {
        $('.nav-top-center-li').mouseenter(function() {
            var index = $('.nav-top-center-li').index(this)
            $('.nav-top-current').removeClass('nav-top-current')
            $('.top-nav-show').eq(index).addClass('nav-top-current')
            log("enterIndex", index)
        })
        $('.nav-top-center').mouseleave(function() {
            $('.nav-top-current').removeClass('nav-top-current')
        })
        $('.top-nav-show').mouseleave(function() {
            $('.nav-top-current').removeClass('nav-top-current')
        })
    }

    var shipinAction = function() {

            $('.shipin-li').mouseenter(function() {
                $(this).children('.pointshow').animate({
                    top: -43,
                }, 200, function() {})
            })

            $('.shipin-li').mouseleave(function() {
                $(this).children('.pointshow').animate({
                    top: 37,
                    // box-shadow: 'none',
                }, 200, function() {})
            })

            $('.shipin-nav li').mouseenter(function() {
                var hideindex = $('.shipin-nav li').index($('.shipi-nav-current'))
                $('.shipi-nav-current').removeClass('shipi-nav-current')
                $(this).addClass('shipi-nav-current')
                var index = $('.shipin-nav li').index($(this))
                $($('.shipin-pic')[index]).show()
                $($('.shipin-pic')[hideindex]).hide()
            })
    }
    //star栏的切换
    var changePic = function() {
        var moveToLeft = function() {
            $('.star-pro-container').animate({
                'margin-left': "-=1295",
            }, 500)
        }
        var moveToRight = function() {
            $('.star-pro-container').animate({
                'margin-left': "+=1295",
            }, 500)
        }
        $(".nextbutton").click(function() {
            moveToLeft()
            $(this).css("pointer-events","none")
            $(".prebutton").css("pointer-events","auto")
        })
        $(".prebutton").click(function() {
            moveToRight()
            $(this).css("pointer-events","none")
            $(".nextbutton").css("pointer-events","auto")
        })
    }




    var leftNavAction = function() {
        // $('.top-nav-show')
        $(".leftnav-show").mouseenter(function() {
            $(this).show()
        })
        $(".leftnav-show").mouseleave(function() {

        })
         $('.left-nav-li').mouseenter(function() {
            $(this).css('background', '#F75000')
            $(this).find('.leftnav-show').show()
        })
         $('.left-nav-li').mouseleave(function() {
            $(this).css('background', '#3C3C3C')
            $(this).find('.leftnav-show').hide()
        })
         $('.show-des').mouseenter(function() {
            $(this).css('color', 'red')
        })
         $('.show-des').mouseleave(function() {
            $(this).css('color', 'black')
        })

    }
    var lunboAction = function() {
        var lunbolable = $('.lunbo-index')
        // log(lunbolable)
        lunbolable.mouseenter(function() {
            // var index = this.data('index')


            var index = $(this).data('index')

            moveToSelected(index)
        })

        var moveAutoAndStop = function() {
            var pointerpart = $('.lunboImg')
            var timer = null
            //定时器的设置
            var playTimer = function() {
                timer = setTimeout(function() {
                    moveToNext()
                    playTimer()
                }, 1000)
            }
            pointerpart.mouseenter(function() {
                log('enter')
                clearTimeout(timer)
            })
            pointerpart.mouseleave(function() {
                log("leave")
                timer = setTimeout(function() {
                    var index = $('.lunboImg-img-current').data('index')
                    index += 1
                    moveToSelected(index)
                    playTimer()
                }, 1000)
            })
            playTimer()
        }

        var moveToSelected = function(endIndex) {
            var images = $('.lunboImg img')
            var endIndex = (endIndex + images.length) % images.length
            var imagecurrent = $('.lunboImg-img-current')
            $('.lunboImg-img-current').attr('class', 'lunboImg-img')
            $(images[endIndex]).attr('class', 'lunboImg-img-current')
            var dots = $('.lunbo-index')
            $('.index-current').removeClass('index-current')
            $(dots[endIndex]).addClass('index-current')
        }

        var moveToNext = function() {
            var index = $('.lunboImg-img-current').data('index')
            var target = index + 1
            moveToSelected(target)
        }
        moveAutoAndStop()
    }
    _main()
})
