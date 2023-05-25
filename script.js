const toDoInput = document.getElementById("toDoInput")
const btn = document.getElementById("btn")
const list = document.querySelector(".list-group") // <ul></ul>
const btnReset = document.getElementById("btnReset")
const errorInput = document.querySelector(".form")// <div class="form"></div>
const deleteAllListBtn = document.getElementById("deleteAllListBtn")
const bs_alert = document.getElementById("bs-alert")



// hide reset button 
btnReset.style.display = "none"

let count = 0
btn.addEventListener("click", function () {

    bs_alert.classList.add("d-none")

    const list_item = document.createElement("li") // <li></li>
    list_item.classList.add("list-group-item", "d-flex", "justify-content-between")

    const span = document.createElement("span")
    span.innerText = toDoInput.value

    list_item.append(span)

    const div = document.createElement("div")

    const checkBtn = document.createElement("button")
    checkBtn.classList.add("btn", "btn-light", "btn-sm")
    checkBtn.innerHTML = '<i class="fa-solid fa-check text-success"></i>'

    checkBtn.onclick = function () {
        // span
        this.parentElement.previousSibling.style.textDecoration = "line-through"
        // li
        this.parentElement.parentElement.classList.add("bg-success")
        this.remove()
    }


    const trashBtn = document.createElement("button")
    trashBtn.classList.add("btn", "btn-light", "btn-sm")
    trashBtn.innerHTML = '<i class="fa-solid fa-trash text-danger"></i>'

    trashBtn.onclick = function () {
        this.parentElement.parentElement.remove()
        displayDeleteBtn()
    }

    div.append(checkBtn, trashBtn)
    list_item.append(div)


    // input validation
    const fillError = document.createElement("span")
    fillError.classList.add("fs-6", "text-danger")
    fillError.innerHTML = "Dəyər daxil edin !"

    // check input value empty or not
    if (!toDoInput.value && count == 0) {
        count++
        errorInput.append(fillError)
        toDoInput.style.border = "2px solid red"

    } else if (!toDoInput.value && count == 1) {

    } else if (toDoInput.value.length <= 3) {
        alert("Daxil edilən dəyər ən az 3 simvol olmalıdır!")
    } else if (errorInput.children[1]) {
        let removeError = errorInput.children[1]
        removeError.remove()
        list.append(list_item)
        toDoInput.style.border = "none"
        count = 0

        deleteAllListBtn.classList.replace("d-none", "d-block")

    } else {
        list.append(list_item)
        count = 0

        deleteAllListBtn.classList.replace("d-none", "d-block")
    }


    displayDeleteBtn()
    toDoInput.value = ""
    showReset()

})

// remove input character error 
function clearError() {
    errorInput.children[1].remove()
    toDoInput.style.border = "none"
    count = 0
}

// onclick deleteAllListBtn button and delete all lists function
function deleteLists() {
    if (list.children.length > 0) {
        for (let i = list.children.length; i > 0; i--) {
            list.children[i - 1].remove()
        }
    }

    displayDeleteBtn()
    bs_alert.classList.replace("d-none", "d-block")
    clearError()
}


// show and hide reset button
function showReset() {
    if (!toDoInput.value) {
        btnReset.style.display = "none"
    } else {
        btnReset.style.display = "block"
    }
}


// remove deleteAllListBtn(delete) button
function displayDeleteBtn() {
    if (list.children.length == 0) {
        deleteAllListBtn.classList.replace("d-block", "d-none")

        bs_alert.classList.replace("d-none", "d-block")
    }
}

// reset button click function
btnReset.onclick = function () {
    
    toDoInput.value = ""
    showReset()
    clearError()
    
}