export default {
  apiUrl: '/pacote',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Pacote'
  ],
  search: {
    pageTitle: 'Pacotes',
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
      editUrl: '/pacote/',
      descriptionField: 'descricao'
    },
    sort: {
      descricao: 1
    },
    filterFieldTitle: 'Descrição',
    filterFieldModel: 'descricao'
  },
  route: '/pacote',
  descriptionField: 'descricao'
}
