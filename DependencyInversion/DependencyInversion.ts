interface IRepository{
    save():void;
}

interface IService{
    saving():void;
}

class UserController {
    constructor(private userService:IService){}
    
    save():void{
        this.userService.saving()
    }
}

class ModernUserService implements IService{
    constructor(private userRepo:IRepository){}
    saving(): void {
        this.userRepo.save()
    }
    
}

class UserService implements IService{
    constructor(private userRepo:IRepository){}
    saving():void{
        this.userRepo.save()
    }
}

class UserRepository implements IRepository {
    save():void{
        console.log("Save Repository")
    }
}

class UserMongoDbRepository implements IRepository{
    save(): void {
        console.log("Saving Mongo")
    }
    
}

const userRepo = new UserRepository()
const userRepoWithMongo = new UserMongoDbRepository()


const userService = new UserService(userRepo)
const modernUserService = new ModernUserService(userRepo)
const modernUserServiceWithMongo = new ModernUserService(userRepoWithMongo)

const userController = new UserController(userService)
const userControllerWithModernService = new UserController(modernUserService)
const userControllerWithModernServiceAndMongoDB = new UserController(modernUserServiceWithMongo)


userController.save()
userControllerWithModernService.save()
userControllerWithModernServiceAndMongoDB.save()