function textParaGenerator(text) {
    var textPara = document.createElement('p'),
        text = document.createTextNode(text)

    textPara.appendChild(text)

    return textPara
}

function timestamp(date) {

    /*TIME CONVERSIOn*/
    var hours = date.getHours(),
        minutes = "0" + date.getMinutes(),
        seconds = "0" + date.getSeconds(),
        formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

    /*Elements*/
    var para = document.createElement('p'),
        paraText = document.createTextNode(formattedTime)

    para.appendChild(paraText)

    return para
}

function advisor(element, container) {
    var time = new Date(element.time * 1000),
        expires = new Date(element.expires * 1000)

    var timePara = timestamp(time),
        expiresPara = timestamp(expires),
        descPara = textParaGenerator(element.description),
        titlePara = textParaGenerator(element.title)

    container.appendChild(titlePara)
    container.appendChild(descPara)
    container.appendChild(timePara)
    container.appendChild(expiresPara)
}

function weatherAlerts(alerts, container) {

    var advisories = document.createElement('div')

    advisories.id = 'advisories'

    alerts.forEach( (element,i) => {

        var advise = document.createElement('div')

        advise.className = 'advise'

        advisor(element, advise)

        advisories.appendChild(advise)
    })

    container.appendChild(advisories)
}

module.exports = weatherAlerts
