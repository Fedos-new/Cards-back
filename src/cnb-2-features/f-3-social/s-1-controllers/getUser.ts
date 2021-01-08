import {Request, Response} from "express";
import User, {IUser} from "../../f-1-auth/a-2-models/user";
import {status400, status500} from "../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";

export const getUser = async (req: Request, res: Response, user: IUser) => {
    const {id} = req.query;

    if (!id) status400(res, `No user id`, user, 'getUser');

    else User.findById(id)
        .lean()
        .select('_id email isAdmin name verified avatar publicCardPacksCount created updated')
        .exec()
        .then(userF => {
            if (!userF) status400(res, `user id not valid`, user, 'getUser/User.findById');

            else res.status(200)
                .json({
                    user: userF,
                    token: user.token,
                    tokenDeathTime: user.tokenDeathTime,
                })
        })
        .catch(e => status500(res, e, user, 'getUser/User.findById'));
};
// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.

// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.

// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.

// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.