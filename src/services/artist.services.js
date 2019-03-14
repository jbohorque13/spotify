import axios from 'axios'

export const getArtists = async () => {
  const response = await axios({
    url: 'https://s3-us-west-2.amazonaws.com/io.underscope.exercises/artist-list.json',
    method: 'get'
  })
  return response.data
}
