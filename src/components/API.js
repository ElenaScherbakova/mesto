class Api {
    constructor(options) {
        this.options = options
        this._getJSON = (res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(`Ошибка: ${res.status}`)
            }
        }
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`,
            {
                headers: this.options.headers
            } ).then(this._getJSON)
    }

    createNewCard(name, link) {
        return  fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({ name, link })
        }).then(this._getJSON)
    }

    removeCard(cardId) {
        return  fetch(`${this.options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.options.headers
        }).then(this._getJSON)
    }

    getUser() {
       return fetch(`${this.options.baseUrl}/users/me`,
           {
               method: 'POST',
               headers: this.options.headers
           } ).then(this._getJSON)

    }

    updateUser(name, about) {
       return  fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({ name, about })
        }).then(this._getJSON)
    }

    likeCard(cardID, isLike) {
        return  fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
            method : isLike
                ? 'PUT'
                : 'DELETE',
            headers: this.options.headers
        }).then(this._getJSON)
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
    headers: {
        authorization: '85969927-1936-42af-ae85-85e777a25d0e',
        'Content-Type': 'application/json'
    }
})
    export default api