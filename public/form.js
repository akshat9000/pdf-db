function readFile() {
    if(this.files && this.files[0]) {
        var FR = new FileReader()

        FR.addEventListener("load", function(e) {
            document.getElementById("img").src = e.target.result
            console.log(e.target.result)
            let di = document.getElementById('bloc');
			di.style["display"] = "inline-block";
        })

        FR.readAsDataURL(this.files[0])

    }
}

document.getElementById("file").addEventListener("change",readFile)