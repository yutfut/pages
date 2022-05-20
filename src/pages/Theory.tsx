import React from "react";
import { useState } from 'react';
import Collapsible from "../components/Collapsible";
import {BordaDescription} from "../methodDescriptions/BordaDescription";
import ReactDOM from 'react-dom';


export const Theory = () => {

    const [isOpen, setIsOpen] = useState(0);

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
                        <button className={ (isOpen == 1) ? "accordion-button open" : "accordion-button collapsed" }
                                onClick={   ()=>   { if (isOpen == 1)
                                    setIsOpen(0)
                                    else setIsOpen(1)
                                                    }
                                        }
                                type="button" aria-expanded="true" aria-controls="collapseOne">
                            Проверка на Парето-оптимальность
                        </button>
                    </h2>

                    <div id="collapseOne"
                         className={ (isOpen == 1) ? "accordion-collapse show" : "accordion-collapse collapse" }
                         aria-expanded={ (isOpen == 1) }
                         aria-labelledby="headingOne"
                         style={(isOpen == 1) ? {
                             height: "auto"} : {height: "0px"}
                         }
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
                            <button className={ (isOpen == 2) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 2)
                                        setIsOpen(0)
                                    else setIsOpen(2)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом базового критерия
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 2) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 2) }
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
                            <button className={ (isOpen == 3) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 3)
                                        setIsOpen(0)
                                    else setIsOpen(3)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом бальной оценки
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 3) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 3) }
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
                            <button className={ (isOpen == 4) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 4)
                                        setIsOpen(0)
                                    else setIsOpen(4)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Определение весовых коэффициентов методом парного сравнения критериев
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 4) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 4) }
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
                            <button className={ (isOpen == 5) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 5)
                                        setIsOpen(0)
                                    else setIsOpen(5)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Прямой метод принятия решений процедурой Борда
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 5) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 5) }
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
                            <button className={ (isOpen == 6) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 6)
                                        setIsOpen(0)
                                    else setIsOpen(6)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Прямой метод принятия решений процедурой Нансона
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 6) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 6) }
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
                            <button className={ (isOpen == 7) ? "accordion-button open" : "accordion-button collapsed" }
                                    onClick={   ()=>   { if (isOpen == 7)
                                        setIsOpen(0)
                                    else setIsOpen(7)
                                    }
                                    }
                                    type="button" aria-expanded="true" aria-controls="collapseOne">
                                Принятие решений с использованием интегрального критерия взвешенной суммы показателей сравнения
                            </button>
                        </h2>
                        <div id="collapseOne"
                             className={ (isOpen == 7) ? "accordion-collapse show" : "accordion-collapse collapse" }
                             aria-expanded={ (isOpen == 7) }
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
