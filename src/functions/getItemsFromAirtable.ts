interface AirTableAPIResponse {
  records: {
    id: string
    fields: {
      ID: number
      Name: string
      Quantity: number
      Check: boolean
    }
    createdTime: string
  }[]
}

export const getItemsFromAirtable = async () =>
  fetch('/airtable/v0/appIcrQIg6AqeJDtm/Prize%20Inventory', {
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
  }).then(o => {
    if (o.ok) return o.json() as Promise<AirTableAPIResponse>
    else throw o
  })
