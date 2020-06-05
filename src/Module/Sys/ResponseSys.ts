/**
 * Базовый ответ клиенту
 */
export interface BaseResponseI {
    ok: boolean;
    data: any;
    errors: any;
}

/**
 * базовый запрос от клиента
 */
export interface fBaseRequest {
    sRoute: string;
    data: any;
    ok: boolean;
    error: any;

}

/**
 * Функция парсинга запроса от сервера
 * @param data 
 */
export const fRequest = (data: string): fBaseRequest => {
    let out: fBaseRequest = {
        sRoute: '',
        data: null,
        ok: true,
        error: null,
    }

    try {
        const req: fBaseRequest = JSON.parse(data);

        if (req.sRoute) {
            out.sRoute = req.sRoute;
        }

        if (req.data) {
            out.data = req.data;
        }

        if (req.ok) {
            out.ok = true;
        }

    } catch (e) {
        out.ok = false;
        out.error = e;
    }

    return out;
}