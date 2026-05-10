interface IUserService {
    getUser: (id: number) => IUser | null
}

interface IUser {
    id: number;
    name: string;
}

class UserService implements IUserService {
    db: IUser[] = [{ id: 1, name: "Grisha" }, { id: 2, name: "Dmitryi" }];

    getUser(id: number) {
        const result = this.db.find(u => u.id === id)

        if (!result) {
            return null
        }

        return result
    }
}

class CachedUserService implements IUserService {
    private subject: IUserService;
    private cache: IUser[] = []

    constructor(subject: IUserService) {
        this.subject = subject
    }

    getUser(id: number) {
        const isCached = this.cache.find(uc => uc.id === id)
        if (isCached) {
            console.log(`[Cache] Возвращаем из кеша: ${isCached.name}`)
            return isCached
        }
        else {
            const user = this.subject.getUser(id)
            console.log(`[DB] Запрос пользователя ${user?.id}`)
            if (user) this.cache.push(user)
            return user
        }
    }
}


const service = new CachedUserService(new UserService())

service.getUser(1) // [DB] Запрос пользователя 1
service.getUser(2) // [DB] Запрос пользователя 2
service.getUser(1) // [Cache] Возвращаем из кеша: User_1
service.getUser(2) // [Cache] Возвращаем из кеша: User_2