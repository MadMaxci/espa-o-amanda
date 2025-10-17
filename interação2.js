class BobileNavbar {
    constructor(menumenor, menulist, menulinks){
        this.menumenor = document.querySelector(menumenor);
        this.menulist = document.querySelector(menulist);
        this.menulinks = document.querySelectorAll(menulinks);
        this.ativaClass= "ativa";

        this.handleClick = this.handleClick.bind(this);}

        animateLinks() {
            this.menulinks.forEach((hyperlinks, index) => {
                hyperlinks.style.animation
                ? (hyperlinks.style.animation="")
                : (hyperlinks.style.animation=`menulinksFade 0.6s ease forwards 
                ${index / 7 }s`);
                
            });
        }

        handleClick() {
            this.menulist.classList.toggle(this.ativaClass);
            this.menumenor.classList.toggle(this.ativaClass);
            this.animateLinks();
        }

        addClickEvent() {
            this.menumenor.addEventListener("click", this.handleClick);
        }

        init() {
            if(this.menumenor){
                this.addClickEvent();
            }
            return this;
        }
    }

const bobileNavbar = new BobileNavbar(
    ".navmenumenor",
    ".list",
    ".list li",
);
bobileNavbar.init();

/* fiquei dias testando fazer sair a mensagem "ola".
Note que o nome tem que ser exatamente o mesmo
citado primeiro em class na linha 1
e em "new" na linha 37, o que tem nome diferente
é o nome da constante ou "const".*/

/* 
código que muda o tamanho do container

  const container = document.querySelector(".container");
  const img = new Image();
  img.src = "fundobc.jpg";

  img.onload = () => {
    function ajustarAltura() {
      const proporcaoImg = img.width / img.height;
      const proporcaoTela = window.innerWidth / window.innerHeight;

      // Se a imagem "encaixa" pela largura → sobram bordas em cima/baixo
      if (proporcaoImg > proporcaoTela) {
        container.style.height = "90vh";
      } else {
        container.style.height = "150vh";
      }
    }

    ajustarAltura();
    window.addEventListener("resize", ajustarAltura);
  };


  */

  // ================== SISTEMA DE SOMA DE SERVIÇOS ==================

function initCart() {
  const STORAGE_KEY = 'oddsCartV1';
  const checkboxes = document.querySelectorAll('.valor-checkbox');
  const ValorDaConta = document.getElementById('ValorDaConta');
  const itensSomados = document.getElementById('itensSomados');

  if (!checkboxes.length) return; // Se não houver serviços na página

  checkboxes.forEach(cb => cb.addEventListener('change', updateCart));

  const cart = loadCart();
  renderCart(cart);

  // Marca os checkboxes salvos anteriormente
  checkboxes.forEach(checkbox => {
    const itemEncontrado = cart.items.some(item => item.id === checkbox.id);
    checkbox.checked = itemEncontrado;
  });

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { items: [] };
    } catch {
      return { items: [] };
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function renderCart(cart) {
    const retornaItens = cart?.items || [];

    if (retornaItens.length > 0) {
      itensSomados.innerHTML = `
        <span class="titulo-soma">Itens somados:</span><br>
        ${retornaItens.map(obj => obj.label).join('<br>')}
      `;
    } else {
      itensSomados.innerHTML = `
        <span class="titulo-soma">Itens somados:</span><br>
        Nenhum item selecionado.
      `;
    }

    const somaValues = retornaItens.reduce((total, item) => total + Number(item.value), 0);
    ValorDaConta.textContent = somaValues.toFixed(2);
  }

  function updateCart() {
    const ItensDeCheck = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => ({
        id: cb.id,
        label: cb.parentElement.textContent.trim(),
        value: cb.value
      }));

    const cart = { items: ItensDeCheck };
    saveCart(cart);
    renderCart(cart);
  }
}

initCart();
