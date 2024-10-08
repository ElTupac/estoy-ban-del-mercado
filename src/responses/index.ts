export const indexResponse: () => string = () => {
  const minDate = new Date();
  const todayDate = minDate.toISOString().split("T")[0];

  return `
    <section>
        <h3>Crear Warning</h3>
        <form action="/warning" method="POST">
            <div>
                <div>
                    <label>Telefono</label>
                </div>
                <input name="phone" type="text" inputmode="tel" required />
            </div>
            <div>
                <div>
                    <label>Motivo</label>
                </div>
                <textarea name="reason" type="text" required rows="5"></textarea>
            </div>
            <div>
                <div>
                    <label>Fecha de vencimiento</label>
                </div>
                <input name="expire_date" type="date" required min="${todayDate}" />
            </div>

            <button type="reset">Cancelar</button>
            <button type="submit">Confirmar</button>
        </form>
    </section>
    <section>
        <h3>Crear Ban</h3>
        <form action="/ban" method="POST">
            <div>
                <div>
                    <label>Telefono</label>
                </div>
                <input name="phone" type="text" inputmode="tel" required />
            </div>
            <div>
                <div>
                    <label>Motivo</label>
                </div>
                <textarea name="reason" type="text" required rows="5"></textarea>
            </div>
            <div>
                <div>
                    <label>Fecha de vencimiento</label>
                </div>
                <input name="expire_date" type="date" required min="${todayDate}" />
            </div>

            <button type="reset">Cancelar</button>
            <button type="submit">Confirmar</button>
        </form>
    </section>
`;
};
