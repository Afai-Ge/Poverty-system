import NProgress from "nprogress"
import 'nprogress/nprogress.css'

// 全局进度条配置
NProgress.configure({
    easing: 'ease',
    speed: 1000,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
})

export const start = () =>{
    NProgress.start()
}

export const close = () =>{
    NProgress.done()
}