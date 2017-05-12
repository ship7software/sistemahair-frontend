import Vue from 'vue'

Vue.prototype.$siteConfig = {
  color: 'blue-light',
  logo: '/static/img/logo_lottusflower_WHITE.png',
  conditionalLogo: {
    black: '/static/img/logo_lottusflower.png',
    'black-light': '/static/img/logo_lottusflower.png',
    default: '/static/img/logo_lottusflower_WHITE.png'
  },
  name: 'Sistema <b>HAIR</b',
  menus: [
    { title: 'Início', icon: 'home', to: '/' },
    { title: 'Agenda', icon: 'calendar', to: '/agenda' },
    {
      title: 'Vendas',
      icon: 'shopping-cart',
      menus: [
        { title: 'Comanda', icon: 'file-text', to: '/venda/comanda' },
        { title: 'Pacote', icon: 'cubes', to: '/venda/pacote' }
      ],
      to: '#'
    },
    {
      title: 'Cadastros',
      icon: 'edit',
      menus: [
        { title: 'Clientes', icon: 'users', to: '/cliente' },
        { title: 'Formas de Pagamento', icon: 'money', to: '/formaPagamento' },
        { title: 'Fornecedores', icon: 'users', to: '/fornecedor' },
        { title: 'Produtos', icon: 'cube', to: '/produto' },
        { title: 'Serviços', icon: 'tag', to: '/servico' },
        { title: 'Profissionais', icon: 'male', to: '/profissional' },
        { title: 'Contas', icon: 'bank', to: '/conta' },
        { title: 'Pacotes', icon: 'cubes', to: '/pacote' },
        { title: 'Categorias de Receitas/Despesas', icon: 'list', to: '/categoria' }
      ],
      to: '#'
    },
    {
      title: 'Financeiro',
      icon: 'dollar',
      menus: [
        { title: 'Fluxo de Caixa', icon: 'line-chart', to: '/financeiro' },
        { title: 'Entrada', icon: 'arrow-down', to: '/financeiro/saida' },
        { title: 'Saída', icon: 'arrow-up', to: '/financeiro/entrada' }
      ],
      to: '#'
    },
    { title: 'Compras', icon: 'briefcase', to: '/compra' },
    { title: 'Relatórios', icon: 'print', to: '#' },
    { title: 'Configurações', icon: 'gear', to: '/configuracao' }
  ],
  services: {
    user: '/usuario/perfil',
    message: '/mensagens/resumo'
  }
}
