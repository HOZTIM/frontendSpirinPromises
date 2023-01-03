const categories = [];
function codeAddress() {
    const categorySelect = myForm.categories; //получаем select из html
    // //запрос на получение всех постов для заполнения select
    // const loader = document.createElement('div');
    // loader.setAttribute("class", "loader");
    // loader.setAttribute("id", "loader");
    // const loaderInner = document.createElement('div');
    // loaderInner.setAttribute("class", "loader_inner");
    // loader.appendChild(loaderInner);
    // document.getElementById('loadPage').appendChild(loader);
    // fetch('https://techcrunch.com/wp-json/wp/v2/posts')
    // .then((response) => {
    //     return response.json();
    // })
    // .then((data) => {
    //     data.forEach(function(item, i, arr) {
    //         // получаем html для элемента
    //         var title = item.parselyMeta['parsely-title'];
    //         // получаем заголовок для элемента
    //         var urlImg = item.parselyMeta['parsely-image-url'];
    //         var x = document.createElement("IMG");
    //         x.setAttribute("src", urlImg);
    //         x.setAttribute("width", "304");
    //         x.setAttribute("height", "228");
    //         x.setAttribute("alt", title);
    //         x.setAttribute("class", "grid-img");
    //         document.body.appendChild(x);
    //         const div = document.createElement('div');
    //         div.className = 'grid-item';
    //         const divTitle = document.createElement('div');
    //         divTitle.innerText = title;
    //         div.appendChild(divTitle);
    //         div.appendChild(x);
    //         document.getElementById('grid').appendChild(div);
    //     });
    //     loader.parentNode.removeChild(loader);
    // });

    categorySelect.addEventListener("change", changeOption); // добавляем слушателя на событие изменения выбранного option в select
    //запрос на получение всех категорий для заполнения select
    fetch('https://techcrunch.com/wp-json/wp/v2/categories')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach(function(item, i, arr) {
            // categorySelect = myForm.categories;
            // получаем текст для элемента
            var text = item.name;
            // получаем значение для элемента
            var value = item.id;
            // создаем новый элемента
            var newOption = new Option(text, value);
            categorySelect.options[categorySelect.options.length]=newOption;
        });
    })
    .then(()=>{
        categorySelect.selectedIndex = 0;
        changeOption();
    })
    //changeOption 
    const btnNext = pagination.next;
    const btnPrev = pagination.prev;
    btnNext.addEventListener("click", nextPage); // добавляем слушателя на событие изменения выбранного option в select
    btnPrev.addEventListener("click", prevPage); // добавляем слушателя на событие изменения выбранного option в select
    function nextPage(e){
        e.preventDefault();
        changeOption("next");
    }
    function prevPage(e){
        e.preventDefault();
        changeOption("prev");
    }
    function changeOption(ind = "nothing"){
        // alert(categorySelect.selectedIndex);
        // var selection = document.getElementById("selection");
        var selectedOption = categorySelect.options[categorySelect.selectedIndex];
        if(ind == "next"){
            // alert("next");
            if(categorySelect.length - 1 > categorySelect.selectedIndex + 1){
                selectedOption = categorySelect.options[categorySelect.selectedIndex + 1];
                categorySelect.selectedIndex += 1;
            }
            else{
                selectedOption = categorySelect.options[0];
                categorySelect.selectedIndex = 0;
            }
        }
        if(ind == "prev"){
            if(categorySelect.selectedIndex - 1 >= 0){
                selectedOption = categorySelect.options[categorySelect.selectedIndex - 1];
                categorySelect.selectedIndex -= 1;
            }
            else{
                selectedOption = categorySelect.options[categorySelect.length-1];
                categorySelect.selectedIndex = categorySelect.length-1;
            }
        }
        // selection.textContent = "Вы выбрали: " + selectedOption.text;
        ourdiv = document.getElementById('grid');
        ourdiv.innerHTML = "";
        const loader = document.createElement('div');
        loader.setAttribute("class", "loader");
        loader.setAttribute("id", "loader");
        const loaderInner = document.createElement('div');
        loaderInner.setAttribute("class", "loader_inner");
        loader.appendChild(loaderInner);
        document.getElementById('loadPage').appendChild(loader);

        fetch('https://techcrunch.com/wp-json/wp/v2/posts?categories=' + selectedOption.value)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(function(item, i, arr) {
                // получаем html для элемента
                var title = item.parselyMeta['parsely-title'];
                // получаем заголовок для элемента
                var urlImg = item.parselyMeta['parsely-image-url'];
                var x = document.createElement("IMG");
                x.setAttribute("src", urlImg);
                x.setAttribute("width", "304");
                x.setAttribute("height", "228");
                x.setAttribute("alt", title);
                x.setAttribute("class", "grid-img");
                document.body.appendChild(x);
                const div = document.createElement('div');
                div.className = 'grid-item';
                const divTitle = document.createElement('div');
                divTitle.innerText = title;
                div.appendChild(divTitle);
                div.appendChild(x);
                document.getElementById('grid').appendChild(div);
            });
            loader.parentNode.removeChild(loader);
        });
    }

}
window.onload = codeAddress;
