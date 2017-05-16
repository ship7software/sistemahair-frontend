export default {
  apiUrl: '/servico',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Serviço'
  ],
  search: {
    pageTitle: 'Serviços',
    table: {
      fields: [
        { model: 'descricao', header: 'Descrição' }
      ],
      canEdit: true,
      canDelete: true,
      hasActivate: true,
      editUrl: '/servico/',
      descriptionField: 'descricao'
    },
    sort: {
      descricao: 1
    },
    filterFieldTitle: 'Descrição',
    filterFieldModel: 'descricao'
  },
  form: {
    title: 'Cadastro de Serviços',
    fields: [
      { title: 'Descrição', model: 'descricao', validation: 'required' },
      { title: 'Preço', model: 'preco', type: 'money', min: 0 },
      { title: 'Comissão', model: 'comissao', type: 'money', min: 0 },
      {
        title: 'Duração',
        model: 'duracaoPadrao',
        type: 'select',
        options: [
          { value: '', text: 'Selecione' },
          { value: 15, text: '15m' },
          { value: 30, text: '30m' },
          { value: 45, text: '45m' },
          { value: 60, text: '1h' },
          { value: 90, text: '1h 30m' },
          { value: 120, text: '2h' },
          { value: 150, text: '2h 30m' },
          { value: 180, text: '3h' },
          { value: 210, text: '3h 30m' },
          { value: 240, text: '4h' },
          { value: 270, text: '4h 30m' },
          { value: 300, text: '5h' },
          { value: 330, text: '5h 30m' },
          { value: 360, text: '6h' },
          { value: 390, text: '6h 30m' },
          { value: 420, text: '7h' },
          { value: 450, text: '7h 30m' },
          { value: 480, text: '8h' }
        ],
        validation: 'required'
      }
    ]
  },
  route: '/servico',
  descriptionField: 'descricao'
}
