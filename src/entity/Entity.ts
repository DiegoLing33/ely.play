/******************************************************************************
 *                                                                            *
 * ,--. o                   |    o                                            *
 * |   |.,---.,---.,---.    |    .,---.,---.                                  *
 * |   |||---'|   ||   |    |    ||   ||   |                                  *
 * `--' ``---'`---|`---'    `---'``   '`---|                                  *
 *            `---'                    `---'                                  *
 *                                                                            *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
 * Mail: <diegoling33@gmail.com>                                              *
 *                                                                            *
 * Это программное обеспечение имеет лицензию, как это сказано в файле        *
 * COPYING, который Вы должны были получить в рамках распространения ПО.      *
 *                                                                            *
 * Использование, изменение, копирование, распространение, обмен/продажа      *
 * могут выполняться исключительно в согласии с условиями файла COPYING.      *
 *                                                                            *
 * Проект: ely.play                                                           *
 *                                                                            *
 * Файл: Entity.ts                                                            *
 * Файл изменен: 04.04.2019 00:14:38                                          *
 *                                                                            *
 ******************************************************************************/

import {Observable, PointConstValue, PointValue, SizeConstValue, SizeValue} from "ely.core";

/**
 * Опции сущности
 * @interface
 */
export interface IEntityOptions {
    position?: PointConstValue;
    size?: SizeConstValue;
}

/**
 * Сущность
 * @class Entity
 */
export default class Entity extends Observable {

    /**
     * Свойство: значение позиции сущности
     * @ignore
     * @protected
     */
    protected __position: PointValue = PointValue.zero();

    /**
     * Свойство: значение размера сущности
     * @ignore
     * @protected
     */
    protected __size: SizeValue = SizeValue.zero();

    /**
     * Флаг готовности
     * @ignore
     */
    private __ready: boolean = false;

    /**
     * Конструктор
     * @param {IEntityOptions} options
     */
    public constructor(options: IEntityOptions = {}) {
        super();
        this.__position = options.position ? options.position.getValue() : PointValue.zero();
        this.__size = options.size ? options.size.getValue() : SizeValue.zero();
    }

    /**
     * Возвращает значение позиции сущности
     * @return {PointValue}
     */
    public position(): PointValue {
        return this.__position;
    }

    /**
     * Возвращает значение размера сущности
     * @return {SizeValue}
     */
    public size(): SizeValue {
        return this.__size;
    }

    /**
     * Добавляет наблюдатель готовности
     * @param {function(entity: Entity)} o
     */
    public addReadyObserver(o: (entity: Entity) => void): Entity {
        this.addObserver("ready", this);
        return this;
    }

    /**
     * Устанавливает готовность сущности
     * @protected
     */
    protected __setIsReady(): Entity {
        this.__ready = true;
        this.notify("ready", this);
        return this;
    }
}

/**
 * @typedef {Object} IEntityOptions
 * @property {SizeConstValue} [size]
 * @property {PointConstValue} [position]
 */
