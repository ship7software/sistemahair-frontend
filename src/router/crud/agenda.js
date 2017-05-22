export default {
  apiUrl: '/agendamento',
  route: '/agendamento',
  form: {
    title: 'Agendamento',
    fields: [
      {
        title: 'Cliente',
        model: 'clienteId',
        type: 'autocomplete',
        api: '/cliente',
        optionValue: '_id',
        optionText: 'nome',
        payload: {
          sort: {
            nome: 1
          },
          ativo: true
        },
        validation: 'required'
      },
      {
        title: 'Profissional',
        model: 'profissionalId',
        type: 'select',
        api: '/profissional',
        optionValue: '_id',
        optionText: 'nome',
        payload: {
          sort: {
            nome: 1
          },
          ativo: true
        },
        validation: 'required'
      },
      {
        title: 'Serviço',
        model: 'servicoId',
        type: 'select',
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
