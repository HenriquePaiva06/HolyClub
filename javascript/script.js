/* ==========================================================================
   AGUARDA O CARREGAMENTO COMPLETO DO HTML ANTES DE EXECUTAR O JS
   ========================================================================== */
window.addEventListener('DOMContentLoaded', (event) => {
  /* ==========================================================================
       FONTE DE DADOS DAS CÉLULAS
       ========================================================================== */
  const celulasData = [
    {
      id: 1,
      nome: 'Priests',
      lider: 'Ana Clara',
      telefone: '11 95224-3776',
      instagramUser: '@priests.rlvb',
      instagramLink: 'https://www.instagram.com/priests.rlvb/',
      foto: 'img/priests.jpeg',
      paginaDetalhes: 'celula-priests.html',
      dia: 'Sábado'
    },
    {
      id: 2,
      nome: 'HopeLand',
      lider: 'Rodrigo',
      telefone: '11 99005-7554',
      instagramUser: '@hopeland.vb',
      instagramLink: 'https://www.instagram.com/hopeland.vb/',
      foto: 'img/hopeland.jpeg',
      paginaDetalhes: 'celula-hopeland.html',
      dia: 'Sábado'
    },
    {
      id: 3,
      nome: 'Burning House',
      lider: 'Jhow',
      telefone: '11 96126-4316',
      instagramUser: '@burninghouse.nc',
      instagramLink: 'https://www.instagram.com/burninghouse.nc/',
      foto: 'img/burninghouse.jpeg',
      paginaDetalhes: 'celula-burninghouse.html',
      dia: 'Sábado'
    }
  ];

  const eventosData = [
    {
      id: 1, // <-- A VÍRGULA FOI ADICIONADA AQUI
      data: '2025-07-11',
      titulo: 'Encontro com Deus',
      horario: '19:00',
      descricao: 'Um encontro especial para voce conhecer o amor de Deus.'
    },
    {
      id: 2,
      data: '2025-07-19',
      titulo: 'Batismo em Águas',
      horario: '18:00',
      descricao: 'Venha celebrar as novas vidas entregues para Jesus.'
    },
    {
      id: 3,
      data: '2025-07-25',
      titulo: 'Noite de Louvor',
      horario: '19:00',
      descricao: 'Uma noite dedicada ao louvor e adoração.'
    }
  ];

  /* ==========================================================================
       LÓGICA DO SMOOTH SCROLL (ROLAGEM SUAVE)
       ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /* ==========================================================================
       LÓGICA DO STICKY HEADER
       ========================================================================== */
  const navMenu = document.querySelector('.menu-principal');
  if (navMenu) {
    // Verifica se o menu existe antes de rodar
    const stickyOffset = navMenu.offsetTop;
    const navHeight = navMenu.offsetHeight;

    function handleScroll() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition >= stickyOffset) {
        navMenu.classList.add('sticky');
        document.body.style.paddingTop = navHeight + 'px';
      } else {
        navMenu.classList.remove('sticky');
        document.body.style.paddingTop = '0';
      }
    }
    window.onscroll = () => handleScroll();
  }

  /* ==========================================================================
       LÓGICA DA GALERIA LIGHTBOX
       ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  function abrirLightbox(imageUrl) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = imageUrl;
      lightbox.style.display = 'flex';
    }
  }

  function fecharLightbox() {
    if (lightbox) {
      lightbox.style.display = 'none';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', fecharLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        fecharLightbox();
      }
    });
  }

  /* ==========================================================================
       LÓGICA DO FILTRO E RENDERIZAÇÃO DAS CÉLULAS
       ========================================================================== */
  const celulasContainer = document.querySelector('.celulas-container');
  const filtroBtns = document.querySelectorAll('.filtro-btn');

  function renderizarCelulas(arrayDeCelulas) {
    if (!celulasContainer) return; // Se o container não existir, para a função

    celulasContainer.innerHTML = '';
    arrayDeCelulas.forEach((celula) => {
      const cardHtml = `
                <div class="celula reveal">
                    <img class="foto-celula imagem-galeria" src="${celula.foto}" alt="Foto da Célula ${celula.nome}">
                    <div class="conteudo-celula">
                        <div class="titulo-bloco">
                            <h3>${celula.nome}</h3>
                        </div>
                        <div class="info-contato">
                            <p><i class="fa-solid fa-user"></i> <span>${celula.lider}</span></p>
                            <p><i class="fa-solid fa-phone"></i> <span>${celula.telefone}</span></p>
                        </div>
                        <a href="${celula.instagramLink}" target="_blank" class="link-instagram">
                            <i class="fa-brands fa-instagram"></i> <span>${celula.instagramUser}</span>
                        </a>
                    </div>
                    <a href="${celula.paginaDetalhes}" class="botao-vejamais">Veja Mais</a>
                </div>
            `;
      celulasContainer.innerHTML += cardHtml;
    });

    // RECONECTA OS EVENTOS E ANIMAÇÕES NOS CARDS RECÉM-CRIADOS
    conectarEventosGaleria();
    conectarObservadorScroll();
  }

  filtroBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filtro = btn.dataset.filtro;

      if (filtro === 'Todos') {
        renderizarCelulas(celulasData);
      } else {
        const celulasFiltradas = celulasData.filter(
          (celula) => celula.dia === filtro
        );
        renderizarCelulas(celulasFiltradas);
      }
    });
  });

  /* ==========================================================================
       LÓGICA DO SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
       ========================================================================== */
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  function conectarObservadorScroll() {
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((element) => {
      observer.observe(element);
    });
  }

  /* ==========================================================================
       FUNÇÃO PARA CONECTAR EVENTOS NOS ITENS DINÂMICOS
       ========================================================================== */
  function conectarEventosGaleria() {
    const galleryImages = document.querySelectorAll('.imagem-galeria');
    galleryImages.forEach((image) => {
      image.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique se propague para outros elementos
        abrirLightbox(image.src);
      });
    });
  }

  // INICIALIZAÇÃO: Renderiza as células e conecta todos os eventos na primeira carga
  renderizarCelulas(celulasData);

  // ==========================================================================
  // LÓGICA DO CALENDÁRIO
  // ==========================================================================
  const mesAnoTitulo = document.getElementById('mes-ano-titulo');
  const diasGrid = document.getElementById('dias-grid');

  // Guarda a data atual. new Date() sem argumentos pega o dia e hora de hoje.
  let dataAtual = new Date();

  function renderizarCalendario() {
    dataAtual.setDate(1);

    const primeiroDiaIndex = dataAtual.getDay();
    const ultimoDiaDoMesAnterior = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      0
    ).getDate();
    const ultimoDiaIndex = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() + 1,
      0
    ).getDay();
    const diasProximoMes = 7 - ultimoDiaIndex - 1;
    const diasNoMes = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() + 1,
      0
    ).getDate();

    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    mesAnoTitulo.innerHTML = `${
      meses[dataAtual.getMonth()]
    } ${dataAtual.getFullYear()}`;

    diasGrid.innerHTML = '';

    for (let i = primeiroDiaIndex; i > 0; i--) {
      diasGrid.innerHTML += `<div class="dia-vazio"></div>`;
    }

    // Loop principal de renderização dos dias
    for (let i = 1; i <= diasNoMes; i++) {
      let classes = '';
      // Verifica se é o dia de hoje
      if (
        i === new Date().getDate() &&
        dataAtual.getMonth() === new Date().getMonth() &&
        dataAtual.getFullYear() === new Date().getFullYear()
      ) {
        classes += ' hoje';
      }

      // VERIFICA SE EXISTE UM EVENTO NESTE DIA
      const dataFormatada = `${dataAtual.getFullYear()}-${String(
        dataAtual.getMonth() + 1
      ).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const eventoDoDia = eventosData.find(
        (evento) => evento.data === dataFormatada
      );

      if (eventoDoDia) {
        classes += ' dia-com-evento';
        diasGrid.innerHTML += `<div class="${classes.trim()}" data-evento-id="${
          eventoDoDia.id
        }">${i}</div>`;
      } else {
        diasGrid.innerHTML += `<div class="${classes.trim()}">${i}</div>`;
      }
    }

    for (let i = 1; i <= diasProximoMes; i++) {
      diasGrid.innerHTML += `<div class="dia-vazio"></div>`;
    }

    // Conecta os eventos de clique nos dias recém-criados
    conectarEventosCalendario();
  }

  function mostrarDetalhesDoEvento(eventoId) {
    const evento = eventosData.find((e) => e.id == eventoId);
    const containerDetalhes = document.getElementById(
      'detalhes-evento-container'
    );

    if (evento) {
      containerDetalhes.innerHTML = `
            <h3>${evento.titulo}</h3>
            <p><strong>Horário:</strong> ${evento.horario}</p>
            <p>${evento.descricao}</p>
        `;
    }
  }

  function conectarEventosCalendario() {
    const diasComEvento = document.querySelectorAll('.dia-com-evento');
    diasComEvento.forEach((dia) => {
      dia.addEventListener('click', (e) => {
        // Remove a classe 'ativo' de qualquer outro dia que a tenha
        document
          .querySelectorAll('.dia-ativo')
          .forEach((d) => d.classList.remove('dia-ativo'));
        // Adiciona a classe 'ativo' ao dia clicado
        e.currentTarget.classList.add('dia-ativo');

        const eventoId = e.currentTarget.dataset.eventoId;
        mostrarDetalhesDoEvento(eventoId);
      });
    });
  }

  // Lógica para os botões de navegação do calendário
  document.getElementById('mes-anterior').addEventListener('click', () => {
    // Subtrai um mês da data atual
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    // Re-renderiza o calendário com a nova data
    renderizarCalendario();
  });

  document.getElementById('mes-seguinte').addEventListener('click', () => {
    // Adiciona um mês à data atual
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    // Re-renderiza o calendário com a nova data
    renderizarCalendario();
  });

  // ===================================================================

  // Renderiza o calendário pela primeira vez quando a página carrega
  renderizarCalendario();
}); // FIM DO DOMCONTENTLOADED
