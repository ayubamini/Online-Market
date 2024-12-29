const alert = (type, message) => {

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)

        // remove alert after 3 seconds
        setTimeout(()=>{
            const closeBtn = alertPlaceholder.getElementsByClassName('btn-close');
            if (closeBtn.length !== 0)
                closeBtn[0].click();
        }, 3000)
    }

    appendAlert(message, type);
}

export { alert };