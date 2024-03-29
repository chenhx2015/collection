// 实现一个 Dialog 类，Dialog可以创建 dialog 对话框，对话框支持可拖拽

class Dialog {
  constructor(text) {
    this.lastX = 0
    this.lastY = 0
    this.x
    this.y
    this.text = text || ''
    this.isMoving = false
    this.dialog
  }
  open() {
    const model = document.createElement('div')
    model.id='model'
    model.style = `
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color:rgba(0,0,0,.3);
    display:flex;
    justify-content: center;
    align-items: center;`
    model.addEventListener('click',this.close.bind(this))
    document.body.appendChild(model)
    this.dialog = document.createElement('div')
    this.dialog.style = `
    padding:20px;
    background-color:white`
    this.dialog.innerText = this.text
    this.dialog.addEventListener('click',e=>{e.stopPropagation()})
    this.dialog.addEventListener('mousedown', this.handleMousedown.bind(this))
    document.addEventListener('mousemove', this.handleMousemove.bind(this))
    document.addEventListener('mouseup', this.handleMouseup.bind(this))
    model.appendChild(this.dialog)
  }
  close() {
    this.dialog.removeEventListener('mousedown',this.handleMousedown)
    document.removeEventListener('mousemove', this.handleMousemove)
    document.removeEventListener('mouseup',this.handleMouseup)
    document.body.removeChild(document.querySelector('#model')) 
  }
  handleMousedown(e) {
    this.isMoving = true
    this.x = e.clientX
    this.y = e.clientY
  }
  handleMousemove(e) {
    if (this.isMoving) {
      this.dialog.style.transform = `translate(${e.clientX - this.x + this.lastX}px,${e.clientY - this.y + this.lastY}px)`
    }
  }
  handleMouseup(e) {
    this.lastX = e.clientX - this.x + this.lastX
    this.lastY = e.clientY - this.y + this.lastY
    this.isMoving = false
  }
}
let dialog = new Dialog('Hello')
dialog.open()
