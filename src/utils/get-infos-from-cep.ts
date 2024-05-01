import axios from 'axios'

interface IInfosCEP {
  city: string
  state: string
}

export async function getInfosFromCEP(cep: string): Promise<IInfosCEP | null> {
  const infos = axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resp) => {
      const info: IInfosCEP = {
        city: resp.data.localidade,
        state: resp.data.uf,
      }

      return info
    })
    .catch(() => {
      return null
    })

  return infos
}
