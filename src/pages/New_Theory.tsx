import React from "react";
import { useState } from 'react';
import Collapsible from "../components/Collapsible";
import {BordaDescription} from "../methodDescriptions/BordaDescription";

export const New_Theory = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2>Теория</h2>

            <p className="lead" >
                На данной странице содержатся теоретические сведения о различных методах
                принятия решения, которые доступны для интерактивного изучения на главной
                странице веб-приложения
            </p>

            <ul className="list-group">

                <li className="list-group-item ">
                    <Collapsible label = "Парето-оптимальность">
                        <p> Проверка парето-оптимальности предназначена для поиска заведомо неудачных
                            вариантов. Варианты сравнивают попарно между собой, и если обнаруживается,
                            что в паре один вариант уступает другому по всем критериям, то этот вариант
                            считается неоптимальным, и его рекомендуется не рассматривать при принятии решения.
                        </p>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Базовый критерий">
                        <p>Один или несколько критериев определяются как базовые - с весом, равным единице,
                            а вес остальных назначаются в зависимости от того, во сколько раз они важнее
                            базового. После чего вычисляется сумма весов. Итоговое значение базовых критериев
                            будет равно единице, деленной на полученную сумму, остальные же получат значение,
                            большее значения базового в то количество раз, которое было определено на прошлом этапе
                        </p>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Балльный критерий">
                        <p>ssssssss</p>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Парное сравнение">
                        <h1>This is content</h1>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Нансон">
                        <p>ssssssss</p>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Борда">
                        <p>aa</p>
                    </Collapsible>
                </li>
                <li className="list-group-item ">
                    <Collapsible label = "Взвешенная сумма">
                        <p>ssssssss</p>
                    </Collapsible>
                </li>

            </ul>

        </div>
    )
}