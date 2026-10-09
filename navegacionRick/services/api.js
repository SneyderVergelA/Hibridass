const BASE = 'https://rickandmortyapi.com/api';

// Cuando la API no encuentra resultados responde 404, lo manejamos como lista vacia
async function pedir(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { info: { next: null }, results: [] };
    }
    return await res.json();
  } catch (error) {
    return { info: { next: null }, results: [] };
  }
}

export async function getPersonajes(pagina = 1, status = '', nombre = '') {
  return await pedir(
    `${BASE}/character?page=${pagina}&status=${status}&name=${encodeURIComponent(nombre)}`
  );
}

export async function getEpisodios(pagina = 1) {
  return await pedir(`${BASE}/episode?page=${pagina}`);
}

export async function getUbicaciones(pagina = 1) {
  return await pedir(`${BASE}/location?page=${pagina}`);
}

// Recibe las urls de los personajes de un episodio y trae todos en una sola peticion
export async function getPersonajesPorUrls(urls) {
  const ids = urls.map(url => url.split('/').pop()).join(',');
  if (ids === '') {
    return [];
  }
  try {
    const res = await fetch(`${BASE}/character/${ids}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    return [];
  }
}
