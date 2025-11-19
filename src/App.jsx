import React, { useState, useEffect, memo, useMemo } from "react";
import "./App.css";
/*
📌 Milestone 2: Implementare la ricerca ottimizzata
Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.*/
//creo una variabile di stato come array vuoto per visualizzare le info dopo la chiamata

function App() {
  const [politicians, setPoliticians] = useState([]);
  ////creo una variabile di stato per visualizzare lo state aggiornato nel campo input
  const [search, setSearch] = useState("");

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

  //do il nome all'array da filtrare
  const filterPoliticians = useMemo(() => {
    return politicians.map((p) => {
      //destrutturo p cosi è anche più semplice la comprensione del codice
      const { name, biography } = p;
      return;
    });
  }, []);

  /*Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.*/

  return (
    <>
      <div className="container m-5">
        <div className="col-12 ">
          <div className="row">
            <div className="col-7">
              {/* Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.*/}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
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
