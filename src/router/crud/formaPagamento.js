export default {
  apiUrl: '/formaPagamento',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Forma de Pagamento'
  ],
  search: {
    pageTitle: 'Formas de Pagamento',
    table: {
      fields: [
        {
          model: 'nome',
          header: 'Nome'
        }
      ],
      canEdit: true,
      canDelete: true,
      hasActivate: true,
      editUrl: '/formaPagamento/',
      descriptionField: 'nome'
    },
    sort: {
      nome: 1
    },
    filterFieldTitle: 'Nome',
    filterFieldModel: 'nome'
  },
  form: {
    title: 'Cadastro de Forma de Pagamento',
    fields: [
      { title: 'Nome', model: 'nome', required: true },
      { title: 'Taxa (%)', model: 'taxa', type: 'money', min: 0 },
      { title: 'Prazo Recebimento (dias)', model: 'prazoRecebimento', type: 'integer', min: 0 },
      {
        title: 'Tipo de Baixa',
        model: 'tipoBaixa',
        type: 'select',
        options: [
          { value: 'M', text: 'Manual' },
          { value: 'A', text: 'Automática' }
        ]
      },
      {
        title: 'Conta',
        model: 'contaId',
        type: 'select',
        api: '/conta',
        payload: {
          sort: {
            nome: 1
          },
          ativo: true
        }
      }
    ]
  },
  route: '/formaPagamento',
  descriptionField: 'nome'
}
