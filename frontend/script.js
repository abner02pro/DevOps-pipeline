const dataList = document.getElementById('data-list');

function loadData() {
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            dataList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                dataList.appendChild(li);
            });
        });
}

function addData() {
    const input = document.getElementById('data-input');
    const name = input.value;
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    .then(() => {
        input.value = '';
        loadData();
    });
}

loadData();
