// import PacoteForm from './../../modules/Cadastros/PacoteForm.vue'

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
  descriptionField: 'descricao',
  form: {
    title: 'Cadastro de Pacotes',
    fields: [
      { title: 'Descrição', model: 'descricao', validation: 'required' },
      { title: 'Preço', model: 'preco', type: 'money', min: 0 },
      { title: 'Data Início', model: 'dataInicio', type: 'date' },
      { title: 'Data Fim', model: 'dataFim', type: 'date' },
      {
        title: 'Produtos',
        model: 'produtos',
        type: 'detail',
        form: {
          fields: [
            { title: 'Quantidade', model: 'quantidade', type: 'integer', validation: 'required', width: '70' },
            {
              title: 'Produto',
              model: 'produtoId',
              type: 'autocomplete',
              api: '/produto',
              optionValue: '_id',
              optionText: 'descricao',
              payload: {
                sort: {
                  descricao: 1
                },
                ativo: true
              },
              validation: 'required'
            }
          ]
        }
      },
      {
        title: 'Serviços',
        model: 'servicos',
        type: 'detail',
        form: {
          fields: [
            { title: 'Quantidade', model: 'quantidade', type: 'integer', validation: 'required', width: '70' },
            {
              title: 'Serviço',
              model: 'servicoId',
              type: 'autocomplete',
              api: '/servico',
              optionValue: '_id',
              optionText: 'descricao',
              payload: {
                sort: {
                  descricao: 1
                },
                ativo: true
              },
              validation: 'required'
            }
          ]
        }
      }
    ]
  }
}
