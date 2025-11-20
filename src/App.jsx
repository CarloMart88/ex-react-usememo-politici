import React, { useState, useEffect, memo, useMemo } from "react";
import "./App.css";
// a questo punto creo una componente card
const Card = memo(({ p }) => {
  console.log("render della card", p.name);
  const { id, name, dob, country, party, image, position, biography } = p;
  return (
    <div className="col-3 m-3 card">
      <img src={image} className="card-img-top p-2" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Name: {name}</h5>
        <p className="card-text">position: {position}</p>
        <p className="card-text">country: {country}</p>
        <p className="card-text">biography: {biography}</p>
      </div>
    </div>
  );
});
/*
📌 Milestone 3: Ottimizzare il rendering delle card con React.memo
Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.*/

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
    return politicians.filter((p) => {
      //destrutturo p cosi è anche più semplice la comprensione del codice
      const { name, biography } = p;
      return (
        // nel return inserisco le casistiche
        name.toLowerCase().includes(search.toLowerCase()) ||
        biography.toLowerCase().includes(search.toLowerCase())
      );
    });
    // come un useEffect anche useMemo vuole il suo array di dipendencies
  }, [politicians, search]);

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
            {filterPoliticians.map((p) => {
              return <Card key={p.id} p={p} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
