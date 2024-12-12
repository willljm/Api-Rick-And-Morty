document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const searchInput = document.getElementById('searchInput');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    let characters = [];

    const createCharacterCard = (personaje) => {
        const statusClass = personaje.status.toLowerCase() === 'alive' ? 'status-alive' : 
                          personaje.status.toLowerCase() === 'dead' ? 'status-dead' : 
                          'status-unknown';

        const card = document.createElement('div');
        card.className = 'carta';
        card.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}">
            <div class="card-info">
                <h2 class="titulo-nombre">${personaje.name}</h2>
                <span class="status-badge ${statusClass}">${personaje.status}</span>
                <div class="info-item">
                    <span class="info-label">Especie:</span>
                    <span>${personaje.species}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Género:</span>
                    <span>${personaje.gender}</span>
                </div>
            </div>
        `;

        // Agregar evento click para mostrar el popup
        card.addEventListener('click', () => showPopup(personaje));
        return card;
    };

    const showPopup = (personaje) => {
        const popupInfo = popup.querySelector('.popup-info');
        const statusClass = personaje.status.toLowerCase() === 'alive' ? 'status-alive' : 
                          personaje.status.toLowerCase() === 'dead' ? 'status-dead' : 
                          'status-unknown';

        popupInfo.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" class="popup-image">
            <div class="popup-details">
                <h2>${personaje.name}</h2>
                <span class="status-badge ${statusClass}">${personaje.status}</span>
                <div class="info-group">
                    <div class="info-item">
                        <span class="info-label">Especie:</span>
                        <span>${personaje.species}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Género:</span>
                        <span>${personaje.gender}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Origen:</span>
                        <span>${personaje.origin.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Ubicación:</span>
                        <span>${personaje.location.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Episodios:</span>
                        <span>${personaje.episode.length}</span>
                    </div>
                </div>
            </div>
        `;
        popup.style.display = 'block';
    };

    // Cerrar popup
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Cerrar popup al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Función para renderizar las cartas
    const renderCharacters = (characters) => {
        cardsContainer.innerHTML = ''; // Limpiamos el contenedor
        characters.forEach(character => {
            const card = createCharacterCard(character);
            cardsContainer.appendChild(card);
        });
    };

    // Función para filtrar personajes
    const filterCharacters = (searchTerm) => {
        const filtered = characters.filter(character => 
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderCharacters(filtered);
    };

    // Event listener para el buscador
    searchInput.addEventListener('input', (e) => {
        filterCharacters(e.target.value);
    });

    // Obtener los datos de la API
    fetch("https://rickandmortyapi.com/api/character")
        .then(resp => resp.json())
        .then(data => {
            characters = data.results;
            renderCharacters(characters);
        })
        .catch(error => {
            console.error('Error al cargar los personajes:', error);
            cardsContainer.innerHTML = '<p>Error al cargar los personajes</p>';
        });
});