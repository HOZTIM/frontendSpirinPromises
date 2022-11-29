const categories = [];
function codeAddress() {
    const categorySelect = myForm.categories; //получаем select из html
    //запрос на получение всех постов для заполнения select
    const loader = document.createElement('div');
    loader.setAttribute("class", "loader");
    loader.setAttribute("id", "loader");
    const loaderInner = document.createElement('div');
    loaderInner.setAttribute("class", "loader_inner");
    loader.appendChild(loaderInner);
    document.getElementById('loadPage').appendChild(loader);
    fetch('https://techcrunch.com/wp-json/wp/v2/posts')
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
    });
    //changeOption 
    function changeOption(){
        // var selection = document.getElementById("selection");
        var selectedOption = categorySelect.options[categorySelect.selectedIndex];
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

{/* <div class="loader">
  <div class="loader_inner"></div>
</div> */}