document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // Impedir o envio padrão do formulário
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Seleciona o botão usando o seletor correto
    const buttonForm = document.querySelector("[data_form_button]");

    // Função que adiciona a imagem de carregamento ao botão
    const addLoad = () => {
      buttonForm.innerHTML = renderButton.image;
    };

    // Função que remove a imagem de carregamento e retorna o texto original
    const removedLoad = () => {
      buttonForm.innerHTML = renderButton.message;
    };

    // Criar a URL do WhatsApp com os dados do formulário
    const urlStr = `https://wa.me/5547999327137?text=${encodeURIComponent(`Olá, estou retornando a API-Produtos:\n
        Meu Nome: ${name}\n
        E-mail: ${email}\n
        Mensagem: ${message}!`)}`;

    // Adiciona o spinner ao botão
    addLoad();

    setTimeout(() => {
      // Remove o spinner e volta ao texto original
      buttonForm.innerHTML = renderButton.message;
      if (window.innerWidth > 768) {
        // Para telas maiores que 768px, abrir em uma nova aba
        window.open(urlStr, "_blank");
      } else {
        // Para telas menores, abrir na mesma aba
        window.open(urlStr, "_self");
      }
    }, 2000);
  });

// Renderização do botão de envio com a animação de carregamento
const renderButton = {
  image:
    '<img class="footer__button--animation" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWI0azVpZzY1YzJqMDlxNjFlZHNhNmE0aGQ3dnhic2h4eGY2dmdhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif" alt="Loading">',
  message: "SEND MESSAGE",
};
