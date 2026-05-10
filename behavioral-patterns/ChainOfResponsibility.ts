type Request = { token: string, url: string, requestCount: number };

abstract class Middleware {
    private next: Middleware | null = null

    setNext(middleware: Middleware): Middleware {
        this.next = middleware
        return middleware
    }

    protected passToNext(request: Request): void {
        if (this.next) {
            this.next.handle(request)
        }
    }

    abstract handle(request: Request): void
}


class AuthMiddleware extends Middleware {
    handle(request: Request): void {
        if (!request.token) {
            console.log('[Auth] Нет токена — запрос отклонён')
            return
        }
        console.log('[Auth] Токен валиден')
        this.passToNext(request)
    }
}

class LogMiddleware extends Middleware {
    handle(request: Request): void {
        console.log(`[Log] GET ${request.url}`)
        this.passToNext(request)
    }
}

class RateLimitMiddleware extends Middleware {
    handle(request: Request): void {
        if (request.requestCount < 150) {
            console.log(`[RateLimit] Запросов: ${request.requestCount} — ок`)
            this.passToNext(request)
        }
        else {
            console.log(`[RateLimit] Превышен лимит запросов`)
        }
    }
}

const auth = new AuthMiddleware()
const log = new LogMiddleware()
const rateLimit = new RateLimitMiddleware()

auth.setNext(log).setNext(rateLimit)

auth.handle({ token: 'valid', url: '/api/users', requestCount: 5 })
// [Auth] Токен валиден
// [Log] GET /api/users
// [RateLimit] Запросов: 5 — ок

auth.handle({ token: '', url: '/api/users', requestCount: 5 })
// [Auth] Нет токена — запрос отклонён

auth.handle({ token: 'valid', url: '/api/users', requestCount: 150 })
// [Auth] Токен валиден
// [Log] GET /api/users
// [RateLimit] Превышен лимит запросов