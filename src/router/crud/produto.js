export default {
  apiUrl: '/produto',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Produto'
  ],
  search: {
    pageTitle: 'Produtos',
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
      editUrl: '/produto/',
      descriptionField: 'descricao'
    },
    sort: {
      descricao: 1
    },
    filterFieldTitle: 'Descrição',
    filterFieldModel: 'descricao'
  },
  form: {
    title: 'Cadastro de Produto',
    fields: [
      { title: 'Descrição', model: 'descricao', required: true },
      { title: 'Preço', model: 'preco', type: 'money', min: 0 },
      { title: 'Custo', model: 'custo', type: 'money', min: 0 },
      { title: 'Estoque', model: 'estoque', type: 'integer', min: 0 },
      { title: 'Código de Barras', model: 'codigoBarra' }
    ]
  },
  route: '/produto',
  descriptionField: 'descricao'
}
