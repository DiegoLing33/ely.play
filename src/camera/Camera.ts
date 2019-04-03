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
 * Файл: Camera.ts                                                            *
 * Файл изменен: 04.04.2019 00:25:52                                          *
 *                                                                            *
 ******************************************************************************/

import {Geometry, PointConstValue, RectConst, SizeConstValue} from "ely.core";
import Entity, {IEntityOptions} from "../entity/Entity";

/**
 * Опции камеры
 */
export interface ICameraOptions extends IEntityOptions {
    name?: string;
}

/**
 * Камера
 * @class Camera
 * @augments {Entity}
 */
export default class Camera extends Entity {

    /**
     * Свойство: имя камеры
     * @ignore
     * @protected
     */
    protected __name: string = "Camera";

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: ICameraOptions = {}) {
        super(options);
        this.name(options.name || "Camera");
        this.__setIsReady();
    }

    /**
     * Возвращает имя камеры
     * @return {string}
     */
    public name(): string;

    /**
     * Устанавливает имя камеры
     * @param {string} value - значение
     * @return {this}
     */
    public name(value: string): Camera;

    /**
     * Возвращает и устанавливает имя камеры
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public name(value?: string): string | null | Camera {
        if (value === undefined) return this.__name;
        this.__name = value;
        return this;
    }

    /**
     * Возвращает true, если точка в камере
     * @param {PointConstValue} point
     * @param {number} [extra = 0]
     * @return {boolean}
     */
    public isPointInCamera(point: PointConstValue, extra: number = 0): boolean {
        return Geometry.isPointInRect(point, new RectConst({
            position: new PointConstValue({
                x: this.position().x(),
                y: this.position().y(),
                z: this.position().z(),
            }),
            size: new SizeConstValue({
                depth: this.size().depth() + extra,
                height: this.size().height() + extra,
                width: this.size().width() + extra,
            }),
        }));
    }
}
