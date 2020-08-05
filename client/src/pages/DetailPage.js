import React from 'react'

export const DetailPage = () => {
    return (
        <div className="row">
            <form className="col s12" style={{marginTop: '2%'}}>
            <div className="row">
                <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label htmlFor="textarea1">Введите название книги...</label>
                </div>
            </div>
            </form>
        </div>
    )
}