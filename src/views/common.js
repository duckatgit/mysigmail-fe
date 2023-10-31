export async function getSignDetails () {
  try {
    const baseURL = process.env.VUE_APP_API_BASE_URL
    const userId = localStorage.getItem('userId')
    const URL = `${baseURL}/signature/get-sign-details/${userId}`

    const response = await fetch(URL)
    if (response.status === 200) {
      const result = await response.json()
      this.imageUrl = result.data.imgURL
    } else {
      console.error('An error occurred:')
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
