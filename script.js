(function(){
  "use strict";

  /* ---------- embedded, pre-cleaned, anonymized class data ---------- */
  /* Nenhum nome, e-mail, data de nascimento exata ou carimbo de data/hora foi mantido. */
  var TURMA = [{"idade":18,"altura":174.0,"peso":68.0,"genero":"M","imc":22.46003435,"tmb":1682},{"idade":17,"altura":160.0,"peso":54.0,"genero":"F","imc":21.09375,"tmb":1294},{"idade":17,"altura":156.0,"peso":55.9,"genero":"F","imc":22.97008547,"tmb":1288},{"idade":18,"altura":152.0,"peso":56.0,"genero":"F","imc":24.23822715,"tmb":1259},{"idade":18,"altura":175.0,"peso":62.7,"genero":"M","imc":20.47346939,"tmb":1636},{"idade":18,"altura":177.0,"peso":57.0,"genero":"M","imc":18.19400555,"tmb":1591},{"idade":17,"altura":174.5,"peso":63.9,"genero":"M","imc":20.98504938,"tmb":1650},{"idade":17,"altura":165.5,"peso":63.1,"genero":"M","imc":23.03739469,"tmb":1585},{"idade":18,"altura":170.0,"peso":70.0,"genero":"M","imc":24.22145329,"tmb":1678},{"idade":17,"altura":171.0,"peso":62.2,"genero":"M","imc":21.27150234,"tmb":1611},{"idade":17,"altura":170.0,"peso":50.0,"genero":"F","imc":17.30103806,"tmb":1316},{"idade":17,"altura":169.0,"peso":50.0,"genero":"M","imc":17.50638983,"tmb":1476},{"idade":18,"altura":181.0,"peso":76.0,"genero":"M","imc":23.19831507,"tmb":1806},{"idade":17,"altura":177.0,"peso":64.7,"genero":"M","imc":20.65179227,"tmb":1673},{"idade":18,"altura":163.0,"peso":54.1,"genero":"F","imc":20.3620761,"tmb":1309},{"idade":17,"altura":168.0,"peso":55.1,"genero":"M","imc":19.52239229,"tmb":1521},{"idade":18,"altura":176.0,"peso":88.0,"genero":"M","imc":28.40909091,"tmb":1895},{"idade":17,"altura":166.0,"peso":83.6,"genero":"M","imc":30.33822035,"tmb":1794},{"idade":17,"altura":171.0,"peso":65.0,"genero":"M","imc":22.22906193,"tmb":1639},{"idade":17,"altura":170.0,"peso":88.5,"genero":"M","imc":30.62283737,"tmb":1868},{"idade":18,"altura":170.0,"peso":78.0,"genero":"F","imc":26.98961938,"tmb":1592},{"idade":18,"altura":170.0,"peso":55.0,"genero":"M","imc":19.03114187,"tmb":1528},{"idade":18,"altura":180.0,"peso":72.0,"genero":"M","imc":22.22222222,"tmb":1760},{"idade":17,"altura":170.0,"peso":58.2,"genero":"M","imc":20.1384083,"tmb":1564},{"idade":17,"altura":170.0,"peso":54.0,"genero":"M","imc":18.68512111,"tmb":1522},{"idade":18,"altura":175.0,"peso":60.0,"genero":"M","imc":19.59183673,"tmb":1609},{"idade":17,"altura":166.0,"peso":48.0,"genero":"F","imc":17.41907389,"tmb":1272}];

  var IMC_BANDS = [
    {max:18.5, label:"Abaixo do peso", color:"var(--imc-under)"},
    {max:25,   label:"Peso normal",    color:"var(--imc-normal)"},
    {max:30,   label:"Sobrepeso",      color:"var(--imc-over)"},
    {max:35,   label:"Obesidade I",    color:"var(--imc-ob1)"},
    {max:40,   label:"Obesidade II",   color:"var(--imc-ob2)"},
    {max:Infinity, label:"Obesidade III", color:"var(--imc-ob3)"}
  ];
  function classifyIMC(v){ for(var i=0;i<IMC_BANDS.length;i++){ if(v < IMC_BANDS[i].max) return IMC_BANDS[i]; } return IMC_BANDS[IMC_BANDS.length-1]; }

  function mean(a){ return a.reduce(function(s,v){return s+v;},0)/a.length; }
  function median(a){ var s=a.slice().sort(function(x,y){return x-y;}); var m=Math.floor(s.length/2); return s.length%2? s[m] : (s[m-1]+s[m])/2; }
  function stdev(a){ var m=mean(a); return Math.sqrt(mean(a.map(function(v){return (v-m)*(v-m);}))); }
  function fmt(v,d){ d=d===undefined?1:d; return v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}); }

  /* ---------- tabs ---------- */
  var tabs = document.querySelectorAll('.tab-btn');
  function showTab(name){
    tabs.forEach(function(b){ b.classList.toggle('active', b.dataset.tab===name); });
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    document.getElementById('page-'+name).classList.add('active');
    window.scrollTo(0,0);
  }
  tabs.forEach(function(b){ b.addEventListener('click', function(){ showTab(b.dataset.tab); }); });
  document.getElementById('r-goto-form').addEventListener('click', function(){ showTab('form'); });

  /* ================= PÁGINA 1 ================= */
  function renderTurma(){
    var n = TURMA.length;
    var idades = TURMA.map(function(d){return d.idade;});
    var alturas = TURMA.map(function(d){return d.altura;});
    var pesos = TURMA.map(function(d){return d.peso;});
    var imcs = TURMA.map(function(d){return d.imc;});
    var tmbs = TURMA.map(function(d){return d.tmb;});

    document.getElementById('t-n').textContent = n;
    document.getElementById('t-idade-range').textContent = Math.min.apply(null,idades)+'–'+Math.max.apply(null,idades);

    var cardsData = [
      {label:'Idade média', value: fmt(mean(idades),1), unit:'anos', accent:'var(--teal)'},
      {label:'Altura média', value: fmt(mean(alturas),1), unit:'cm', accent:'var(--teal)'},
      {label:'Peso médio', value: fmt(mean(pesos),1), unit:'kg', accent:'var(--amber)'},
      {label:'IMC médio', value: fmt(mean(imcs),1), unit:'', accent:'var(--amber)'},
      {label:'Gêneros', value: TURMA.filter(function(d){return d.genero==='M';}).length+'M / '+TURMA.filter(function(d){return d.genero==='F';}).length+'F', unit:'', accent:'var(--brick)'}
    ];
    var cardsEl = document.getElementById('t-cards');
    cardsEl.innerHTML = cardsData.map(function(c){
      return '<div class="card" style="--accent:'+c.accent+'"><span class="num stat-value">'+c.value+'</span><span class="stat-unit">'+c.unit+'</span><div class="stat-label">'+c.label+'</div></div>';
    }).join('');

    /* IMC classification bar chart */
    var counts = {};
    imcs.forEach(function(v){ var b=classifyIMC(v).label; counts[b]=(counts[b]||0)+1; });
    var order = ["Abaixo do peso","Peso normal","Sobrepeso","Obesidade I","Obesidade II","Obesidade III"];
    var maxC = Math.max.apply(null, Object.values(counts).concat([1]));
    document.getElementById('t-imc-chart').innerHTML = order.filter(function(l){return counts[l];}).map(function(l){
      var c = counts[l]; var band = IMC_BANDS.filter(function(b){return b.label===l;})[0];
      return '<div class="bar-row"><span class="lbl">'+l+'</span><div class="bar-track"><div class="bar-fill" style="width:'+(c/maxC*100)+'%;background:'+band.color+'"></div></div><span class="val">'+c+'</span></div>';
    }).join('');

    /* histogram helper */
    function histogram(values, binSize, unit, containerId){
      var lo = Math.floor(Math.min.apply(null,values)/binSize)*binSize;
      var hi = Math.ceil(Math.max.apply(null,values)/binSize)*binSize;
      var bins = [];
      for(var b=lo;b<hi;b+=binSize){ bins.push({from:b,to:b+binSize,count:0}); }
      values.forEach(function(v){
        var idx = Math.min(Math.floor((v-lo)/binSize), bins.length-1);
        bins[idx].count++;
      });
      var maxC = Math.max.apply(null, bins.map(function(b){return b.count;}).concat([1]));
      document.getElementById(containerId).innerHTML = bins.filter(function(b){return b.count>0;}).map(function(b){
        return '<div class="bar-row"><span class="lbl">'+b.from+'–'+b.to+' '+unit+'</span><div class="bar-track"><div class="bar-fill" style="width:'+(b.count/maxC*100)+'%"></div></div><span class="val">'+b.count+'</span></div>';
      }).join('');
    }
    histogram(alturas, 10, 'cm', 't-altura-chart');
    histogram(pesos, 10, 'kg', 't-peso-chart');

    /* stat table */
    var rows = [
      {n:'Idade', a:idades, u:'anos', d:0},
      {n:'Altura', a:alturas, u:'cm', d:1},
      {n:'Peso', a:pesos, u:'kg', d:1},
      {n:'IMC', a:imcs, u:'', d:1},
      {n:'TMB', a:tmbs, u:'kcal', d:0}
    ];
    document.getElementById('t-stat-table').innerHTML =
      '<tr><th>Métrica</th><th>Média</th><th>Mediana</th><th>Desvio-padrão</th><th>Mín.</th><th>Máx.</th></tr>' +
      rows.map(function(r){
        return '<tr><td>'+r.n+' '+(r.u?'('+r.u+')':'')+'</td><td>'+fmt(mean(r.a),r.d)+'</td><td>'+fmt(median(r.a),r.d)+'</td><td>'+fmt(stdev(r.a),r.d)+'</td><td>'+fmt(Math.min.apply(null,r.a),r.d)+'</td><td>'+fmt(Math.max.apply(null,r.a),r.d)+'</td></tr>';
      }).join('');

    document.getElementById('t-tmb-cards').innerHTML =
      '<div class="card" style="--accent:var(--amber)"><span class="num stat-value">'+fmt(mean(tmbs),0)+'</span><span class="stat-unit">kcal/dia</span><div class="stat-label">TMB média da turma</div></div>' +
      '<div class="card" style="--accent:var(--brick)"><span class="num stat-value">'+fmt(stdev(tmbs),0)+'</span><span class="stat-unit">kcal</span><div class="stat-label">Variação (desvio-padrão)</div></div>';
  }
  renderTurma();

  /* ================= PÁGINA 2 — FORM ================= */
  var sexoSel = null;
  document.querySelectorAll('#f-sexo button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#f-sexo button').forEach(function(b){ b.classList.remove('sel'); });
      btn.classList.add('sel'); sexoSel = btn.dataset.v;
    });
  });

  var lastResult = null;

  function ageFromBirthdate(iso){
    var b = new Date(iso+'T00:00:00');
    var t = new Date();
    var age = t.getFullYear() - b.getFullYear();
    var m = t.getMonth() - b.getMonth();
    if(m < 0 || (m===0 && t.getDate() < b.getDate())) age--;
    return age;
  }

  document.getElementById('visit-form').addEventListener('submit', function(e){
    e.preventDefault();
    var msg = document.getElementById('f-msg');
    var nasc = document.getElementById('f-nasc').value;
    var altura = parseFloat(document.getElementById('f-altura').value);
    var peso = parseFloat(document.getElementById('f-peso').value);
    if(!nasc || !altura || !peso || !sexoSel){
      msg.textContent = 'Preencha data de nascimento, altura, peso e selecione o sexo.';
      return;
    }
    var idade = ageFromBirthdate(nasc);
    if(idade < 0 || idade > 110){ msg.textContent = 'Data de nascimento inválida.'; return; }
    msg.textContent = '';

    var alturaM = altura/100;
    var imc = peso/(alturaM*alturaM);
    var tmb = sexoSel==='M'
      ? 10*peso + 6.25*altura - 5*idade + 5
      : 10*peso + 6.25*altura - 5*idade - 161;

    lastResult = {idade:idade, altura:altura, peso:peso, genero:sexoSel, imc:imc, tmb:tmb};
    saveVisitorLocal(lastResult);
    renderResult();
    showTab('result');
    document.getElementById('visit-form').reset();
    document.querySelectorAll('#f-sexo button').forEach(function(b){ b.classList.remove('sel'); });
    sexoSel = null;
  });

  /* ================= PÁGINA 3 — RESULTADOS ================= */
  function renderResult(){
    if(!lastResult){
      document.getElementById('r-empty').style.display = '';
      document.getElementById('r-content').style.display = 'none';
      document.getElementById('r-sub').textContent = 'Preencha a aba anterior para ver seus resultados aqui.';
      return;
    }
    document.getElementById('r-empty').style.display = 'none';
    document.getElementById('r-content').style.display = '';
    document.getElementById('r-sub').textContent = 'Calculado a partir dos dados que você informou — nada foi enviado para fora deste navegador.';

    var r = lastResult;
    document.getElementById('r-idade').textContent = r.idade+' anos';
    document.getElementById('r-altura').textContent = fmt(r.altura,1)+' cm';
    document.getElementById('r-peso').textContent = fmt(r.peso,1)+' kg';
    document.getElementById('r-sexo').textContent = r.genero==='M' ? 'Masculino' : 'Feminino';

    var band = classifyIMC(r.imc);
    document.getElementById('r-imc').textContent = fmt(r.imc,1);
    var classEl = document.getElementById('r-imc-class');
    classEl.textContent = band.label;
    classEl.style.background = band.color.replace('var(--teal)','var(--teal-soft)').indexOf('soft')>-1?band.color:'';
    classEl.style.color = '#fff'; classEl.style.background = band.color;

    /* gauge band 14..40 */
    var lo=14, hi=40;
    var stops = [18.5,25,30,35,40];
    var prevPct = 0;
    var segs = [];
    var colors = [
      'var(--imc-under)',
      'var(--imc-normal)',
      'var(--imc-over)',
      'var(--imc-ob1)',
      'var(--imc-ob2)',
      'var(--imc-ob3)'
    ];
    var bounds = [lo].concat(stops).concat([hi]);
    for(var i=0;i<bounds.length-1;i++){
      var w = (Math.min(bounds[i+1],hi)-bounds[i])/(hi-lo)*100;
      if(w<=0) continue;
      segs.push(
        '<div style="width:'+w+'%;background:'+colors[Math.min(i,colors.length-1)]+';box-shadow:inset -2px 0 0 rgba(252,252,251,.72)"></div>'
      );
    }
    document.getElementById('r-band').innerHTML = segs.join('');
    var pct = Math.max(0,Math.min(1,(r.imc-lo)/(hi-lo)))*100;
    document.getElementById('r-marker').innerHTML = '<div class="tri" style="left:'+pct+'%"></div>';

    document.getElementById('r-tmb').textContent = fmt(r.tmb,0);

    /* dados gerais da turma (mesmos agregados da aba 1) */
    document.getElementById('r-turma-cards').innerHTML =
      '<div class="card" style="--accent:var(--teal)"><span class="num stat-value">'+TURMA.length+'</span><span class="stat-unit">alunos</span><div class="stat-label">Participantes</div></div>' +
      '<div class="card" style="--accent:var(--teal)"><span class="num stat-value">'+fmt(mean(TURMA.map(function(d){return d.altura;})),1)+'</span><span class="stat-unit">cm</span><div class="stat-label">Altura média</div></div>' +
      '<div class="card" style="--accent:var(--amber)"><span class="num stat-value">'+fmt(mean(TURMA.map(function(d){return d.peso;})),1)+'</span><span class="stat-unit">kg</span><div class="stat-label">Peso médio</div></div>' +
      '<div class="card" style="--accent:var(--amber)"><span class="num stat-value">'+fmt(mean(TURMA.map(function(d){return d.imc;})),1)+'</span><span class="stat-unit"></span><div class="stat-label">IMC médio</div></div>' +
      '<div class="card" style="--accent:var(--brick)"><span class="num stat-value">'+fmt(mean(TURMA.map(function(d){return d.tmb;})),0)+'</span><span class="stat-unit">kcal</span><div class="stat-label">TMB média</div></div>';

    /* comparison vs turma */
    var turmaAvg = {
      altura: mean(TURMA.map(function(d){return d.altura;})),
      peso: mean(TURMA.map(function(d){return d.peso;})),
      imc: mean(TURMA.map(function(d){return d.imc;})),
      tmb: mean(TURMA.map(function(d){return d.tmb;}))
    };
    var cmpDefs = [
      {k:'altura', label:'Altura', unit:'cm', d:1},
      {k:'peso', label:'Peso', unit:'kg', d:1},
      {k:'imc', label:'IMC', unit:'', d:1},
      {k:'tmb', label:'TMB', unit:'kcal', d:0}
    ];
    document.getElementById('r-cmp').innerHTML = cmpDefs.map(function(c){
      var you = r[c.k], cls = turmaAvg[c.k];
      var max = Math.max(you,cls)*1.15;
      return '<div class="cmp-card"><div class="cmp-label">'+c.label+' ('+c.unit+')</div><div class="cmp-bars">'+
        '<div class="cmp-line"><span>Você</span><div class="cmp-track"><div class="cmp-fill" style="width:'+(you/max*100)+'%;background:var(--teal)"></div></div><span>'+fmt(you,c.d)+'</span></div>'+
        '<div class="cmp-line"><span>Turma</span><div class="cmp-track"><div class="cmp-fill" style="width:'+(cls/max*100)+'%;background:var(--ink-soft)"></div></div><span>'+fmt(cls,c.d)+'</span></div>'+
        '</div></div>';
    }).join('');

    renderVisitorStats();
  }

  /* ---------- visitor local storage (this browser only, no PII) ---------- */
  var LS_KEY = 'ppi_visitantes_anon_v1';
  function loadVisitors(){
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch(e){ return []; }
  }
  function saveVisitorLocal(r){
    try {
      var list = loadVisitors();
      list.push({idade:r.idade, altura:r.altura, peso:r.peso, genero:r.genero, imc:Math.round(r.imc*100)/100, tmb:Math.round(r.tmb)});
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch(e){ /* storage indisponível — segue sem persistir */ }
  }
  function renderVisitorStats(){
    var list = loadVisitors();
    var el = document.getElementById('r-visitor-stats');
    if(!list.length){ el.innerHTML = '<span class="vs">Nenhum cálculo anterior neste navegador.</span>'; return; }
    el.innerHTML =
      '<span class="vs"><b>'+list.length+'</b> cálculos</span>'+
      '<span class="vs">IMC médio <b>'+fmt(mean(list.map(function(v){return v.imc;})),1)+'</b></span>'+
      '<span class="vs">TMB média <b>'+fmt(mean(list.map(function(v){return v.tmb;})),0)+'</b> kcal</span>';
  }
  document.getElementById('r-clear').addEventListener('click', function(){
    try { localStorage.removeItem(LS_KEY); } catch(e){}
    renderVisitorStats();
  });

  renderResult();
})();