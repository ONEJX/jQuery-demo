window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") {
            // 创建 div
            elements = [createElement(selectorOrArrayOrTemplate)];
        } else {
            // 查找 div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArrayOrTemplate instanceof Object) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
      }

    const api = Object.create(jQuery.prototype)
    api.elements = elements

    return api
    }
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        //查寻元素
        find(selector) {
            let arr = []
            for (let i = 0; i < this.elements.length; i++) {
                const newElements = Array.from(this.elements[i].querySelectorAll(selector))
                arr = arr.concat(newElements)
            }
            return $(arr)
        },
        //遍历元素
        each(fn) {
            for (let i = 0; i < this.elements.length; i++) {
                fn.call(null, this.elements[i], i)
            }
            return this
        },
        //查寻父元素
        parent() {
            const arr = []
            this.each((node) => {
                if (arr.indexOf(node.parentNode) === -1) {
                    arr.push(node.parentNode)
                }
            })
            return $(arr)
        },
        //查寻子元素
        children() {
            const arr = []
            this.each((node) => {
                arr.push(...node.children)
            })
            return $(arr)
        },
        //查寻除自身以外的所有兄弟节点
        siblings() {
            return $(this.parent().children().print().filter(n => n !== this.elements[0]))
        },
        //查寻自己排行老几
        index() {
            const arr = this.parent().children().print()
            let i;
            for (i = 0; i < arr.length; i++) {
                if (this.elements[0] === arr[i]) {
                    break
                }
            }
            return i
        },
        //查寻弟弟
        next() {
            let x = this.elements[0].nextSibling
            while (x && x.nodeType === 3) {
                x = x.nextSibling
            }
            return $(x)
        },
        //查寻哥哥
        prev() {
            let x = this.elements[0].previousSibling
            while (x && x.nodeType === 3) {
                x = x.previousSibling
            }
            return $(x)
        },
        //添加className
        addClass(className) {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].classList.add(className)
            }
            return this
        },
        print() {
            console.log(this.elements)
        }
    }
