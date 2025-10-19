// Simple simulated behavior for the static demo (no backend)
// Stores data in localStorage so you can simulate flows between client & provider

function $(id){ return document.getElementById(id); }

/* CLIENT FLOW */
const requestForm = $('requestForm');
if(requestForm){
  requestForm.addEventListener('submit', function(e){
    e.preventDefault();
    const req = {
      id: 'REQ' + Date.now(),
      name: $('clientName').value || 'Cliente Teste',
      phone: $('clientPhone').value || '',
      address: $('clientAddress').value || '',
      category: $('category').value,
      description: $('description').value || '',
      when: $('when').value || '',
      priceSuggested: (Math.floor(Math.random()*300)+100)
    };
    // save as pending request (localStorage)
    localStorage.setItem('fixhoje_pending', JSON.stringify(req));
    // update admin metrics
    updateMetrics(1, req.priceSuggested*0.3);
    // show status
    $('status').classList.remove('hidden');
    $('statusText').innerText = 'Solicitação enviada. Aguardando prestador aceitar (simulado).';
    // Simulate provider offer after 4 seconds (for demo)
    setTimeout(()=>{
      const offer = { providerName:'João Pintor', price:req.priceSuggested };
      $('offerBox').classList.remove('hidden');
      $('offerName').innerText = offer.providerName;
      $('offerPrice').innerText = offer.price.toFixed(2);
      // store offer
      localStorage.setItem('fixhoje_offer', JSON.stringify(offer));
    }, 3500);
  });
  const confirmJob = $('confirmJob');
  if(confirmJob){
    confirmJob.addEventListener('click', ()=>{
      const offer = JSON.parse(localStorage.getItem('fixhoje_offer')||'null');
      if(!offer) return alert('Sem oferta encontrada (simulado)');
      $('statusText').innerText = 'Serviço confirmado. Aguarde chegada do prestador.';
      // mark as completed after 6 seconds
      setTimeout(()=>{
        $('statusText').innerText = 'Serviço finalizado (simulado). Obrigado! Avalie o prestador.';
      }, 6000);
    });
  }
}

/* PROVIDER FLOW */
const providerForm = $('providerForm');
if(providerForm){
  providerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const prov = {
      id: 'PROV' + Date.now(),
      name: $('provName').value || 'Prestador Teste',
      doc: $('provDoc').value || '',
      services: $('provServices').value || '',
      area: $('provArea').value || '',
      priceHour: $('provPrice').value || ''
    };
    // save provider list
    const list = JSON.parse(localStorage.getItem('fixhoje_providers')||'[]');
    list.push(prov);
    localStorage.setItem('fixhoje_providers', JSON.stringify(list));
    alert('Prestador cadastrado (simulado). Você verá solicitações quando houver pedidos.');
    $('jobs').classList.remove('hidden');
    renderJobs();
    updateProviderCount();
  });
  renderJobs();
}

function renderJobs(){
  const jobList = $('jobList');
  jobList.innerHTML = '';
  const pending = JSON.parse(localStorage.getItem('fixhoje_pending')||'null');
  if(pending){
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<p><strong>Cliente:</strong> ${pending.name}</p>
      <p><strong>Categoria:</strong> ${pending.category}</p>
      <p><strong>Endereço:</strong> ${pending.address}</p>
      <p><strong>Descrição:</strong> ${pending.description}</p>
      <p><strong>Preço sugerido:</strong> R$ ${pending.priceSuggested.toFixed(2)}</p>
      <button class="btn" onclick="acceptJob()">Aceitar trabalho</button>`;
    jobList.appendChild(div);
  } else {
    jobList.innerHTML = '<p>Nenhuma solicitação pendente (simulado)</p>';
  }
}

window.acceptJob = function(){
  // provider accepts the pending job
  const offer = JSON.parse(localStorage.getItem('fixhoje_offer')||'{"providerName":"Você (simulado)","price":100}');
  alert('Você aceitou o trabalho: ' + offer.providerName + ' — preço: R$' + offer.price.toFixed(2));
  // simulate job completion
  setTimeout(()=>{
    alert('Serviço finalizado (simulado). Você receberá 70% após confirmação.');
    // remove pending
    localStorage.removeItem('fixhoje_pending');
    renderJobs();
  }, 4000);
}

/* ADMIN METRICS */
function updateMetrics(requestsIncrement=0, commissionIncrement=0){
  const reqs = parseInt(localStorage.getItem('fixhoje_requests')||'0') + requestsIncrement;
  const comm = parseFloat(localStorage.getItem('fixhoje_commission')||'0') + commissionIncrement;
  localStorage.setItem('fixhoje_requests', reqs);
  localStorage.setItem('fixhoje_commission', comm.toFixed(2));
  const provCount = JSON.parse(localStorage.getItem('fixhoje_providers')||'[]').length;
  localStorage.setItem('fixhoje_providers_count', provCount);
  // update admin page if open
  if($('mRequests')){
    $('mRequests').innerText = reqs;
    $('mCommission').innerText = comm.toFixed(2);
    $('mProviders').innerText = provCount;
  }
}

function updateProviderCount(){
  const provCount = JSON.parse(localStorage.getItem('fixhoje_providers')||'[]').length;
  localStorage.setItem('fixhoje_providers_count', provCount);
}

/* initialize admin view on load */
if($('mRequests')){
  updateMetrics(0,0);
}
