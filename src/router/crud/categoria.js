export default {
  apiUrl: '/categoria',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Categoria'
  ],
  search: {
    pageTitle: 'Categorias',
    table: {
      fields: [
        {
          model: 'descricao',
          header: 'Descrição'
        }
      ],
      canEdit: true,
      canDelete: true,
      hasActivate: true,
      editUrl: '/categoria/',
      descriptionField: 'descricao'
    },
    sort: {
      nome: 1
    },
    filterFieldTitle: 'Descrição',
    filterFieldModel: 'descricao'
  },
  form: {
    title: 'Cadastro de Categoria',
    fields: [
      { title: 'Descrição', model: 'descricao', required: true },
      {
        title: 'Tipo',
        model: 'tipo',
        type: 'select',
        required: true,
        options: [
          { value: '', text: 'Selecionar' },
          { value: 'C', text: 'Crédito' },
          { value: 'D', text: 'Débito' }
        ]
      }
    ]
  },
  route: '/categoria',
  descriptionField: 'descricao'
}
