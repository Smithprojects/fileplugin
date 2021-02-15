export function upload(selector, options = {}) {
    const input = document.querySelector(selector)

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Открыть'

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', open)


    const triggerInput = () => input.click()

    const changeHandler = event => {
        if (!event.target.files.length) {
            return
        }
        //es6
        // const {files} = event.target

        //приводим список к массиву
        const files = Array.from(event.target.files)

        files.forEach(file => {
            //не содержиться image не работаем с этим файлом
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()
            //данный обработчик ставим раньше передачи файла тк загрузка ассинхронна может выполниться раньше
            reader.onload = ev => {
                console.log(ev)
                console.log(ev)
            }

            reader.readAsDataURL(file)
        })



    }
    
    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)


}