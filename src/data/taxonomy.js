/**
 * CATALOG_TAXONOMY — Taxonomía del sistema (3 niveles)
 * No editable por negocios. En v3: /config/taxonomy en Firestore
 */
export const CATALOG_TAXONOMY = {
  'Gastronomía':{
    ic:'🍽️', subs:{
      'Casados':     {ic:'🍛',subs:['Con pollo','Con carne','Con pescado','Vegetariano','Del día']},
      'Sopas':       {ic:'🍲',subs:['Sopa negra','Olla de carne','Ranchera','Consomé','Crema']},
      'Bebidas':     {ic:'🥤',subs:['Refrescos naturales','Jugos','Café','Aguas','Sodas']},
      'Postres':     {ic:'🍮',subs:['Queques','Tartas','Flanes','Helados','Galletas']},
      'Desayunos':   {ic:'🍳',subs:['Gallo pinto','Omelet','Pancakes','Bocadillos','Frutas']},
      'Almuerzos':   {ic:'🍱',subs:['Menú del día','A la carta','Ejecutivo','Especial','Combo']},
    }
  },
  'Comercio':{
    ic:'🛍️', subs:{
      'Ropa':{ic:'👕',subs:['Hombre','Mujer','Niños','Deportiva','Formal']},
      'Calzado':{ic:'👟',subs:['Hombre','Mujer','Niños','Deportivo','Formal']},
      'Hogar':{ic:'🏠',subs:['Cocina','Sala','Dormitorio','Jardín','Decoración']},
      'Electrónica':{ic:'📱',subs:['Celulares','Computadoras','Accesorios','Audio','Gaming']},
      'Ferretería':{ic:'🔧',subs:['Herramientas','Materiales','Electricidad','Plomería','Pintura']},
    }
  },
  'Salud':{
    ic:'💊', subs:{
      'Medicamentos':{ic:'💊',subs:['Con receta','Sin receta','Vitaminas','Naturales','Pediátricos']},
      'Equipos':{ic:'🏥',subs:['Presión','Glucosa','Rehabilitación','Movilidad','Diagnóstico']},
      'Servicios':{ic:'🩺',subs:['Consulta','Limpieza dental','Examen de vista','Laboratorio','Terapia']},
    }
  },
  'Servicios':{
    ic:'🔧', subs:{
      'Hogar':{ic:'🏠',subs:['Fontanería','Electricidad','Pintura','Carpintería','Jardinería']},
      'Digital':{ic:'💻',subs:['Diseño gráfico','Redes sociales','Web','SEO','Video']},
      'Transporte':{ic:'🚚',subs:['Delivery','Mudanzas','Mensajería','Taxi','Courier']},
      'Limpieza':{ic:'🧹',subs:['Casas','Oficinas','Vidrios','Alfombras','Post-construcción']},
    }
  },
};

export default CATALOG_TAXONOMY;

/**
 * Clonar la taxonomía del sistema para un negocio específico
 * Cada negocio puede personalizar su propia copia
 */
export function cloneTaxonomy() {
  return JSON.parse(JSON.stringify(CATALOG_TAXONOMY));
}
