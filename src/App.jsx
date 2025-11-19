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

  console.log(politicians);

  return (
    <>
      <div className="container">
        <div className="col-12">
          <div className="row d-flex">
            {/*ora faccio il map con il destructure prendo le proprietà che mi servono */}
            {politicians.map((p) => {
              const {
                id,
                name,
                dob,
                country,
                party,
                image,
                position,
                biography,
              } = p;
              return (
                <div key={id} className="col-3 m-3 card">
                  <img src={image} className="card-img-top p-2" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Name: {name}</h5>
                    <p className="card-text">position: {position}</p>
                    <p className="card-text">country: {country}</p>
                    <p className="card-text">biography: {biography}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
