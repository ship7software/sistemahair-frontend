export default {
  apiUrl: '/conta',
  breadcrumbs: [
    {
      text: 'Início',
      icon: 'home'
    },
    'Cadastros',
    'Conta'
  ],
  search: {
    pageTitle: 'Contas',
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
      editUrl: '/conta/',
      descriptionField: 'nome'
    },
    sort: {
      nome: 1
    },
    filterFieldTitle: 'Nome',
    filterFieldModel: 'nome'
  },
  form: {
    title: 'Cadastro de Conta',
    fields: [
      { title: 'Nome', model: 'nome', required: true }
    ]
  },
  route: '/conta',
  descriptionField: 'nome'
}
