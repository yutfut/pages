import React from "react";
import { useState } from 'react';
import Collapsible from "../components/Collapsible";
import {BordaDescription} from "../methodDescriptions/BordaDescription";
import ReactDOM from 'react-dom';


export const Theory = () => {

    const [selected, setSelected] = useState(null);

    const toggle = (i: any) =>
    {
            if (selected === i) {
                return setSelected(null)
            }
            setSelected(i)
    }

    return (
        <div>
            <h2>Теория</h2>
                <p className="lead" >
                    На данной странице содержатся теоретические сведения о различных методах
                    принятия решения, которые доступны для интерактивного изучения на главной
                    странице веб-приложения
                </p>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className={ (selected === 1) ? "accordion-button open" : "accordion-button collapsed" }
                                onClick={()=>  toggle((1)) }
                                type="button" aria-expanded="true" aria-controls="collapseOne">
                            Проверка на Парето-оптимальность
                        </button>
                    </h2>

                    <div id="collapseOne"
                         className={ (selected === 1) ? "accordion-collapse" : "accordion-collapse" }
                         style = {(selected === 1) ?
                             {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                             :
                             {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                         }
                         aria-expanded={ (selected === 1) }
                         aria-labelledby="headingOne"
                    >
                        <div className="accordion-body">
                            Проверка парето-оптимальности предназначена для поиска заведомо неудачных
                            вариантов. Варианты сравнивают попарно между собой, и если обнаруживается,
                            что в паре один вариант уступает другому по всем критериям, то этот вариант
                            считается неоптимальным, и его рекомендуется не рассматривать при принятии решения.
                        </div>
                    </div>
                </div>


                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 2) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={()=>  toggle((2)) }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом базового критерия
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 2) ? "accordion-collapse" : "accordion-collapse" }
                             style = {(selected === 2) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                             }
                             aria-expanded={ (selected === 2) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                Один или несколько критериев определяются как базовые - с весом, равным единице,
                                а вес остальных назначаются в зависимости от того, во сколько раз они важнее
                                базового. После чего вычисляется сумма весов. Итоговое значение базовых критериев
                                будет равно единице, деленной на полученную сумму, остальные же получат значение,
                                большее значения базового в то количество раз, которое было определено на прошлом этапе
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 3) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={()=>  toggle((3)) }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом бальной оценки
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 3) ? "accordion-collapse" : "accordion-collapse" }
                             style = {(selected === 3) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                             }
                             aria-expanded={ (selected === 3) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                мяу епт
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 4) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   toggle(4)     }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом парного сравнения критериев
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 4) ? "accordion" : "accordion-collapse" }
                             style = {(selected === 4) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                             }
                             aria-expanded={ (selected === 4) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                мяу епт
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 5) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={()=>  toggle((5)) }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Прямой метод принятия решений процедурой Борда
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 5) ? "accordion-collapse" : "accordion-collapse" }
                             style = {(selected === 5) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                        }
                             aria-expanded={ (selected === 5) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                мяу епт
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 6) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={()=>  toggle((6)) }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Прямой метод принятия решений процедурой Нансона
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 6) ? "accordion-collapse" : "accordion-collapse" }
                             style = {(selected === 6) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                             }
                             aria-expanded={ (selected === 6) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                мяу епт
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className={ (selected === 7) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={()=>  toggle((7)) }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Принятие решений с использованием интегрального критерия взвешенной суммы показателей сравнения
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (selected === 7) ? "accordion-collapse" : "accordion-collapse" }
                             style = {(selected === 7) ?
                                 {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
                                 :
                                 {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}
                             }
                             aria-expanded={ (selected === 7) }
                             aria-labelledby="headingOne"
                        >
                            <div className="accordion-body">
                                мяу епт
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}
