const checkbox = document.querySelector('input[type="checkbox"]')

function randomColor() {
    const red = Math.round(Math.random() * 255)
    const green = Math.round(Math.random() * 255)
    const blue = Math.round(Math.random() * 255)

    const color = `rgb(${red}, ${green}, ${blue})`
    document.documentElement.style.setProperty('--bg-color', color)
    return color
}
if (checkbox) {
    checkbox.addEventListener('click', randomColor)
}
window.addEventListener('load', randomColor)