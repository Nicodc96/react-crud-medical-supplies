export const AuxiliarFunctions = {
    quitarAcentos(text){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U', 'ñ': 'n', 'Ñ': 'N'};
        return text.split('').map(letra => acentos[letra] || letra).join('').toString();	
    },
    ordenarEquipos(equipos, orden){
        if (!Array.isArray(equipos) || equipos.length === 0) return;
        switch(orden){
          case 0:
            return equipos;
          case 1:
            return equipos.sort((a, b) => a.nombre === b.nombre ? 0 : (a.nombre > b.nombre ? 1 : -1));
          case 2:
            return equipos.sort((a, b) => a.nombre === b.nombre ? 0 : (a.nombre > b.nombre ? -1 : 1))
          case 3:
            return equipos.sort((a, b) => a.cantidad === b.cantidad ? 0 : (a.cantidad > b.cantidad ? 1 : -1));
          case 4:
            return equipos.sort((a, b) => a.antiguedad === b.antiguedad ? 0 : (a.antiguedad > b.antiguedad ? 1 : -1));
        }
    },
    manageClassPage(page, condition){
      return page === condition ? "btn primary disabled" : "primary";
    }
};