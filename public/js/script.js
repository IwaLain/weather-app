const form = document.querySelector('form')
const input = document.querySelector('input')
const message = document.getElementById('forecast-message')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const place = input.value

    message.textContent = 'Loading...'

    fetch(`http://93.79.187.251:25565/weather?address=${place}`).then((response) => {
        response.json().then((data) => {
            if (data.forecast) {
                message.textContent = `[${data.place}] ${data.forecast}`
            }
            else {
                message.textContent = 'Something went wrong.'
            }
        })
    })
})
