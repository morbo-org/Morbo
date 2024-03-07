function component() {
    const div = document.createElement('div')
    div.innerHTML = '<p>Hello there!</p>'
    return div
}

document.body.appendChild(component())