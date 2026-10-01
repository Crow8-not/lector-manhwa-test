// js/data.js
const manhwaDatabase = [
    {
        id: "m-001",
        title: "El Regreso del Héroe",
        cover: "./assets/covers/001.jpg",
        type: "Manhwa",
        status: "En Emisión",
        synopsis: "Después de salvar el mundo, el héroe es traicionado. Ahora ha retrocedido en el tiempo 10 años para cambiar su destino.",
        latestChapter: 45,
        chapters: [
            { 
                number: 45, 
                date: "2026-09-30",
                // Añadimos imágenes simuladas para este capítulo
                pages: [
                    "./assets/pages/1.jpg",
                    "./assets/pages/2.jpg",
                    "./assets/pages/3.jpg",
                    "./assets/pages/4.jpg",
                ] 
            },
            { number: 44, date: "2026-09-23" },
            { number: 43, date: "2026-09-16" }
        ]
    },
    {
        id: "m-002",
        title: "Cultivación Celestial",
        cover: "./assets/covers/002.jpg",
        type: "Manhua",
        status: "Pausado",
        synopsis: "Un joven sin talento encuentra un artefacto milenario que lo ayuda a cultivar las artes marciales más rápido que los genios de su secta.",
        latestChapter: 112,
        chapters: [
            { number: 112, date: "2026-09-28" },
            { number: 111, date: "2026-09-21" }
        ]
    },
    {
        id: "m-003",
        title: "Nivel Máximo de Novato",
        cover: "./assets/covers/003.jpg",
        type: "Manhwa",
        status: "En Emisión",
        synopsis: "Atrapado en la zona de tutorial durante 1000 años, el jugador finalmente logra salir con estadísticas al máximo.",
        latestChapter: 12,
        chapters: [
            { number: 12, date: "2026-09-29" },
            { number: 11, date: "2026-09-22" }
        ]
    }
];