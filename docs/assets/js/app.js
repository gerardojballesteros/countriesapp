// Seleccion de Id's
const root = document.getElementById('root');
const mySearch = document.getElementById('search');
const mobileSearchOn = document.getElementById('mobileSearch');

// Modificando buscador
mySearch.addEventListener('change', () => {
    let searchQuery = mySearch.value;
    loader();
    api(searchQuery);
});
mobileSearchOn.addEventListener('change', () => {
    let searchQuery = mobileSearchOn.value;
    loader();
    api(searchQuery);
});

//Gif para el loader
window.addEventListener('load', () => { api(); loader();});

//Dentro de esta constante va el Gif
const loader = () => {
    root.innerHTML = `
    <div class="card">
    <img src="assets/img/loading.gif" width="200" alt=""/>
    </div>
    `;
}

// Conexion con Api Rest
const api = async (query) => {
    let url;
    if(query){
        url = `https://restcountries.eu/rest/v2/name/${query};`;
    }else{
        url = `https://restcountries.eu/rest/v2/all`;
    }
    const resp = await fetch( url );
    const data = await resp.json();
    root.innerHTML = "";

    // Mostrando resultados de la Api Rest
    if(data.map){
        data.map( resultado =>{
            const htmlString = `
                <div class="wrap-card" >
                     <img id="item-img" src="${resultado.flag}" alt="${resultado.name}"/>
                    <div class="title-card"><h1>${resultado.name}</h1></div>
                        <ul>
                            <li>
                                <img src="assets/img/capital.svg" alt=""/>
                                <p>${resultado.capital}</p>
                            </li>
                            <li>
                                <img src="assets/img/continente.svg" alt=""/>
                                <p>${resultado.region}</p>
                            </li>
                            <li>
                                <img src="assets/img/idioma.svg" alt=""/>
                                <p>${resultado.languages[0].name}</p>
                            </li>
                            <li>
                                <img src="assets/img/moneda.svg" alt=""/>
                                <p>${resultado.currencies[0].name} (${resultado.currencies[0].code})</p>
                            </li>
                        </ul>
                </div>
            `;
            let rootString = document.createElement('div');
            rootString.classList.add('content-card');
            rootString.innerHTML = htmlString;
            root.appendChild(rootString);
        });
    }else{
        const htmlString = `
            <div>
               <h1>Ooops!!! No se encontraron resultados, intenta de nuevo ;)</h1>
            </div>
            `;
            let rootString = document.createElement('div');
            rootString.classList.add('error');
            rootString.innerHTML = htmlString;
            root.appendChild(rootString);
    }
    

}



