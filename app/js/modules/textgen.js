function text(t, i, container) {
    var para = document.createElement('p'),
        paraText = document.createTextNode(`${t}: ${i}`)

    para.appendChild(paraText)

    container.appendChild(para)
}

module.exports = text
