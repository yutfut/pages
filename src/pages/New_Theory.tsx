import React from "react";
import { useState } from 'react';
import ReactDOM from 'react-dom';

export const New_Theory = () => {
    const [count, setCount] = useState(0);
    const [collapse, changeCollapse] = useState(0)
    return (
        <div>
            <a href="" data-toggle="collapse" aria-controls="multiCollapse1"
               role="button" aria-expanded="false" className="btn btn-secondary">Кнопка обновляющая страницу</a>
            <button className="btn btn-secondary" onClick={() => changeCollapse(count + 1)} type="button"
                    formTarget="#multiCollapse2" aria-expanded="false"
                    aria-controls="multiCollapse2" data-toggle="#collapse"> Кнопка 2</button>
            <button className="btn btn-secondary" type="button" formTarget="#multiCollapse" aria-expanded="false"
                    aria-controls="multiCollapse1 multiCollapse2" data-toggle="#collapse"> Кнопка 3</button>

            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                    aria-expanded="false" aria-controls="collapseExample">
                Button with data-target
            </button>

            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed
                    when the user activates the relevant trigger.
                </div>
            </div>

            <div className="collapse show" id="multiCollapse1">
                fsdfsdfsdf
            </div>
            <div className="collapse show" id="multiCollapse2">
                adfsdasda
            </div>
            <div className="collapse show" id="multiCollapse1">
                fsdfsdfsdf
            </div>
            <div className="collapse show" id="multiCollapse2">
                fsdfsdfsdf
            </div>

            <div>
                <p>Вы кликнули {count} раз</p>
                <button onClick={() => setCount(count + 1)}>
                    Нажми на меня
                </button>
            </div>

        </div>
    )
}