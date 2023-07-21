import Link from "next/link";

const Footer = () => {
  return (
<<<<<<< Updated upstream
    <footer className="flex flex-col text-center">
      <div className="widgets_wrapper bg-sky-500 text-white">
=======
    <footer>
      <div className="widgets_wrapper bg-neutral-900 border-t-[3px] border-yellow-600 text-white">
>>>>>>> Stashed changes
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="column one-fourth">
            <aside className="widget_text widget widget_custom_html">
              <div className="flex justify-center items-center py-10">
                <img
                  src="/logo_elixir.png"
                  width={350}
                  height={350}
                  alt="Nuestro logo"
                />
              </div>
            </aside>
          </div>
          <div className="column one-fourth">
            <aside className="widget widget_block">
              <h5>Enlaces de interés</h5>
              <br />
              <ul>
                <li>
                  <a href="/about" target="_blank">
                    Empresa
                  </a>
                </li>
                <li>
                  <a href="/preguntas-frecuentes" target="_blank">
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a href="mailto:busquedas@elixircars.com" target="_blank">
                    ¿Quieres trabajar con nostros?
                  </a>
                </li>
                <li>
                  <a href="/arrepentimiento" target="_blank">
                    Formulario
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column one-fourth">
            <aside className="widget_text widget widget_custom_html">
              <div className="textwidget custom-html-widget">
                <h5>Enlaces de interés</h5>
                <br />
                <ul>
                  <li>
                    <a href="/terminos-y-condiciones-de-uso/" target="_blank">
                      Términos y Condiciones
                    </a>
                  </li>
                  <li>
                    <a href="/politica-privacidad/" target="_blank">
                      Política de privacidad
                    </a>
                  </li>
                  <li>
                    <a href="/terminos-y-condiciones-de-uso/" target="_blank">
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a href="https://outlook.office.com/mail/" target="_blank">
                      Acceso empleados
                    </a>
                  </li>
                  <li>
                    <a
                      href="/atencion-publicaciones-fraudulentas/"
                      target="_blank"
                    >
                      Atención a publicaciones fraudulentas
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
          <div className="widget_text widget widget_custom_html flex justify-center">
            <aside className="widget_text widget widget_custom_html">
              <div className="textwidget custom-html-widget">
                <a
                  href="http://qr.afip.gob.ar/?qr=TXIfi4ZgHPHLJcmO2azGzA,,"
                  target="_F9GOAFIPINfo"
                  rel="noopener"
                >
                  <img
                    src="https://www.carone.com.ar/wp-content/uploads/2023/05/DATAWEB.jpeg"
                    width={100}
                    height={100}
                    alt="Nuestro logo"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div className="Redes_sociales">
        <div className="widget_text widget widget_custom_html flex justify-center bg-neutral-800 text-white border-t-[1px] border-b-[1px] border-yellow-600">
          <div className="column one">
            {/* <h2 className="text-lg font-semibold">Redes Sociales</h2> */}
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="https://es-la.facebook.com/" target="_blank">
                  <img
                    src="/face.gif"
                    className="w-8 h-8 rounded-lg"
                    alt="facebook_icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank">
                  <img
                    src="/insta.gif"
                    className="w-8 h-8 rounded-lg"
                    alt="insta_icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://gmail.com" target="_blank">
                  <img
                    src="/mail.gif"
                    className="w-8 h-8 rounded-lg"
                    alt="mail_icon"
                  />
                </a>
              </li>
            </ul>
            <br />
          </div>
        </div>
        <div className="text-center bg-neutral-900 text-white">
          © 2023 ELIXIR CARS S.A. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
