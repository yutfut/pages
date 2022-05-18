import React from "react";

export const New_Theory = () => {
    return (
        <div>
            <a href="#multiCollapse1" data-toggle="#collapse" aria-controls="multiCollapse1"
               role="button" aria-expanded="false" className="btn btn-secondary">Кнопка 1</a>
            <button className="btn btn-secondary" type="button" formTarget="#multiCollapse2" aria-expanded="false"
                    aria-controls="multiCollapse2" data-toggle="#collapse"> Кнопка 2</button>
            <button className="btn btn-secondary" type="button" formTarget="#multiCollapse" aria-expanded="false"
                    aria-controls="multiCollapse1 multiCollapse2" data-toggle="#collapse"> Кнопка 3</button>

            <div className="#collapse show" id="multiCollapse1">
                fsdfsdfsdf
            </div>
            <div className="#collapse show" id="multiCollapse2">
                adfsdasda
            </div>
            <div className="#collapse show" id="multiCollapse1">
                fsdfsdfsdf
            </div>
            <div className="#collapse show" id="multiCollapse2">
                fsdfsdfsdf
            </div>
        </div>
    )
}