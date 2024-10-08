export const indexReponse: () => string = () => {
  return `
    <h1>Estoy ban del mercado?</h1>
    <p>Consulta si tu contacto recibio warning o ban de los grupos de mercado y subasta de Lairen.</p>
    <p>Copialo tal cual aparece en en whatsapp, es de esa forma que lo registramos. Si lo modificas puede darte un resultado erroneo.</p>
    <form action="/q" method="GET">
        <div>
            <input type="search" placeholder="Ej.: +55 11 91579-6827" name="phone" />
        </div>
        <button type="submit">Buscar</button>
    </form>
  `;
};
