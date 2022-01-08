window.$ = function(selectorOrArray){
    let elements;
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
   return {
    //查寻元素
    find(selector){
        let arr = []
        for(let i =0;i<elements.length;i++){
            const newElements = Array.from(elements[i].querySelectorAll(selector))
            arr = arr.concat(newElements)
        }
        return $(arr)
    },
    //遍历元素
    each(fn){
        for(let i =0;i<elements.length;i++){
            fn.call(null, elements[i],i)
        }
        return this
    },
    //查寻父元素
    parent(){
        const arr = []
        this.each((node) => {
            if(arr.indexOf(node.parentNode) === -1){
                arr.push(node.parentNode)
            }
        })
        return $(arr)
    },
    //查寻子元素
    children(){
        const arr = []
        this.each((node) => {
            arr.push(...node.children)
        })
        return $(arr)
    },
    //查寻除自身以外的所有兄弟节点
    siblings(){
        return $(this.parent().children().print().filter(n => n !== elements[0]))
    },
    //查寻自己排行老几
    index(){
        const arr = this.parent().children().print()
        let i;
        for(i = 0;i<arr.length;i++){
            if(elements[0] === arr[i]){
                break
            }
        }
        return i
    },
    //查寻弟弟
    next(){
        const index = this.index()
        const arr = this.parent().children().print()
        const newArr = [arr[index+1]]
        return $(newArr)
    },
    //查寻哥哥
    prev(){
        const index = this.index()
        const arr = this.parent().children().print()
        const newArr = [arr[index-1]]
        return $(newArr)
    },
    //添加className
    addClass(className){
        for(let i =0;i<elements.length;i++){
            elements[i].classList.add(className)
        }
        return this
    },
    print(){
        return elements
    }
   } 
}