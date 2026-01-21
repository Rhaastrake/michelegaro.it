document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".serviceButton");

  const serviceTitle = document.querySelector(".serviceTitle");
  const serviceDescription = document.querySelector(".serviceDescription");
  const serviceCostDisclaimer = document.querySelector(
    ".serviceCostDisclaimer",
  );
  const serviceStartButton = document.querySelector(".serviceStartButton");
  const selectedServiceOverview = document.querySelector(
    ".selectedServiceOverview",
  );
  const selectedServiceForm = document.querySelector(".selectedServiceForm");



  //
  // Descrizioni e form messi a mano per ogni servizio presente nell'html
  //
const servicesData = [
  {
    title: `Assistenza hardware/software`,
    description: `Offro supporto tecnico completo per PC e sistemi operativi di tutte le categorie, sia desktop che laptop.<br><br>
Posso aiutarti a identificare problemi hardware o software, ottimizzare le prestazioni del tuo computer e proporre possibili miglioramenti.<br><br>
Il servizio include consigli pratici, interventi mirati e spiegazioni chiare, lasciando a te la decisione finale su come procedere.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <!-- Tipo di form -->
  <input type="hidden" name="formType" value="assistance">

    <!-- Nome -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name" name="name" placeholder="Nome e cognome *" required>
    <label for="name">Nome e cognome *</label>
  </div>

  <!-- Telefono -->
  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Numero di telefono *" required>
    <label for="phoneNumber">Numero di telefono *</label>
  </div>

  <!-- Città -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="city" name="city" placeholder="Dove abiti? *" required>
    <label for="city">Dove abiti? *</label>
  </div>

  <!-- Tipo PC -->
  <div class="mb-3">
    <select class="form-select" name="pcType" id="pcType" required>
      <option value="" selected disabled>Si tratta di un PC fisso o portatile? *</option>
      <option value="desktop">Fisso</option>
      <option value="laptop">Portatile</option>
    </select>
  </div>

  <!-- Specifica servizio -->
  <div class="mb-3">
    <select class="form-select" name="serviceSpecification" id="serviceSpecification" required>
      <option value="" selected disabled>Di cosa si tratta? *</option>
      <option value="genericAssistance">Assistenza generica</option>
      <option value="software">Aiuto con uno o più programmi</option>
      <option value="cleaning">Pulizia</option>
      <option value="hardware">Cambio componenti</option>
      <option value="noBoot">Il PC non si accende</option>
    </select>
  </div>

  <!-- Dettagli aggiuntivi -->
  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Aggiungi eventuali dettagli" style="height:100px; resize:none;"></textarea>
    <label for="details">Aggiungi eventuali dettagli</label>
  </div>

  <!-- Privacy -->
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Acquisto e/o assemblaggio`,
    description: `Ti fornisco consulenza completa nella scelta dei componenti e nell'assemblaggio del tuo PC personalizzato.<br><br>
Analizziamo insieme le tue esigenze, valutiamo le opzioni disponibili e realizziamo un sistema su misura, con attenzione alla qualità, compatibilità e durata dei componenti.<br><br>
Posso anche guidarti nella ricerca delle migliori offerte sul mercato e rispondere a tutte le tue domande tecniche in modo chiaro.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <!-- Tipo di form -->
  <input type="hidden" name="formType" value="purchaseGuide">

    <!-- Nome -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name" name="name" placeholder="Nome e cognome *" required>
    <label for="name">Nome e cognome *</label>
  </div>

  <!-- Telefono -->
  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Numero di telefono *" required>
    <label for="phoneNumber">Numero di telefono *</label>
  </div>

  <!-- Città -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="city" name="city" placeholder="Dove abiti? *" required>
    <label for="city">Dove abiti? *</label>
  </div>

  <!-- Tipo PC -->
  <div class="mb-3">
    <select class="form-select" name="pcType" id="pcType" required>
      <option value="" selected disabled>Che tipo di PC desideri? *</option>
      <option value="desktop">Fisso</option>
      <option value="laptop">Portatile</option>
    </select>
  </div>

    <!-- Tipo di utilizzo -->
  <div class="mb-3">
    <select class="form-select" name="useType" id="useType" required>
      <option value="" selected disabled>Cerchi un PC per giocare o lavorare? *</option>
      <option value="gaming">PC da gaming</option>
      <option value="office">PC da lavoro</option>
    </select>
  </div>

  <!-- Fascia di prezzo -->
  <div class="mb-3">
    <select class="form-select" name="priceRange" id="priceRange" required>
      <option value="" selected disabled>Indica una fascia di prezzo *</option>
      <option value="€500-€800">€500-€800</option>
      <option value="€800-€1200">€800-€1200</option>
      <option value="€1200-€1600">€1200-€1600</option>
      <option value="over-€1600">Più di €1600</option>
    </select>
  </div>

  <!-- Componenti usati -->
  <div class="mb-3">
    <select class="form-select" name="secondHand" id="secondHand" required>
      <option value="" selected disabled>Valuteresti l'usato? *</option>
      <option value="yes">Si, lo valuterei</option>
      <option value="no">No, voglio tutto nuovo</option>
      <option value="half">Solo in parte</option>
    </select>
  </div>

  <!-- Schermo si no -->
  <div class="mb-3">
    <select class="form-select" name="display" id="display" required>
      <option value="" selected disabled>Cerchi anche uno schermo? *</option>
      <option value="yes">Si, ne ho bisogno</option>
      <option value="no">No, ne ho già uno</option>
    </select>
  </div>

  <!-- Dettagli aggiuntivi -->
  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Aggiungi eventuali dettagli o preferenze" style="height:100px; resize:none;"></textarea>
    <label for="details">Aggiungi eventuali dettagli o preferenze</label>
  </div>

  <!-- Privacy -->
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Server discord`,
    description: `Configuro server Discord su misura, con stanze organizzate per categorie, automazioni personalizzate e moderazione delle attività.<br><br>
Posso aiutarti a creare una comunità organizzata, sicura e funzionale, adattando il server alle tue necessità specifiche.<br><br>
Tutte le configurazioni e le modifiche vengono discusse direttamente con te, garantendo che ogni funzionalità risponda alle tue esigenze.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <!-- Tipo di form -->
  <input type="hidden" name="formType" value="discord">

  <p class="size-1">
    Non esistono domande preimpostate da fare per un server discord
  </p>
  <p class=size-1>
    Parlami liberamente di tuttò ciò che vorresti introdurre
  </p>

  <!-- Nome -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name" name="name" placeholder="Nome e cognome *" required>
    <label for="name">Nome e cognome *</label>
  </div>

  <!-- Telefono -->
  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Numero di telefono *" required>
    <label for="phoneNumber">Numero di telefono *</label>
  </div>

  <!-- Dettagli aggiuntivi -->
  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Scopo e funzionamento del server *" style="height:100px; resize:none;" required></textarea>
    <label for="details">parlami del server che vorresti *</label>
  </div>

  <!-- Privacy -->
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Siti web / applicazioni`,
    description: `Fornisco supporto tecnico, manutenzione e ottimizzazione di siti web e applicazioni desktop o web su richiesta.<br><br>
Posso effettuare aggiornamenti, backup, correzione di errori e ottimizzazione delle performance, sempre discutendo con te ogni intervento prima di procedere.<br><br>
Il servizio è pensato per aiutarti a mantenere i tuoi progetti online efficienti e aggiornati, senza impegno di contratto fisso.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <!-- Tipo di form -->
  <input type="hidden" name="formType" value="application">

  <!-- Nome -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name" name="name" placeholder="Nome e cognome *" required>
    <label for="name">Nome e cognome *</label>
  </div>

  <!-- Telefono -->
  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Numero di telefono *" required>
    <label for="phoneNumber">Numero di telefono *</label>
  </div>

  <!-- Integrazione database o servizi esterni -->
  <div class="mb-3">
    <select class="form-select" name="dbIntegration" id="dbIntegration" required>
    <option value="" selected disabled>Sono necessari database? *</option>
    <option value="yes">Si, è necessario</option>
    <option value="no">No, non è necessario</option>
    </select>
  </div>

  
  <!-- Data di consegna -->
  <div class="form-floating mb-3">
    <input type="date" id="expiryDate" class="form-control" placeholder=" " required>
    <label for="expiryDate">Quando deve essere pronto il progetto? *</label>
  </div>

  <!-- Scopo del sito -->
  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Qual è lo scopo il sito? *" style="height:100px; resize:none;"></textarea>
    <label for="details">Qual è lo scopo il sito? *</label>
  </div>

  <!-- Privacy -->
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
];



  //
  // Rimuove la classe active (evidenziamento del servizio selezionato) a tutti i servizi ogni volta che viene cliccato un servizio e poi aggiungo active a quello cliccato
  //
  serviceButtons.forEach((currentService, index) => {
    currentService.addEventListener("click", () => {
      
      selectedServiceForm.innerHTML = "";
      selectedServiceOverview.classList.remove("d-none");


      serviceButtons.forEach((service) => service.classList.remove("active"));
      currentService.classList.add("active");



      //
      // Aggiorna la descrizione del servizio sulla destra
      //
      serviceTitle.innerHTML = servicesData[index].title;
      serviceDescription.innerHTML = servicesData[index].description;




      //
      // Rimuove d-none dai div delle descrizioni del servizio dopo averne selezionato uno
      //
      serviceDescription.classList.remove("d-none");
      serviceCostDisclaimer.classList.remove("d-none");
      serviceStartButton.classList.remove("d-none");




      //
      // Mostra il form corrispondente al servizio selezionato quando si clicca il pulsante
      //
      serviceStartButton.onclick = () => {
        selectedServiceForm.innerHTML = servicesData[index].formHTML;
        selectedServiceOverview.classList.add("d-none");
      };
    });
  });
});
