setInterval(() => {
    document.getElementById('clock').innerText = Date()
}, 1000)


document.getElementById('snap').onclick = function () {
    html2canvas(document.getElementsByTagName('body')[0]).then(canvas => {
        console.log(canvas);
        saveAs(canvas.toDataURL(), 'screenshot.png');
    })
}

function saveAs(uri, filename) {
    console.log(uri)
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}