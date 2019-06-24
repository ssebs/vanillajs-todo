let items = [];
window.addEventListener("load", () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
        items = [...todos];
        updateList();
    } else {
        items.push({
            id: 1,
            text: "foo",
            completed: false
        });
        updateList();
    }
});

const updateList = () => {
    const list = document.querySelector("#todoList");
    // clear the list
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // add each li element
    items.forEach(item => {
        const newItem = document.createElement("li");
        newItem.classList.add("list-group-item", "w-50", "m-auto");
        newItem.appendChild(document.createTextNode(item.text));
        newItem.setAttribute("key", item.id);
        newItem.addEventListener("click", e => {
            let elem = e.target;
            let id = elem.getAttribute("key");
            const newTxt = window.prompt("Enter the updated content");
            items[id - 1].text = newTxt;
            updateList();
        });
        list.appendChild(newItem);
    });

    // save to localstorage
    localStorage.setItem("todos", JSON.stringify(items));
};

const tdForm = document.querySelector("#addTodo");
tdForm.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.querySelector("#newTodo");
    const txt = input.value;
    // // console.log(txt);
    let nextID = 0;

    items.forEach(item => {
        if (nextID <= item.id) {
            nextID = item.id + 1;
        }
    });
    items.push({
        id: nextID,
        text: txt,
        completed: false
    });

    updateList();
    input.value = "";
});
