<script>
  document.addEventListener('DOMContentLoaded', function () {
    // Função para adicionar ao carrinho
    function adicionarAoCarrinho(produto) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      alert(`${produto.nome} foi adicionado ao carrinho!`);
    }

    // Aplicar eventos a cada produto
    document.querySelectorAll('.produto-card').forEach(card => {
      const img = card.querySelector('img');
      if (!img) return;

      const nome = img.dataset.nome;
      const preco = parseFloat(img.dataset.preco);
      const src = img.src;

      const produto = { nome, preco, imagem: src };

      const botaoAdicionar = card.querySelector('.btn-adicionar');
      const botaoComprar = card.querySelector('.btn-comprar');

      if (botaoAdicionar) {
        botaoAdicionar.addEventListener('click', () => {
          adicionarAoCarrinho(produto);
        });
      }

      if (botaoComprar) {
        botaoComprar.addEventListener('click', () => {
          alert(`Compra iniciada para "${nome}" no valor de ${preco} MZN`);
          localStorage.setItem('compra_finalizada', JSON.stringify(produto));
          window.location.href = 'pagamento.html';
        });
      }
    });

    // Mostrar conteúdo do carrinho ao pressionar 'c'
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'c') {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (carrinho.length === 0) {
          alert('Seu carrinho está vazio.');
        } else {
          let mensagem = '🛒 Produtos no carrinho:\n\n';
          let total = 0;
          carrinho.forEach((item, i) => {
            mensagem += `${i + 1}. ${item.nome} - ${item.preco} MZN\n`;
            total += item.preco;
          });
          mensagem += `\nTotal: ${total} MZN`;
          alert(mensagem);
        }
      }
    });

    // Lógica para exibir/esconder seções ao clicar nos menus
    const linkContato = document.querySelector('a[href="#contato"]');
    const linkInicio = document.querySelector('a[href="#"]');
    const secaoProdutos = document.getElementById('produtos');
    const secaoHero = document.querySelector('.hero');
    const secaoContato = document.getElementById('contato');

    if (linkContato && secaoContato && secaoProdutos && secaoHero) {
      linkContato.addEventListener('click', function (e) {
        e.preventDefault();
        secaoProdutos.style.display = 'none';
        secaoHero.style.display = 'none';
        secaoContato.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (linkInicio) {
      linkInicio.addEventListener('click', function (e) {
        e.preventDefault();
        secaoProdutos.style.display = 'block';
        secaoHero.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
</script>
