import { AuthGuard } from "@nestjs/passport"

// Reusable Guard class
export class JwtGuard extends AuthGuard('jwt'){
    constructor(){
        super()
    }
}