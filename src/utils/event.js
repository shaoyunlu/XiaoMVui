// 检测元素高度变化
export function resizeOB(el ,cbf){
    if (window.ResizeObserver){
        const observer = new ResizeObserver(()=>{
            cbf()
        })
    
        observer.observe(el) // 观测DOM元素
    }else{
        const observer = new MutationObserver((mutations) => {
            cbf()
        });

        observer.observe(el, {
            attributes: true,  // 监测元素属性变化
            childList: true,  // 监测子元素变化
            subtree: true  // 监测所有后代节点的变化
        });
    }
    
}