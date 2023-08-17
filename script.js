// Chave de API TMDb
const apiKey = '546d3e3da5d2d90536a93c7c7efffc2a';

// URL da API dos gêneros de filmes
const genresEndpoint = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=' + apiKey;

// Salva o ID do gênero que o usuário escolher
let selectedGenreId = '';

// Exibi os filmes na página
function mostrarValores(filmes) {
    // Obtém o elemento HTML onde os filmes serão exibidos
    const divFilmes = document.getElementById("filmes");

    // Irá mapear todos os filmes para organizar em HTML
    const filmesHTML = filmes.map(filme => {
        return `
        <!-- Definindo cards -->
        <div class="col">
            <body class="bg-dark text-light">
            <div class="card text-bg-secondary">
                <!-- img do filme (capa) -->
                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}">
                <div class="card-body">
                    <!-- Título -->
                    <h5 class="card-title">${filme.title}</h5>
                    <!--Resumo (sinopse) -->
                    
                    <p class="card-text limitar-linhas">${filme.overview}</p>
                </div>
            </div>
        </div>`;
    });

    // Inserindo filmes na div
    divFilmes.innerHTML = `<div class="row">${filmesHTML.join("")}</div>`;
}



// Irá buscar os filmes que estão emgeneros no label
fetch(genresEndpoint)
    .then(response => response.json())
    .then(data => {
        // Busca todos os elementos qu estão em gêneros
        const genreSelect = document.getElementById('genreSelect');

        // Ao clicar em option, irpa obter todos os generos que estão preencidos
        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });

        // Ficará ocioso, e fará uma buscar ao clicar no meno de generos
        genreSelect.addEventListener('change', () => {
            // Fará uma atualização depois de clicar em algum genero
            selectedGenreId = genreSelect.value;
            // Aqui irá retornar a função (chamar)
            getAndDisplayMovies();
        });
    })
    .catch(error => console.error('Erro ao obter os gêneros:', error));

// Irá buscar os filmes que foram selecionados em generos de forma organizada
const moviesEndpoint = 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=' + apiKey;

// Irá buscar e exibir os filmes depois de clicar no genero
function getAndDisplayMovies() {
    // Ao escolher o genero, irá criar uma URL de acordo com o genero
    const filteredEndpoint = selectedGenreId
        ? `${moviesEndpoint}&with_genres=${selectedGenreId}`
        : moviesEndpoint;

    // Irá pegar os dados da API e exibir os filmes na página e mostrará o erro se for o caso
    getDadosAPI(filteredEndpoint)
        .then(filmes => mostrarValores(filmes))
        .catch(error => console.error("Erro ao obter os dados da API:", error));
}

// Buscar dados da API
async function getDadosAPI(endPoint) {
    try {
        // Pega os dados da API e salva 
        const res = await fetch(endPoint);
        // converte os dados salvos da API em formato JSON
        const data = await res.json();
        // Por fim retorna os dados da API em Matriz
        const filmes = data.results;
        return filmes;
    } catch (error) {
        // Erro, se for o caso.
        throw error;
    }
}

// inicia um carregamento de todos os filmes.
getAndDisplayMovies();
