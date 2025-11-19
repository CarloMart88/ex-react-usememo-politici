import { useState, useEffect, memo } from "react";
import "./App.css";
/*📌 Milestone 1: Recuperare e visualizzare i dati
Effettua una chiamata API a
http://localhost:3333/politicians

Salva la risposta in uno stato React (useState).

Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

Nome (name)
Immagine (image)
Posizione (position)
Breve biografia (biography)

Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.*/
//creo una variabile di stato come array vuoto per visualizzare le info dopo la chiamata

function App() {
  const [politicians, setPoliticians] = useState([]);

  async function CallPoliticians() {
    const call = await fetch(`http://localhost:3333/politicians`).catch((err) =>
      console.error(err)
    );
    const result = await call.json();
    setPoliticians(result);
  }
  // e datafetching
  useEffect(() => {
    CallPoliticians();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row d-flex">
          <div className="col-12 text-center">ex-react-usememo-politici</div>
        </div>
      </div>
    </>
  );
}

export default App;
